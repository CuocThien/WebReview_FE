import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()

export class SignInService {
    constructor(private http: HttpClient) {

    }
    sendPost(value: any) {
        const url = 'http://localhost:3000/signin';
        const headers = new HttpHeaders({ 'Content-type': 'application.json' })
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
            .toPromise()
    }
}
