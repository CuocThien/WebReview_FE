import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from 'src/app/comment/comment.service';
import { ManageGroupService } from '../manage-group/manage-group.service';
import { ManageCommentsService } from './manage-comments.service';

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.css'],
  providers: [ManageGroupService, ManageCommentsService, CommentService]
})
export class ManageCommentsComponent implements OnInit {

  constructor(private manageGroupService: ManageGroupService, private spinner: NgxSpinnerService,
    private manageCommentService:ManageCommentsService, private commentService:CommentService,
    private toastr:ToastrService) { }
  filterString: any;
  listGroup: any;
  listAllData:any;
  listCmtReview:any=[];
  listCmtExp:any=[];
  listCmtForum:any=[];
  another:any=[];
  cmtId:any;
  cmtContent:any;
  p:number=1;
  ngOnInit(): void {
    this.spinner.show();
    this.manageGroupService.getGroup().then(res => {
      this.listGroup = res;
      this.listGroup = this.listGroup.data;
      this.filterString = this.listGroup[0]._id
      // console.log(this.filterString)
    }).catch(err => console.log(err))
this.getData()
    
  }
  getData(){
    this.listCmtExp = [];
    this.listCmtForum = [];
    this.listCmtReview = [];
    this.manageCommentService.getComment().then(res => {
      this.listAllData = res;
      this.listAllData = this.listAllData.data
      // console.log(this.listCmtReview)
      for (let group of this.listAllData) {
        if (group.groupId === "Review") {
          console.log(group)
          for (let reviewCmt of group.data) {
            this.listCmtReview.push(reviewCmt)
          }
          // console.log(this.listCateReview)
        } else if (group.groupId === "Experience") {
          for (let expCmt of group.data) {
            this.listCmtExp.push(expCmt);
          }
          // console.log(this.listPostExperience)
        } else if (group.groupId === "Forum") {
          for (let forumCmt of group.data) {
            this.listCmtForum.push(forumCmt);
          }
          // console.log(this.listPostForums)
        } else {
          for (let anotherPost of group.data) {
            this.another.push(anotherPost);
          }
        }
      }
      this.spinner.hide();
    }).catch(err=>{console.log(err);
      this.spinner.hide();
    })
    
  }
  filter(event: any) {
    this.p=1;
    this.filterString = event;
    // console.log(this.filterString)
  }
  dataDeleteReply:any;
  resultDelCmt:any;
  deleteComment(){
    var ID = this.cmtId.split('&');
    if(ID.length === 2){
      this.dataDeleteReply = {}
    this.dataDeleteReply["_id"] = ID[1];
    this.dataDeleteReply["idComment"] = ID[0];
      this.commentService.deleteReply(this.dataDeleteReply).then(res => {
        this.resultDelCmt = res;
        this.toastr.success(this.resultDelCmt.msg);
        this.getData()
      })
        .catch(err => this.toastr.error(err.error.msg))
    }else{
      this.commentService.deleteCmt(this.cmtId).then(res => {
        this.resultDelCmt = res;
        this.toastr.success(this.resultDelCmt.msg);
        this.getData()
      })
        .catch(err => { this.toastr.error(err.error.msg) })
    }
  }
  setValue(event:any){
    this.cmtId=event.target.id
    this.cmtContent=event.target.name
  }
}
