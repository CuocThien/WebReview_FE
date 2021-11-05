import { Component, OnInit, Renderer2 } from '@angular/core';
import { IndexService } from '../index/index.service';
import { ShareExperienceService } from './share-experience.service';

@Component({
  selector: 'app-share-experience',
  templateUrl: './share-experience.component.html',
  styleUrls: ['./share-experience.component.css'],
  providers: [ShareExperienceService,IndexService]
})
export class ShareExperienceComponent implements OnInit {

  constructor(private service:ShareExperienceService, private renderer:Renderer2, private indexService:IndexService) { }
  categories:any;
  listPost:any;
  listHotPost:any;
  p:number=1;
  ngOnInit(): void {
    this.service.getShareExpCategory().then(res=>{
      this.categories=res;
      this.categories=this.categories.data;
    })

    this.indexService.getShareExpPost().then(res=>{
      this.listPost=res;
      this.listPost=this.listPost.data.experience
      console.log(this.listPost)
    })
    .catch(err=>console.log(err))

    this.indexService.getShareExpPost().then(res=>{
      this.listHotPost=res;
      this.listHotPost=this.listHotPost.data.topexp
      console.log(this.listHotPost)
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
