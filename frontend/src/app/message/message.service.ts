import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    //Backend base URL
    private apiUrl = 'http://localhost:3000/messages';

    constructor(private http: HttpClient) {}

    //Send message to backend
    sendMessage(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}