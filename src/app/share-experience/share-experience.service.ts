import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ShareExperienceService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    getShareExpCategory() {
        const url = 'https://oggy-webreview.herokuapp.com/post/experience/getCategory';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        return this.http.get(url, { headers })
            .toPromise();
    }
    getPostByCategory(id:any){
        const url = 'https://oggy-webreview.herokuapp.com/post/experience/getPost/'+id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        return this.http.get(url, { headers })
            .toPromise();
    }
}
