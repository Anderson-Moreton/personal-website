import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private API_URL = '/api/testimonials';

  constructor(private http: HttpClient) {}

  private getVisitorId(): string {
    let id = localStorage.getItem('visitor_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('visitor_id', id);
    }
    return id;
  }

  getHomeMessages() {
    return this.http.get<any[]>(
      `${this.API_URL}/home`,
      {
        headers: {
          'X-Visitor-Id': this.getVisitorId()
        }
      }
    ).pipe(
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
      {},
      {
        headers: {
          'X-Visitor-Id': this.getVisitorId()
        }
      }
    );
  }

  unlikeMessage(testimonialId: number) {
    return this.http.delete(
      `${this.API_URL}/${testimonialId}/like`,
      {
        headers: {
          'X-Visitor-Id': this.getVisitorId()
        }
      }
    );
  }
}