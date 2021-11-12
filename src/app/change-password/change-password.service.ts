import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { AppRoutingModule } from "../app-routing.module";

@Injectable()

export class ChangePasswordService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService, private router:AppRoutingModule) {

    }
    result:any;
    changePassword(value: any) {
        const url = 'https://oggy-webreview.herokuapp.com/account/changePassword';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken")  })
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
            .toPromise()
            .then(res=>{
                this.result=res;
                this.toastr.success(this.result.msg);
                this.cookieService.deleteAll();
                this.router.signin();})
            .catch(err=>this.toastr.error(err.error.msg));
    }
}
