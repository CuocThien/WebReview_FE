import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IndexService } from '../index/index.service';
import { ShareExperienceService } from './share-experience.service';

@Component({
  selector: 'app-share-experience',
  templateUrl: './share-experience.component.html',
  styleUrls: ['./share-experience.component.css'],
  providers: [ShareExperienceService, IndexService]
})
export class ShareExperienceComponent implements OnInit {

  constructor(private service: ShareExperienceService, private renderer: Renderer2, private indexService: IndexService,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }
  categories: any;
  listPost: any;
  listHotPost: any;
  isEmpty: boolean = false;
  p: number = 1;
  ngOnInit(): void {
    this.spinner.show();
    this.service.getShareExpCategory().then(res => {
      this.categories = res;
      this.categories = this.categories.data.Category;
    }).catch(err => {
      // console.log(err);
      this.toastr.error(err.error.msg)
    })


    this.indexService.getPost().then(res => {
      this.listHotPost = res;
      this.listHotPost = this.listHotPost.data.topexp
      // console.log(this.listHotPost)
    })
      .catch(err => {
        // console.log(err);
        this.toastr.error(err.error.msg)
      })


    this.service.getShareExpPost().then(res => {
      this.listPost = res;
      this.listPost = this.listPost.data
      // console.log(this.listPost)
      this.spinner.hide();
    })
      .catch(err => {
        // console.log(err);
        this.spinner.hide();
        this.toastr.error(err.error.msg)
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
    var itemsA = document.getElementsByClassName("item");
      for (let i = 0; i < itemsA.length; i++) {
        if(itemsA[i].id == event.target.id){
          this.renderer.addClass(itemsA[i], "active")
        }
      }
  }
  getPostByCategory(event: any) {
    this.p = 1;
    this.service.getPostByCategory(event.target.id).then(res => {
      this.listPost = res;
      this.listPost = this.listPost.data;
      this.isEmpty = false;
    }).catch(err => {
      // console.log(err);
      this.toastr.error(err.error.msg)
      this.isEmpty = true;
    })
  }
  backToTop(){
    window.scrollTo(0,170)
  }
}
