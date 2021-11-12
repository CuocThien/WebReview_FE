import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';

@Injectable()
export class ProfileService {
 
  constructor(private http: HttpClient, private toastr:ToastrService,private cookieService: CookieService, private router:AppRoutingModule) {}
  result:any;
    updateUser(value: any) {
        let fullName=value.FullName;
        const urlUpdateUser = 'https://oggy-webreview.herokuapp.com/account/updateUser';
        const body = JSON.stringify(value);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken") })
        return this.http.post(urlUpdateUser, body,{ headers })
            .toPromise()
            .then(res=>{this.result=res;
              this.toastr.success(this.result.msg);
              this.cookieService.delete("fullName");
              this.cookieService.set("fullName",fullName);
              this.router.index()})
            .catch(err=>console.log(err))
  }
}