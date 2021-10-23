import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-review';
  public isHome=true;
  constructor(private router:AppRoutingModule){}
  signin(){
    this.router.signin();
    this.isHome=false;
  }
  signup(){
    this.router.signup();
    this.isHome=false;
  }
}
