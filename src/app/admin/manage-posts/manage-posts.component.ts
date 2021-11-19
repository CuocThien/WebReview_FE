import { Component, OnInit, Renderer2 } from '@angular/core';
import { ManagePostsService } from './manage-posts.service';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css'],
  providers: [ManagePostsService]
})
export class ManagePostsComponent implements OnInit {

  constructor(private renderer:Renderer2, private service:ManagePostsService) { }

  listPost:any;
  listPostExperience:any=[]
  listPostReview:any=[]
  listPostForums:any=[]
  another:any=[]
  filterString:any="Experience";
  isApproved:any=true;
  p:number=1;
  ngOnInit(): void {
    this.getData(true)
  }
  getData(approved:any){
    this.listPost={}
    this.listPostExperience=[]
    this.listPostForums=[]
    this.listPostReview=[]
    this.filterString="Experience"
    this.service.getPost(approved).then(res=>{
      this.listPost = res;
      this.listPost = this.listPost.data;
      for(let post of this.listPost){
        if(post.Id==="Review"){
          for(let reviewPost of post.Post){
            this.listPostReview.push(reviewPost)
          }
          console.log(this.listPostReview)
        }else if(post.Id === "Experience"){
          for(let expPost of post.Post){
            this.listPostExperience.push(expPost);
          }
          console.log(this.listPostExperience)
        }else if(post.Id=="Forum"){
          for(let forumPost of post.Post){
            this.listPostForums.push(forumPost);
          }
          console.log(this.listPostForums)
        }else{
          for(let anotherPost of post.Post){
            this.another.push(anotherPost);
          }
        }
      }
    })
  }
  activeControl(event:any){
    var item=document.getElementsByClassName('active-control')
    this.renderer.removeClass(item[0],"active-control");
    this.renderer.addClass(document.getElementById(event.target.id),"active-control")
    if(event.target.id=="approved"){
      this.getData(true);
      this.isApproved=true;
    }else{
      this.getData(false);
      this.isApproved=false;
    }
  }
  filter(event:any){
    this.filterString=event;
    console.log(this.filterString)
  }
}
