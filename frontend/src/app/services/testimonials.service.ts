import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private API = 'http://localhost:3000/testimonials';

  constructor(private http: HttpClient) {}

  sendTestimonial(formData: FormData) {
    return this.http.post(this.API, formData);
  }
}