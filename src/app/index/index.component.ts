import { Component, OnInit } from '@angular/core';
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
  
  constructor(private service:IndexService, private router:AppRoutingModule) { }

  ngOnInit(): void {
    this.service.getReviewPost()
    .then(res=>{this.listReviewPost=res;
      this.listReviewPost=this.listReviewPost.data.topreview;
    });

    this.service.getShareExpPost()
    .then(res=>{this.listShareExpPost=res;
      this.listShareExpPost = this.listShareExpPost.data.topexp;
    })

    this.service.getForumPost()
    .then(res=>{this.listForumPost=res;
      this.listForumPost = this.listForumPost.data.topfrm;
    })
  }
  shareExp(){
    this.router.shareExp();
  }
  reviewHub(){
    this.router.reviewHub();
  }
}
