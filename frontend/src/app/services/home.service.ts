import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private API_URL = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  /**
   * Get messages allowed to appear on Home
   */
  getHomeMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/home`).pipe(
      map(messages =>
        messages.map(message => ({
          ...message,
          likes: 0,
          liked: false
        }))
      )
    );
  }

  /**
   * Get total likes for a message
   */
  getLikes(messageId: number): Observable<number> {
    return this.http.get<{ total: number }>(
      `${this.API_URL}/${messageId}/likes`
    ).pipe(
      map(res => res.total)
    );
  }

  /**
   * Add a like to a message
   */
  likeMessage(messageId: number): Observable<any> {
    return this.http.post(
      `${this.API_URL}/${messageId}/like`,
      {}
    );
  }
}