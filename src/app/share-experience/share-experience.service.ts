import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ShareExperienceService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    getShareExpPost() {
        const url = 'https://oggy-webreview.herokuapp.com/post/getPost/Experience';
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
    getShareExpCategory() {
        const url = 'https://oggy-webreview.herokuapp.com/category/getCategory/true/Experience';
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
        const url = 'https://oggy-webreview.herokuapp.com/post/getPost/Experience/'+id;
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
