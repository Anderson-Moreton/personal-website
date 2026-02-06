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
      id = this.generateUUID();
      localStorage.setItem('visitor_id', id);
    }

    return id;
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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