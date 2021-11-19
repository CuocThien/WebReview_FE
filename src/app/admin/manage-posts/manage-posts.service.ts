import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ManagePostsService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    getPost(approved:boolean) {
        const url = 'https://oggy-webreview.herokuapp.com/post/manage/getPost/'+approved;
            const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken")})
            return this.http.get(url, { headers })
            .toPromise();
        
    }
}
