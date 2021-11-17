import { Component, OnInit, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SignInService } from '../sign-in/sign-in.service';
import { ForumsService } from './forums.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css'],
  providers: [ForumsService,SignInService]
})
export class ForumsComponent implements OnInit {

  listPost:any;
  listCategories:any;
  user:any;
  myAvatar: any;
  constructor(private renderer:Renderer2, private service:ForumsService, 
    private signInService:SignInService, private cookieService:CookieService) { }

  ngOnInit(): void {
    

    //Lấy danh sách bài viết trang Forums
    this.service.getPost().then(res=>{
      this.listPost = res;
      this.listPost = this.listPost.data;
      // console.log(this.listPost)
    })
    .catch(err=>console.log(err))

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
