import { Component, OnInit, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private renderer:Renderer2, private router:AppRoutingModule, private cookieService:CookieService) { }
  toUsers:boolean=false;
  toPosts:boolean=true;
  toCategories:boolean=false;
  toGroup:boolean=false;
  ngOnInit(): void {
    if(this.cookieService.get("isAdmin")=="false"){
      this.router.pageError()
    }
  }
  redirect(event:any){
    let id=event.target.id;
    if(id==="users"){
      this.toUsers=true;
      this.toPosts=false;
      this.toCategories=false;
      this.toGroup=false;
    }else if (id==="posts"){
      this.toUsers=false;
      this.toPosts=true;
      this.toCategories=false;
      this.toGroup=false;
    }else if (id==="group"){
      this.toUsers=false;
      this.toPosts=false;
      this.toCategories=false;
      this.toGroup=true;
    }else{
      this.toUsers=false;
      this.toPosts=false;
      this.toCategories=true;
      this.toGroup=false;
    }
  }
  active(event:any){
    var items=document.getElementsByClassName('items')
    for(let i=0; i<items.length;i++){
      console.log(items[i].classList[1])
      if(items[i].classList[1]=="active"){
        items[i].classList.remove("active");
      }
    }
    document.getElementById(event.target.id)?.classList.add("active");
    // this.renderer.addClass(document.getElementById(event.target.id),"active")
  }

}
