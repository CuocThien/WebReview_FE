import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ReviewService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    getReviewCategory() {
        const url = 'https://oggy-webreview.herokuapp.com/post/review/getCategory';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        return this.http.get(url, { headers })
            .toPromise();
    }
    getPostByCategory(id:any){
        const url = 'https://oggy-webreview.herokuapp.com/post/review/getPost/'+id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        return this.http.get(url, { headers })
            .toPromise();
    }
}
