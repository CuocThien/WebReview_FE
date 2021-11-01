import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { SignInService } from '../sign-in/sign-in.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[HeaderService,SignInService]
})
export class HeaderComponent implements OnInit {
  constructor(public header:HeaderService,private router:AppRoutingModule,
    private cookieService: CookieService,private service:SignInService) { }
    userFullName:any;
  ngOnInit(): void {
  }
  signIn(){
    this.router.signin();
  }
  signUp(){
    this.router.signup();
  }
  signOut(){
    this.cookieService.deleteAll();
  }
  isLogin(){
    if(this.cookieService.get("authToken")==""){
      return false;
    }
    else{
      this.userFullName=this.cookieService.get("fullName");
      return true;
  }}
}
