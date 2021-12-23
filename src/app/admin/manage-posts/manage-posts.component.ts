import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ManageGroupService } from '../manage-group/manage-group.service';
import { ManagePostsService } from './manage-posts.service';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css'],
  providers: [ManagePostsService, ManageGroupService]
})
export class ManagePostsComponent implements OnInit {

  constructor(private renderer: Renderer2, private service: ManagePostsService,
    private toastr: ToastrService, private router: ActivatedRoute,
    private manageGroupService: ManageGroupService, private spinner: NgxSpinnerService) { }

  listGroup: any;
  listPost: any;
  listAllPost:any = [];
  listPostExperience: any = []
  listPostReview: any = []
  listPostForums: any = []
  another: any = []
  filterString: any;
  isApproved: any = true;
  p: number = 1;
  delPostId: any;
  isAdmin: boolean = false;
  url: any;
  ngOnInit(): void {
    this.spinner.show();
    this.url = this.router.url;
    this.url = this.url._value[0].path;
    if (this.url == "admin") {
      this.isAdmin = true;
    }

    this.filterString = "Default"
    this.manageGroupService.getGroup().then(res => {
      this.listGroup = res;
      this.listGroup = this.listGroup.data;
      // console.log(this.filterString)
    }).catch(err => console.log(err))
    // console.log(this.isAdmin)
    this.getData(true, this.isAdmin)


  }
  getData(approved: any, admin: any) {
    this.listPost = {}
    this.listPostExperience = []
    this.listPostForums = []
    this.listPostReview = []
    this.listAllPost = []
    // this.filterString="Experience"

    // console.log("apro"+approved)
    // console.log("admin "+admin)
    this.service.getPost(approved, admin).then(res => {
      this.listPost = res;
      // console.log(res)
      this.listPost = this.listPost.data;
      for (let post of this.listPost) {
        if (post.Id === "Review") {
          for (let reviewPost of post.Post) {
            this.listPostReview.push(reviewPost)
            this.listAllPost.push(reviewPost)
          }
          // console.log(this.listPostReview)
        } else if (post.Id == "Experience") {
          for (let expPost of post.Post) {
            this.listPostExperience.push(expPost);
            this.listAllPost.push(expPost);
          }
          // console.log(this.listPostExperience)
        } else if (post.Id == "Forum") {
          for (let forumPost of post.Post) {
            this.listPostForums.push(forumPost);
            this.listAllPost.push(forumPost);
          }
          // console.log(this.listPostForums)
        } else {
          for (let anotherPost of post.Post) {
            this.another.push(anotherPost);
          }
        }
      }
      this.spinner.hide();
    }).catch(err => {
      this.toastr.error(err.error.msg)
      // console.log(err);
      this.spinner.hide()
    })
  }
  activeControl(event: any) {
    this.p = 1;
    var item = document.getElementsByClassName('active-control')
    this.renderer.removeClass(item[0], "active-control");
    this.renderer.addClass(document.getElementById(event.target.id), "active-control")
    if (event.target.id == "approved") {
      this.getData(true, this.isAdmin);
      this.isApproved = true;
    } else {
      this.getData(false, this.isAdmin);
      this.isApproved = false;
    }
  }
  filter(event: any) {
    this.p = 1;
    this.filterString = event;
    // console.log(this.filterString)
  }
  resultUpdateStatus: any;
  updatePostStatus(event: any) {
    var items = event.target.id.split('&');
    this.service.updatePostStatus(items[0], items[1]).then(res => {
      this.resultUpdateStatus = res;
      this.toastr.success(this.resultUpdateStatus.msg)
      this.getData(false, this.isAdmin)
    }).catch(err => {
      // console.log(err);
      this.toastr.error(err.error.msg, "Lỗi")
    })
  }
  getPostIdDel(event: any) {
    this.delPostId = event.target.id
  }
  resultDelPost: any
  deletePost() {
    this.service.deletePost(this.filterString, this.delPostId).then(res => {
      this.resultDelPost = res;
      this.toastr.success(this.resultDelPost.msg)
      this.getData(this.isApproved, this.isAdmin)
      this.p = 1;
    }).catch(err => {
      // console.log(err);
      this.toastr.error(err.error.msg, "Lỗi")
    })
  }
}
