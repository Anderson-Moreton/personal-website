import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private API = '/api/contact';

  constructor(private http: HttpClient) {}

  sendMessage(data: any) {
    return this.http.post(this.API, data);
  }
}