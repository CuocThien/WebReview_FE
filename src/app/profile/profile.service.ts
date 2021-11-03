import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProfileService {
 
  constructor(private http: HttpClient, private toastr:ToastrService,private cookieService: CookieService) {}
  result:any;
    updateUser(value: any) {
        
        const urlUpdateUser = 'https://oggy-webreview.herokuapp.com/account/updateUser';
        const body = JSON.stringify(value);
        console.log(body)
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken") })
        return this.http.post(urlUpdateUser, body,{ headers })
            .toPromise()
            .then(res=>{this.result=res;this.toastr.success(this.result.msg);this.cookieService.set("fullName",this.result.data.FullName)})
            .catch(err=>console.log(err))
  }
}