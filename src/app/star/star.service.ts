import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable()

export class StarService {
    constructor(private http: HttpClient, private cookieService: CookieService,) {

    }
    rating(PostId:any,value: any) {
        const urlRating = 'https://oggy-webreview.herokuapp.com/post/rating/'+PostId;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'Bearer '+this.cookieService.get("authToken") })
        const body = JSON.stringify(value);
        return this.http.post(urlRating, body, { headers })
            .toPromise()
    }
    updateRating(PostId:any,value: any) {
        const urlRating = 'https://oggy-webreview.herokuapp.com/post/rating/'+PostId;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'Bearer '+this.cookieService.get("authToken") })
        const body = JSON.stringify(value);
        return this.http.put(urlRating, body, { headers })
            .toPromise()
    }
}
