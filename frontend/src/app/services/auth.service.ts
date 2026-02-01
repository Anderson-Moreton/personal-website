import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = '/api/admin';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.API_URL}/login`,
      { email, password }
    ).pipe(
      tap(res => {
        localStorage.setItem('admin_token', res.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('admin_token');
  }

  getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('admin_token');
  }
}