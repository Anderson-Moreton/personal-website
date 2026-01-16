import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private API = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  // TESTIMONIALS
  getPendingTestimonials() {
    return this.http.get<any[]>(
      `${this.API}/testimonials/pending`
    );
  }

  approveTestimonial(id: number) {
    return this.http.put(
      `${this.API}/testimonials/${id}/approve`,
      {}
    );
  }

  rejectTestimonial(id: number) {
    return this.http.put(
      `${this.API}/testimonials/${id}/reject`,
      {}
    );
  }
}