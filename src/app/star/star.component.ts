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
  }
  ngAfterViewInit(){
    if(this.rate!=0){
    let name=this.id+"_"+this.rate;
    this.x = document.getElementById(name);
    this.x.checked=true;
    }
  }

  rating(event:any){
    alert(this.id+": "+event.target.id.split('_')[1])
  }

}
