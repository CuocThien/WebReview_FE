import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {

  isDisplay:boolean=false;
  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
    var items = document.getElementsByClassName("item");
    this.renderer.addClass(items[0],"active") 
  }
  active(event:any){
    if(document.getElementsByClassName('active').length>0){
      var items = document.getElementsByClassName("item");
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active")
      }
    }
    this.renderer.addClass(document.getElementById(event.target.id),"active")
  }
  turnOnReply(){
    this.isDisplay=!this.isDisplay;
    if(this.isDisplay==true)
    {
      this.renderer.setStyle(document.getElementsByClassName("create-reply")[0],"display","flex")
    }else{
      this.renderer.setStyle(document.getElementsByClassName("create-reply")[0],"display","none")
    }
  }
}
