import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class IndexService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    result:any;
    getReviewPost() {
        const url = 'https://oggy-webreview.herokuapp.com/post/review/getPost';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        return this.http.get(url, { headers })
            .toPromise();
    }
    getShareExpPost() {
        const url = 'https://oggy-webreview.herokuapp.com/post/experience/getPost';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        return this.http.get(url, { headers })
            .toPromise();
    }
    getForumPost() {
        const url = 'https://oggy-webreview.herokuapp.com/post/forum/getPost';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        return this.http.get(url, { headers })
            .toPromise();
    }
}
