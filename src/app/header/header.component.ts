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
    user:any=[];
    querySearch:string="";
  ngOnInit(): void {
  }
  signIn(){
    this.router.signin();
  }
  signUp(){
    this.router.signup();
  }
  profile(){
    this.router.profile();
  }
  changepassword(){
    this.router.changepassword();
  }
  signOut(){
    this.cookieService.deleteAll();
    this.router.index();
  }
  isLogin(){
    if(this.cookieService.get("authToken")==""){
      return false;
    }
    else{
      // console.log(this.cookieService.get("User"))
      // this.user=JSON.parse(this.cookieService.get("User"));
      this.userFullName=this.cookieService.get("fullName");
      // console.log(this.user.DOB);
      return true;
  }}
  search(){
    this.router.search(this.querySearch);
  }
}
