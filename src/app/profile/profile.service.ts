import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProfileService {
 
  constructor(private http: HttpClient, private toastr:ToastrService,private cookieService: CookieService) {}

    updateUser(value: any) {
        const urlUpdateUser = 'https://oggy-webreview.herokuapp.com/account/updateUser';
        const body = JSON.stringify(value);
        console.log(body)
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+this.cookieService.get("authToken") })
        return this.http.post(urlUpdateUser, body,{ headers })
            .toPromise()
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
  }
}