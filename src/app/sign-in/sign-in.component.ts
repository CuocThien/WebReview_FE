import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [SignInService]
})
export class SignInComponent implements OnInit {
  
  constructor(private service:SignInService,private routerApp:AppRoutingModule, private toastr:ToastrService,
    private cookieService:CookieService, private router:Router, private route:ActivatedRoute){
    
  }
  url:any=""
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap.get("redirectTo"))
    this.url = this.route.snapshot.queryParamMap.get("redirectTo")
  }
  result:any
  user:any
  onSubmit(formSignIn:any){
    this.service.signIn(formSignIn.value).then(res=>{
      this.result=res;
      this.toastr.success(this.result.msg);
      if(this.url == null){
        this.router.navigate(['/index'])
      }else{
      this.router.navigate([this.url]);}
      this.cookieService.set('authToken', this.result.data.Token);
      this.service.getUser(this.cookieService.get("authToken"))
          .then(resU=>{this.user=resU;
              this.cookieService.set("fullName", this.user.data.FullName);
              this.cookieService.set("isAdmin", this.user.data.IsAdmin);
              this.cookieService.set("accountId", this.user.data._id);
              // console.log(this.user)
          })
  })
  .catch(err=>this.toastr.error(err.error.msg));
  }
  getNewPassword(formForgotPassword:any){
    console.log(JSON.stringify(formForgotPassword.value))
    this.service.forgotPassword(formForgotPassword.value)
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
  }
  turnOffForm(){
    this.routerApp.index();
  }
}
