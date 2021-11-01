import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HeaderService {
 
  constructor(private http: HttpClient, private toastr:ToastrService,private cookieService: CookieService) {

  }
}