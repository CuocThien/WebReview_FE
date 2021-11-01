import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  p:number = 1;
  
  constructor() { }

  ngOnInit(): void {}

  imgUrl="https://i.pinimg.com/originals/fc/15/89/fc158956845d8a992e748270d2192e03.jpg"
  
  list=[{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here page 2"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here page 2"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here page 2"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here page 2"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here page 3"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here "
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here page 4"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here"
  },{
    img:this.imgUrl,
    title:"Pokemon",
    content:"Content here"
  }];

}
