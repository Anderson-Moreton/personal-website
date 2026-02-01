import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private API_URL = '/api/testimonials';

  constructor(private http: HttpClient) {}

  // Get approved testimonials for Home
  getHomeMessages() {
    return this.http.get<any[]>(`${this.API_URL}/home`).pipe(
      map(items =>
        items.map(t => ({
          ...t,
          likes: Number(t.likes ?? 0),
          liked: false
        }))
      )
    );
  }

  likeMessage(testimonialId: number) {
    return this.http.post(
      `${this.API_URL}/${testimonialId}/like`,
      {}
    );
  }

  unlikeMessage(testimonialId: number) {
    return this.http.delete(
      `${this.API_URL}/${testimonialId}/like`
    );
  }
}