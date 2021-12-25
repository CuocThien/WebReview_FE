import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(public header:HeaderService,private routerApp:AppRoutingModule,
    private cookieService: CookieService,private service:SignInService, private router:Router, private route:ActivatedRoute) { }
    userFullName:any;
    avatar:any;
    user:any=[];
    isAdmin:boolean=false;
    querySearch:string="";
  ngOnInit(): void {
  }
  signIn(){
    this.router.navigate(['/signin'],{queryParams:{redirectTo:this.router.url}});
  }
  signUp(){
    this.routerApp.signup();
  }
  profile(){
    this.routerApp.profile();
  }
  changepassword(){
    this.routerApp.changepassword();
  }
  signOut(){
    this.cookieService.deleteAll();
    this.routerApp.index();
  }
  isLogin(){
    if(this.cookieService.get("authToken")==""){
      return false;
    }
    else{
      // console.log(this.cookieService.get("User"))
      // this.user=JSON.parse(this.cookieService.get("User"));
      this.userFullName=this.cookieService.get("fullName");
      this.avatar=this.cookieService.get("avatar");
      if(this.cookieService.get("isAdmin")=="true"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
      // console.log(this.isAdmin)
      // console.log(this.user.DOB);
      return true;
  }}
  search(){
    this.routerApp.search(this.querySearch);
    this.querySearch=""
  }
  admin(){
    this.routerApp.admin();
  }
  managePosts(){
    this.router.navigate(['/user/manage-posts'], {queryParams: {approved: true, group: "Default", page: 1}})
  }
}
