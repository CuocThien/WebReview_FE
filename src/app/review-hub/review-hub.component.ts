import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IndexService } from '../index/index.service';
import { ReviewService } from './review-hub.service';

@Component({
  selector: 'app-review-hub',
  templateUrl: './review-hub.component.html',
  styleUrls: ['./review-hub.component.css'],
  providers: [ReviewService, IndexService]
})
export class ReviewHubComponent implements OnInit {
  constructor(private service: ReviewService, private renderer: Renderer2, private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }
  categories: any;
  listPost: any;
  isEmpty: boolean = false;
  p: number = 1;
  ngOnInit(): void {
    this.spinner.show();
    this.service.getReviewCategory().then(res => {
      this.categories = res;
      this.categories = this.categories.data.Category;
    }).catch(err => this.toastr.error(err.error.msg))

    this.service.getReviewPost()
      .then(res => {
        this.listPost = res;
        this.listPost = this.listPost.data
        // console.log(this.listPost)
        this.spinner.hide();
      })
      .catch(err => {
        console.log(err);
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
    this.p = 1;
    this.service.getPostByCategory(event.target.id).then(res => {
      this.listPost = res;
      this.listPost = this.listPost.data;
      this.isEmpty = false;
    }).catch(err => {
      // console.log(err);
      this.toastr.error(err.error.msg)
      this.isEmpty = true
    })
  }
  backToTop(){
    window.scrollTo(0,270)
  }
}
