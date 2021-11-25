import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable()

export class SignInService {
    constructor(private http: HttpClient, private toastr:ToastrService,
        private router:Router,private cookieService: CookieService,) {

    }
    
    signIn(value: any) {
        let result:any;
        let user:any;
        const urlSignIn = 'https://oggy-webreview.herokuapp.com/account/signin';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = JSON.stringify(value);
        return this.http.post(urlSignIn, body, { headers })
            .toPromise()
            
    }

  getUser(value: any) {
    
    const urlGetUser = 'https://oggy-webreview.herokuapp.com/account/getUser';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+value })
    return this.http.get(urlGetUser, { headers })
        .toPromise()
}
    forgotPassword(value: any) {
        const urlForgotPassword = 'https://oggy-webreview.herokuapp.com/account/forgotPassword';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = JSON.stringify(value);
        return this.http.post(urlForgotPassword, body, { headers })
            .toPromise()
    }
}
