import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [SignInService]
})
export class SignInComponent implements OnInit {
  
  constructor(private service:SignInService,private router:AppRoutingModule){
    
  }
  ngOnInit(): void {
  }
  onSubmit(formSignIn:any){
    this.service.signIn(formSignIn.value)
  }
  getNewPassword(formForgotPassword:any){
    console.log(JSON.stringify(formForgotPassword.value))
    this.service.forgotPassword(formForgotPassword.value)
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
  }
  turnOffForm(){
    this.router.index();
  }
}
