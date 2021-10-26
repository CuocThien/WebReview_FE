import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()

export class SignUpService {
    constructor(private http: HttpClient) {

    }
    signUp(value: any) {
        const url = 'http://localhost:3000/account/signup';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
            .toPromise()
    }
}
