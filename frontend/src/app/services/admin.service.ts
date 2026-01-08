import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private API_URL = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  // Get messages waiting for approval
  getPendingMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/admin/pending`);
  }

  // Approve a message
  approveMessage(id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/approve`, {});
  }

  // Reject a message
  rejectMessage(id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/reject`, {});
  }
}