import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private API_URL = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  // Get messages allowed to appear on Home
  getHomeMessages() {
    return this.http.get<any[]>(`${this.API_URL}/home`).pipe(
      map(messages =>
        messages.map(m => ({
          ...m,
          likes: Number(m.likes ?? 0),
          liked: false
        }))
      )
    );
  }

  likeMessage(messageId: number) {
  return this.http.post(
    `${this.API_URL}/${messageId}/like`,
    {}
  );
}

  unlikeMessage(messageId: number) {
    return this.http.delete(
      `${this.API_URL}/${messageId}/like`
    );
  }

  getLikes(messageId: number) {
    return this.http
      .get<{ likes: number }>(
        `http://localhost:3000/messages/${messageId}/likes`
      )
      .pipe(
        map(res => res.likes)
      );
    }
}