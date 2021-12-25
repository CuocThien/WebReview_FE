import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: AppRoutingModule, private cookieService: CookieService,
    private routerLink:Router) { }
  toUsers: boolean = false;
  toPosts: boolean = true;
  toCategories: boolean = false;
  toGroup: boolean = false;
  toComments: boolean = false;
  menu:any;
  ngOnInit(): void {

    this.menu = this.route.snapshot.paramMap.get("Menu");
    if(this.menu!=null){
      this.menuSelected(this.menu)
    }else{
      this.menuSelected("posts")
    }
    if (this.cookieService.get("isAdmin") == "false" || this.cookieService.get("authToken") == "") {
      this.router.pageError()
    }
  }
  redirect(event: any) {
    let id = event.target.id;
    this.menuSelected(id);
  }
  active(event: any) {
    var items = document.getElementsByClassName('items')
    for (let i = 0; i < items.length; i++) {
      // console.log(items[i].classList[1])
      if (items[i].classList[1] == "active") {
        items[i].classList.remove("active");
      }
    }
    document.getElementById(event.target.id)?.classList.add("active");
    // this.renderer.addClass(document.getElementById(event.target.id),"active")
  }
  menuSelected(id:any){
    if (id === "users") {
      this.toUsers = true;
      this.toPosts = false;
      this.toCategories = false;
      this.toGroup = false;
      this.toComments = false;
    } else if (id === "posts") {
      this.toUsers = false;
      this.toPosts = true;
      this.toCategories = false;
      this.toGroup = false;
      this.toComments = false;
    } else if (id === "group") {
      this.toUsers = false;
      this.toPosts = false;
      this.toCategories = false;
      this.toGroup = true;
      this.toComments = false;
    } else if (id === "comments") {
      this.toUsers = false;
      this.toPosts = false;
      this.toCategories = false;
      this.toGroup = false;
      this.toComments = true;
    }else {
      this.toUsers = false;
      this.toPosts = false;
      this.toCategories = true;
      this.toGroup = false;
      this.toComments = false;
    }
    if(id==="posts"){
      this.routerLink.navigate(['/admin/'+id], {queryParams: {approved: true, group: "Default", page: 1 }})
    }else{
    this.routerLink.navigate(['/admin/'+id])}
  }
}
