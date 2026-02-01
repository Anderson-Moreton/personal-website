import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private API = '/api/testimonials';

  constructor(private http: HttpClient) {}

  sendTestimonial(formData: FormData) {
    return this.http.post(this.API, formData);
  }
}