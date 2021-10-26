import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [SignInService]
})
export class SignInComponent implements OnInit {

  constructor(private service:SignInService){}
  ngOnInit(): void {
  }
  onSubmit(formSignIn:any){
    console.log(formSignIn.value)
    console.log(JSON.stringify(formSignIn.value))
    this.service.sendPost(formSignIn.value)
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
    // console.log(formSignIn.value);
  }
}
