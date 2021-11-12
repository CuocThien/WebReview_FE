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
    // console.log(this.rate)
    let name=this.id+"_"+this.rate;
    this.rate=4;
    this.star()
  }
  
  star(){
    console.log("aaa")
    
  }

  rating(event:any){
    alert(this.id+": "+event.target.id.split('_')[1])
  }

}
