import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private renderer:Renderer2) { }
  toUsers:boolean=false;
  toPosts:boolean=true;
  toCategories:boolean=false;
  toGroup:boolean=false;
  ngOnInit(): void {
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
    var item=document.getElementsByClassName('active')
    this.renderer.removeClass(item[0],"active");
    this.renderer.addClass(document.getElementById(event.target.id),"active")
  }

}
