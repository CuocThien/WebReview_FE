import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [SignInService]
})
export class SignInComponent implements OnInit {
  
  constructor(private toastr : ToastrService, private service:SignInService){
    
  }
  ngOnInit(): void {
  }
  onSubmit(formSignIn:any){
    let result:any;
    console.log(formSignIn.value)
    console.log(JSON.stringify(formSignIn.value))
    this.service.signIn(formSignIn.value)
    .then(res=>{result=res;this.toastr.success(result.msg)})
    .catch(err=>console.log(err.error.msg));
    // console.log(formSignIn.value);
  }
  getNewPassword(formForgotPassword:any){
    console.log(JSON.stringify(formForgotPassword.value))
    this.service.forgotPassword(formForgotPassword.value)
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
  }
}
