import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { IndexService } from './index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [IndexService]
})
export class IndexComponent implements OnInit {
  p:number = 1;
  listReviewPost:any;
  listShareExpPost:any;
  listForumPost:any;
  lengthReview:any;
  
  constructor(private service:IndexService, private router:AppRoutingModule, private spinner:NgxSpinnerService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.getPost()
    .then(res=>{
      this.listReviewPost=res;
      this.listShareExpPost=res;
      this.listForumPost=res;
      this.listReviewPost=this.listReviewPost.data.topreview;
      this.listShareExpPost=this.listShareExpPost.data.topexp;
      this.listForumPost=this.listForumPost.data.topfrm;
      this.lengthReview=this.listReviewPost.length;
    })
    .catch(err=>{
      // console.log(err)
      this.toastr.error(err.error.msg)
    })
  }
  shareExp(){
    this.router.shareExp();
  }
  reviewHub(){
    this.router.reviewHub();
  }
  checkStopSpinner(check:any){
    if(check===true)
      this.spinner.hide();
  }
}
