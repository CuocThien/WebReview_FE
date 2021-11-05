import { Component, OnInit, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input()
  id:any;
  @Input()
  rate:any;
  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
    let name=this.id+"_"+this.rate;
    this.star(name)
    
  }
  star(id:any){
    document.addEventListener("DOMContentLoaded", function(event) {
      //do work
      document.getElementById(id)?.setAttribute("checked","true");
   });
  }
  rating(event:any){
    alert(this.id+": "+event.target.id.split('_')[1])
  }

}
