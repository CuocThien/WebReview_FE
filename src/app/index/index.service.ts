import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class IndexService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    result:any;
    getForumPost() {
        const url = 'https://oggy-webreview.herokuapp.com/post/forum/getPost';
        if(this.cookieService.get("authToken")==null){
            const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
            return this.http.get(url, { headers })
            .toPromise();
        }else{
            const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken")})
            return this.http.get(url, { headers })
            .toPromise();
        }
    }
    getPost() {
            const url = 'https://oggy-webreview.herokuapp.com/post/getPost';
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
