import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { AppRoutingModule } from "../app-routing.module";

@Injectable()

export class ForumsService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService, private router:AppRoutingModule) {

    }
    result:any;
    getPost() {
        const url = 'https://oggy-webreview.herokuapp.com/post/getPost/Forum';
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
