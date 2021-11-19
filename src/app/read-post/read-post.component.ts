import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReadPostService } from './read-post.service';


@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css'],
  providers: [ReadPostService],
  encapsulation: ViewEncapsulation.None
})
export class ReadPostComponent implements OnInit {

  constructor(private route:ActivatedRoute, private service:ReadPostService) { 
    
  }
  post:any
  postId:any;
  groupId:any;

  ngOnInit(): void {
    this.groupId=this.route.snapshot.paramMap.get("GroupId");
    this.postId=this.route.snapshot.paramMap.get("PostId");
    // this.route.paramMap.subscribe((params:ParamMap)=>{
    //   this.postId = params.get("PostId")
    //   this.groupId = params.get("GroupId")
      this.service.getDetailPost(this.groupId, this.postId).then(res=>{
        this.post = res;
        this.post = this.post.data[0]
        console.log(this.post)
        // console.log(this.post.dataPost.Content)
      })
      .catch(err=>console.log(err))
    // })
    // console.log(this.groupId+"/"+this.postId)
    
    
    
  }

}
