import { Component, OnInit, Renderer2 } from '@angular/core';
import { IndexService } from '../index/index.service';
import { ReviewService } from './review-hub.service';

@Component({
  selector: 'app-review-hub',
  templateUrl: './review-hub.component.html',
  styleUrls: ['./review-hub.component.css'],
  providers: [ReviewService, IndexService]
})
export class ReviewHubComponent implements OnInit {
  constructor(private service:ReviewService, private renderer:Renderer2,private indexService:IndexService) { }
  categories:any;
  listPost:any;
  p:number = 1;
  ngOnInit(): void {
    this.service.getReviewCategory().then(res=>{
      this.categories=res;
      this.categories=this.categories.data;
      
    })
    this.indexService.getReviewPost()
    .then(res=>{
      this.listPost=res;
      this.listPost=this.listPost.data.review
      console.log(this.listPost)
    })
    .catch(err=>console.log(err))
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
  getPostByCategory(event:any){
    this.service.getPostByCategory(event.target.id).then(res=>{
      this.listPost=res;
      this.listPost=this.listPost.data;
    })
  }
}
