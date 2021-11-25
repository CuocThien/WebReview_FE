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
  providers: [ForumsService,SignInService, CreatePostService, ManageCategoriesService]
})
export class ForumsComponent implements OnInit {

  listGroup: any;
  listCate: any = [];
  listPost:any;
  listCategories:any;
  user:any;
  myAvatar: any;
  cateName:any;
  countPosts:any;
  ckeConfig:any;
  constructor(private renderer:Renderer2, private service:ForumsService, 
    private signInService:SignInService, private cookieService:CookieService,
    private createPostService:CreatePostService, private toastr:ToastrService,
    private manageCateService: ManageCategoriesService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.ckeConfig = {
      extraPlugins: ['uploadimage'],
      filebrowserImageUploadUrl:
        'https://oggy-webreview.herokuapp.com/image/upload',
        width:'100%',
        height:'400px',
    };

    
    //Lấy categories
    this.service.getForumsCategory().then(res=>{
      this.listCategories = res;
      this.listCategories = this.listCategories.data.Category;
    })

    //Lấy user
    this.signInService.getUser(this.cookieService.get("authToken")).then(res=>{
      this.user = res;
      this.user = this.user.data;
      this.myAvatar = this.user.Avatar
    })
    .catch(err=>console.log(err))

    //getCate
    this.manageCateService.getGroup().then(res => {
      this.listGroup = res;
      this.listGroup = this.listGroup.data;
      for (let group of this.listGroup) {
        if (group.id == "Forum") {
          for (let cate of group.Category) {
            this.listCate.push(cate)
          }
          this.selectedValueCateId=this.listCate[0].id
        }
      }
    })

    //Lấy danh sách bài viết trang Forums
    this.service.getPost().then(res=>{
      this.listPost = res;
      this.listPost = this.listPost.data;
      this.countPosts = this.listPost.length
      // console.log(this.listPost)
      this.spinner.hide();
    })
    .catch(err=>{console.log(err)
      this.spinner.hide();
    })

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
      this.countPosts = this.listPost.length;
      this.cateName=event.target.innerText;
    })
  }
  resultCreate:any
  dataCreate:any
  onSubmit(form:any){
    console.log(form.value)
    this.dataCreate={}
    this.dataCreate = form.value
    this.dataCreate["GroupId"]="Forum"
    if (form.value.Content==""){
      this.toastr.error("Nhập thông tin nội dung cho bài viết")
    }else{
      this.createPostService.createPost(form.value).then(res=>{
        this.resultCreate=res
        this.toastr.success(this.resultCreate.msg)
        // console.log(res)
      }).catch(err=>console.log(err));
    }
  }
  selectedValueCateId: any;
  onChangeCate(event: any) {
    this.selectedValueCateId = event;
  }
  isOverMaxLength:boolean=false;
checkLength(event:any){
  if(event.length>=50){
    this.isOverMaxLength=true;
  }else{
    this.isOverMaxLength = false;
  }
}
}
