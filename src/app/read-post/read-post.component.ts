import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReadPostService } from './read-post.service';
import { ManagePostsService} from '../admin/manage-posts/manage-posts.service'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css'],
  providers: [ReadPostService,ManagePostsService],
  encapsulation: ViewEncapsulation.None
})
export class ReadPostComponent implements OnInit {

  constructor(private route:ActivatedRoute, private service:ReadPostService,private cookieService:CookieService,
    private managePostService:ManagePostsService, private toastr:ToastrService) { 
    
  }
  post:any
  postId:any;
  groupId:any;
  isOwner:any;
  url:any;
  isApproved:any=true;
  isAdmin:any;
  ngOnInit(): void {
    this.groupId=this.route.snapshot.paramMap.get("GroupId");
    this.postId=this.route.snapshot.paramMap.get("PostId");
    this.url=this.route.url
    this.url = this.url._value[1].path;
   
    if(this.url=="admin"){
      this.isApproved=false;
      this.service.getDetailPostAdmin(this.groupId, this.postId).then(res=>{
        this.post = res;
        // console.log(res)
        this.post = this.post.data
        
        console.log(this.post)
        if(this.cookieService.get("accountId")==this.post.dataPost.AccountId){
          this.isOwner = true
        }else{
          this.isOwner = false;
        }
        // console.log(this.post.dataPost.Content)
      })
      .catch(err=>console.log(err))
    }else{
      if(this.cookieService.get("isAdmin")=="true"){
        this.isAdmin = true;
      }
      this.service.getDetailPost(this.groupId, this.postId).then(res=>{
        this.post = res;
        // console.log(res)
        this.post = this.post.data
        // console.log(this.post)
        if(this.cookieService.get("accountId")==this.post.dataPost.AccountId){
          this.isOwner = true
        }else{
          this.isOwner = false;
        }
        // console.log(this.post.dataPost.Content)
      })
      .catch(err=>console.log(err))
    }
    // })
    // console.log(this.groupId+"/"+this.postId)
    
    
    
  }
  resultUpdateStatus:any;
  updatePostStatus(){
    this.managePostService.updatePostStatus(this.groupId,this.postId).then(res=>{
      this.resultUpdateStatus = res;
      this.toastr.success(this.resultUpdateStatus.msg)
    }).catch(err=>{
      console.log(err);
      this.toastr.error(err.error.msg,"Lỗi")
    })
  }
  resultDelPost:any
  deletePost(){
    this.managePostService.deletePost(this.groupId,this.postId).then(res=>{
      this.resultDelPost = res;
      this.toastr.success(this.resultDelPost.msg)
    }).catch(err=>{
      console.log(err);
      this.toastr.error(err.error.msg,"Lỗi")
    })
  }
}
