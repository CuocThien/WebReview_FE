import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from '../app-routing.module';
import { SignInService } from '../sign-in/sign-in.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [SignInService]
})
export class CommentComponent implements OnInit {
  isDisplay:boolean=false;
  @Input()
  listCmt:any;
  user:any;
  myAvatar:any;
  constructor(private renderer:Renderer2, private signInService:SignInService, 
    private cookieService:CookieService, private router:AppRoutingModule) { }

  ngOnInit(): void {
    if(this.cookieService.get("authToken")!=""){
      this.signInService.getUser(this.cookieService.get("authToken")).then(res=>{
        this.user = res;
        this.user = this.user.data;
        this.myAvatar = this.user.Avatar;
      })
    }
  }
  turnOnReply(event:any){
    const id = event.target.name;
    if(this.cookieService.get("authToken")==""){
      this.router.signin();
    }
    if(document.getElementById(id)?.style.display=="none")
    {
      this.renderer.setStyle(document.getElementById(id),"display","flex")
    }else{
      this.renderer.setStyle(document.getElementById(id),"display","none")
    }
  }
}
