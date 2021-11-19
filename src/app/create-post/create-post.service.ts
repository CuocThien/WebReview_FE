import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable()

export class CreatePostService {
    constructor(private http: HttpClient, private cookieService:CookieService) {

    }
    createPost(value:any) {
        const url = 'https://oggy-webreview.herokuapp.com/post/createPost';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken")})
        const body = JSON.stringify(value)
        return this.http.post(url, body,{ headers })
        .toPromise();
    }
}
