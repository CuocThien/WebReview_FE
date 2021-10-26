import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()

export class SignInService {
    constructor(private http: HttpClient) {

    }
    signIn(value: any) {
        const urlSignIn = 'http://localhost:3000/account/signin';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = JSON.stringify(value);
        return this.http.post(urlSignIn, body, { headers })
            .toPromise()
    }
    forgotPassword(value: any) {
        const urlForgotPassword = 'http://localhost:3000/account/forgotPassword';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = JSON.stringify(value);
        return this.http.post(urlForgotPassword, body, { headers })
            .toPromise()
    }
}
