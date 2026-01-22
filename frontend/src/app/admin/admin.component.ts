import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  loading = false;

  // Data
  pendingTestimonials: any[] = [];
  approvedTestimonials: any[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  // LOADERS 

  loadAll(): void {
    this.loadPendingTestimonials();
    this.loadApprovedTestimonials();
  }

  loadPendingTestimonials(): void {
    this.loading = true;

    this.adminService.getPendingTestimonials().subscribe({
      next: (data) => {
        this.pendingTestimonials = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading pending testimonials:', err);
        this.loading = false;
      }
    });
  }

  loadApprovedTestimonials(): void {
    this.adminService.getApprovedTestimonials().subscribe({
      next: (data) => {
        this.approvedTestimonials = data;
      },
      error: (err) => {
        console.error('Error loading approved testimonials:', err);
      }
    });
  }

  // ACTIONS

  approve(id: number): void {
    this.adminService.approveTestimonial(id).subscribe(() => {
      this.pendingTestimonials =
        this.pendingTestimonials.filter(t => t.id !== id);

      this.loadApprovedTestimonials();
    });
  }

  reject(id: number): void {
    if (!confirm('Reject this testimonial?')) return;

    this.adminService.rejectTestimonial(id).subscribe(() => {
      this.pendingTestimonials =
        this.pendingTestimonials.filter(t => t.id !== id);
    });
  }

  toggleShowOnHome(id: number): void {
    this.adminService.toggleShowOnHome(id).subscribe(() => {
      const t = this.approvedTestimonials.find(x => x.id === id);
      if (t) {
        t.show_on_home = t.show_on_home ? 0 : 1;
      }
    });
  }

  delete(id: number): void {
    if (!confirm('Delete this testimonial permanently?')) return;

    this.adminService.deleteTestimonial(id).subscribe(() => {
      this.pendingTestimonials =
        this.pendingTestimonials.filter(t => t.id !== id);

      this.approvedTestimonials =
        this.approvedTestimonials.filter(t => t.id !== id);
    });
  }

  // LOGOUT
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}