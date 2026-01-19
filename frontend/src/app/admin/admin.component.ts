import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sidebarActive = false;
  pendingTestimonials: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.data.subscribe({
      next: (data) => {
        this.pendingTestimonials = data['testimonials'] ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  approve(id: number): void {
    this.adminService.approveTestimonial(id).subscribe(() => {
      this.pendingTestimonials =
        this.pendingTestimonials.filter(t => t.id !== id);
    });
  }

  reject(id: number): void {
    this.adminService.rejectTestimonial(id).subscribe(() => {
      this.pendingTestimonials =
        this.pendingTestimonials.filter(t => t.id !== id);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  toggleHome(t: any): void {
  this.adminService.toggleShowOnHome(t.id, !t.show_on_home).subscribe({
    next: () => {
      t.show_on_home = !t.show_on_home;
    },
    error: (err) => {
      alert(err.error?.error || 'Cannot show more than 8 testimonials');
    }
  });
}
}