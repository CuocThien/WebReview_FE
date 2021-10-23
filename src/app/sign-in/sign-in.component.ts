import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  
  ngOnInit(): void {
  }
  onSubmit(formSignIn:any){
    console.log(formSignIn.value);
  }
}
