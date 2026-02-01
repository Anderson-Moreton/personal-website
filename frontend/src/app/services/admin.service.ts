import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private API = '/api/admin';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.API}/login`,
      { email, password }
    );
  }

  /* ============================
     TESTIMONIALS – PENDING
  ============================ */

  getPendingTestimonials(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API}/testimonials/pending`
    );
  }

  approveTestimonial(id: number): Observable<any> {
    return this.http.put(
      `${this.API}/testimonials/${id}/approve`,
      {}
    );
  }

  rejectTestimonial(id: number): Observable<any> {
    return this.http.put(
      `${this.API}/testimonials/${id}/reject`,
      {}
    );
  }

  /* ============================
     TESTIMONIALS – APPROVED
  ============================ */

  getApprovedTestimonials(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API}/testimonials/approved`
    );
  }

  /* ============================
     SHOW / HIDE ON HOME
  ============================ */

  toggleShowOnHome(id: number): Observable<any> {
    return this.http.put(
      `${this.API}/testimonials/${id}/toggle-home`,
      {}
    );
  }

  /* ============================
     DELETE
  ============================ */

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(
      `${this.API}/testimonials/${id}`
    );
  }
}
