import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ReviewService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    getReviewPost() {
        const url = 'https://oggy-webreview.herokuapp.com/post/getPost/Review';
        if(this.cookieService.get("authToken")==""){
            const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
            return this.http.get(url, { headers })
            .toPromise();
        }else{
            const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken")})
            return this.http.get(url, { headers })
            .toPromise();
        }
    }
    getReviewCategory() {
        const url = 'https://oggy-webreview.herokuapp.com/post/getCategory/Review';
        if(this.cookieService.get("authToken")==""){
            const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
            return this.http.get(url, { headers })
            .toPromise();
        }else{
            const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken")})
            return this.http.get(url, { headers })
            .toPromise();
        }
    }
    getPostByCategory(id:any){
        const url = 'https://oggy-webreview.herokuapp.com/post/getPost/Review/'+id;
        if(this.cookieService.get("authToken")==""){
            const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
            return this.http.get(url, { headers })
            .toPromise();
        }else{
            const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken")})
            return this.http.get(url, { headers })
            .toPromise();
        }
    }
}
