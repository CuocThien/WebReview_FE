import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManagePostsService } from './manage-posts.service';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css'],
  providers: [ManagePostsService]
})
export class ManagePostsComponent implements OnInit {

  constructor(private renderer:Renderer2, private service:ManagePostsService,
    private toastr:ToastrService) { }

  listPost:any;
  listPostExperience:any=[]
  listPostReview:any=[]
  listPostForums:any=[]
  another:any=[]
  filterString:any="Experience";
  isApproved:any=true;
  p:number=1;
  delPostId:any;
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
          // console.log(this.listPostReview)
        }else if(post.Id === "Experience"){
          for(let expPost of post.Post){
            this.listPostExperience.push(expPost);
          }
          // console.log(this.listPostExperience)
        }else if(post.Id=="Forum"){
          for(let forumPost of post.Post){
            this.listPostForums.push(forumPost);
          }
          // console.log(this.listPostForums)
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
    // console.log(this.filterString)
  }
  resultUpdateStatus:any;
  updatePostStatus(event:any){
    var items = event.target.id.split('&');
    this.service.updatePostStatus(items[0],items[1]).then(res=>{
      this.resultUpdateStatus = res;
      this.toastr.success(this.resultUpdateStatus.msg)
      this.getData(false)
    }).catch(err=>{
      console.log(err);
      this.toastr.error(err.error.msg,"Lỗi")
    })
  }
  getPostIdDel(event:any){
    this.delPostId = event.target.id
  }
  resultDelPost:any
  deletePost(){
    this.service.deletePost(this.filterString,this.delPostId).then(res=>{
      this.resultDelPost = res;
      this.toastr.success(this.resultDelPost.msg)
      this.getData(true)
      this.p=1;
    }).catch(err=>{
      console.log(err);
      this.toastr.error(err.error.msg,"Lỗi")
    })
  }
}
