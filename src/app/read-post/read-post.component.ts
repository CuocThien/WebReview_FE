import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReadPostService } from './read-post.service';
import { ManagePostsService } from '../admin/manage-posts/manage-posts.service'
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css'],
  providers: [ReadPostService, ManagePostsService],
  encapsulation: ViewEncapsulation.None
})
export class ReadPostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ReadPostService, private cookieService: CookieService,
    private managePostService: ManagePostsService, private toastr: ToastrService, private router: AppRoutingModule,
    private spinner: NgxSpinnerService) {

  }
  post: any=[];
  postId: any;
  groupId: any;
  postData:any=[];
  isOwner: any;
  url: any;
  isApproved: any = true;
  isAdmin: any;
  ngOnInit(): void {
    this.spinner.show();
    window.scrollTo(0,0);
    this.groupId = this.route.snapshot.paramMap.get("GroupId");
    this.postId = this.route.snapshot.paramMap.get("PostId");
    this.url = this.route.url
    this.url = this.url._value[1].path;

    if (this.url == "admin") {
      this.isApproved = false;
      this.service.getDetailPostAdmin(this.groupId, this.postId).then(res => {
        this.post = res;
        // console.log(res)
        this.post = this.post.data
        this.postData = this.post.dataPost;
        this.isAdmin = this.cookieService.get("isAdmin")
        this.isApproved = !this.isApproved && this.isAdmin;
        if (this.isApproved == "false")
          this.isApproved = false
        // console.log(this.isApproved)
        // console.log(this.post)
        if (this.cookieService.get("accountId") == this.post.dataPost.AccountId) {
          this.isOwner = true
        } else {
          this.isOwner = false;
        }
        this.spinner.hide()
        // console.log(this.post.dataPost.Content)
      })
        .catch(err => {
          this.toastr.error(err.error.msg)
          this.spinner.hide()
          // console.log(err)
        })
    } else {
      if (this.cookieService.get("isAdmin") == "true") {
        this.isAdmin = true;
      }
      this.isApproved = false;
      this.service.getDetailPost(this.groupId, this.postId).then(res => {
        this.post = res;
        // console.log(res)
        this.post = this.post.data
        this.postData = this.post.dataPost;
        // console.log(this.post)
        if (this.cookieService.get("accountId") == this.post.dataPost.AccountId) {
          this.isOwner = true
        } else {
          this.isOwner = false;
        }
        this.spinner.hide()
        // console.log(this.post.dataPost.Content)
      })
        .catch(err => {
          this.toastr.error(err.error.msg)
          this.spinner.hide()
          // console.log(err)
        })
    }
  }


  resultUpdateStatus: any;
  updatePostStatus() {
    this.managePostService.updatePostStatus(this.groupId, this.postId).then(res => {
      this.resultUpdateStatus = res;
      this.toastr.success(this.resultUpdateStatus.msg)
      this.router.index();
    }).catch(err => {
      // console.log(err);
      this.toastr.error(err.error.msg, "Lỗi")
    })
  }
  resultDelPost: any
  deletePost() {
    this.managePostService.deletePost(this.groupId, this.postId).then(res => {
      this.resultDelPost = res;
      this.toastr.success(this.resultDelPost.msg)

    }).catch(err => {
      // console.log(err);
      this.toastr.error(err.error.msg, "Lỗi")
    })
  }

  backToTop(){
    window.scrollTo(0,0)
  }
}
