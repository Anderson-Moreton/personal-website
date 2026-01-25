import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  loading = true;

  pendingTestimonials: any[] = [];
  approvedTestimonials: any[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  ngAfterViewInit(): void {
    // 🔥 resolve o bug de renderização (sidebar / navbar)
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  loadTestimonials(): void {
    this.loading = true;

    this.adminService.getPendingTestimonials().subscribe({
      next: (pending) => {
        this.pendingTestimonials = pending;

        this.adminService.getApprovedTestimonials().subscribe({
          next: (approved) => {
            this.approvedTestimonials = approved;
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: () => (this.loading = false)
        });
      },
      error: () => (this.loading = false)
    });
  }

  approve(id: number): void {
    this.adminService.approveTestimonial(id).subscribe(() => {
      this.loadTestimonials();
    });
  }

  reject(id: number): void {
    this.adminService.rejectTestimonial(id).subscribe(() => {
      this.loadTestimonials();
    });
  }

  toggleShowOnHome(id: number): void {
    this.adminService.toggleShowOnHome(id).subscribe(() => {
      this.loadTestimonials();
    });
  }

  delete(id: number): void {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    this.adminService.deleteTestimonial(id).subscribe(() => {
      this.loadTestimonials();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}