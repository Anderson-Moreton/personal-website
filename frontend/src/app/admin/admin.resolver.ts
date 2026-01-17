import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdminService } from '../services/admin.service';

export const adminTestimonialsResolver: ResolveFn<any[]> = () => {
  const adminService = inject(AdminService);
  return adminService.getPendingTestimonials();
};