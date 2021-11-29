import { Component, OnInit, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ManageCategoriesService } from '../admin/manage-categories/manage-categories.service';
import { CreatePostService } from '../create-post/create-post.service';
import { SignInService } from '../sign-in/sign-in.service';
import { ForumsService } from './forums.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css'],
  providers: [ForumsService, SignInService, CreatePostService, ManageCategoriesService]
})
export class ForumsComponent implements OnInit {

  listGroup: any;
  listCate: any = [];
  listPost: any;
  listCategories: any;
  user: any;
  myAvatar: any;
  cateName: any;
  countPosts: any;
  isEmpty: boolean = false;
  constructor(private renderer: Renderer2, private service: ForumsService,
    private signInService: SignInService, private cookieService: CookieService,
    private createPostService: CreatePostService, private toastr: ToastrService,
    private manageCateService: ManageCategoriesService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();


    //Lấy categories
    this.service.getForumsCategory().then(res => {
      this.listCategories = res;
      this.listCategories = this.listCategories.data.Category;
    }).catch(err => this.toastr.error(err.error.msg))

    //Lấy user
    this.signInService.getUser(this.cookieService.get("authToken")).then(res => {
      this.user = res;
      this.user = this.user.data;
      this.myAvatar = this.user.Avatar
    })
      .catch(err => {
        // console.log(err)
        this.toastr.error(err.error.msg)
      })

    //getCate
    this.manageCateService.getGroup().then(res => {
      this.listGroup = res;
      this.listGroup = this.listGroup.data;
      for (let group of this.listGroup) {
        if (group.id == "Forum") {
          for (let cate of group.Category) {
            this.listCate.push(cate)
          }
          this.selectedValueCateId = this.listCate[0].id
        }
      }
    }).catch(err => this.toastr.error(err.error.msg))

    //Lấy danh sách bài viết trang Forums
    this.service.getPost().then(res => {
      this.listPost = res;
      this.listPost = this.listPost.data;
      this.countPosts = this.listPost.length
      // console.log(this.listPost)
      this.spinner.hide();
    })
      .catch(err => {
        // console.log(err)
        this.spinner.hide();
        this.isEmpty = true;
      })

  }

  active(event: any) {
    if (document.getElementsByClassName('active').length > 0) {
      var items = document.getElementsByClassName("item");
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active")
      }
    }
    this.renderer.addClass(document.getElementById(event.target.id), "active")
  }
  getPostByCategory(event: any) {
    this.service.getPostByCategory(event.target.id).then(res => {
      this.listPost = res;
      this.listPost = this.listPost.data;
      this.countPosts = this.listPost.length;
      this.cateName = event.target.innerText;
      this.isEmpty = false
    }).catch(err => {

      this.countPosts = 0;
      this.cateName = event.target.innerText;
      this.toastr.error(err.error.msg);
      this.isEmpty = true;
    })
  }
  resultCreate: any
  dataCreate: any
  onSubmit(form: any) {
    // console.log(form.value)
    this.dataCreate = {}
    this.dataCreate = form.value
    this.dataCreate["GroupId"] = "Forum"
    if (form.value.Content == "") {
      this.toastr.error("Nhập thông tin nội dung cho bài viết")
    } else {
      this.createPostService.createPost(form.value).then(res => {
        this.resultCreate = res
        this.toastr.success(this.resultCreate.msg)
        // console.log(res)
      }).catch(err => {
        // console.log(err)
        this.toastr.error(err.error.msg);

      });
    }
  }
  selectedValueCateId: any;
  onChangeCate(event: any) {
    this.selectedValueCateId = event;
  }
  isOverMaxLength: boolean = false;
  checkLength(event: any) {
    if (event.length >= 50) {
      this.isOverMaxLength = true;
    } else {
      this.isOverMaxLength = false;
    }
  }
}
