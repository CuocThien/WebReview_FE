import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ChangePasswordService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    result:any;
    changePassword(value: any) {
        const url = 'https://oggy-webreview.herokuapp.com/account/changePassword';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken")  })
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
            .toPromise()
            .then(res=>{this.result=res;this.toastr.success(this.result.msg)})
            .catch(err=>this.toastr.error(err.error.msg));
    }
}
