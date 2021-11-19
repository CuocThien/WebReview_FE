import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable()

export class UpdatePostService {
    constructor(private http: HttpClient, private cookieService:CookieService) {

    }
    updatePost(GroupId:any, PostId:any, value:any) {
        const url = 'https://oggy-webreview.herokuapp.com/post/updatePost/'+GroupId+'/'+PostId;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken")})
        const body = JSON.stringify(value)
        return this.http.post(url, body,{ headers })
        .toPromise();
    }
}
