import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private API_URL = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  /**
   * Get messages waiting for approval
   */
  getPendingMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/pending`);
  }

  approveMessage(id: number) {
    return this.http.put(
      `${this.API_URL}/messages/${id}/approve`,
      {}
    );
  }

  rejectMessage(id: number) {
    return this.http.put(
      `${this.API_URL}/messages/${id}/reject`,
      {}
    );
  }
}