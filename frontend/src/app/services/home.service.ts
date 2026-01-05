import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    // Backend base URL
    private readonly API_URL = 'http://localhost:3000/messages';

    constructor(private http: HttpClient) {}

    /*
        Get messages authorized to appear onn Home
        Only messages with show_on_home = 1
    */ 
   getHomeMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/home`);
   }
}