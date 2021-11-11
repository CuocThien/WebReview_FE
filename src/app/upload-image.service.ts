import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UploadImageService {
 
  constructor(private http: HttpClient, private toastr:ToastrService,private cookieService: CookieService) {}
  result:any;
    updateImage(value: any) {
        
        const url = 'https://api.cloudinary.com/v1_1/blogreview/image/upload';
        return this.http.post(url, value)
            .toPromise()
  }
}