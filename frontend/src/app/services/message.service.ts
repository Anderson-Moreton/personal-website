import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // Base URL of backend API
  private readonly apiUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  // Send message to backend
  sendMessage(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  // Get all messages (future use on Home)
  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
