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
  x:any;
  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
    console.log(this.rate)
    if(this.rate!=0){
      let name=this.id+"_"+this.rate;
      this.x= document.getElementById(name) as HTMLInputElement; 
      this.x.checked=true;
      // console.log(x)
      // this.renderer.setProperty(document.getElementById(name),"checked",true)
      // this.star(name)
  }
    
    
  }
  star(id:any){
    var x= document.querySelector('#RV1_5') as HTMLInputElement;
      x.checked=true;
    // document.addEventListener("readystatechange", event => {
    //   //do work
    //   if (event.target.readyState === "complete") {
    //     alert("run")
    //     var x = document.getElementById(id);
    //     console.log(x)
    // }
      
  }
  rating(event:any){
    alert(this.id+": "+event.target.id.split('_')[1])
  }

}
