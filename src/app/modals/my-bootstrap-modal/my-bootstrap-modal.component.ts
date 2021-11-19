import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommentComponent } from 'src/app/comment/comment.component';
import { CommentService } from 'src/app/comment/comment.service';

@Component({
  selector: 'app-my-bootstrap-modal',
  templateUrl: './my-bootstrap-modal.component.html',
  styleUrls: ['./my-bootstrap-modal.component.css'],
  providers: [CommentService]
})
export class MyBootstrapModalComponent implements OnInit {

  @Input() fromParent:any;
  @Input() _id:any;
  @Input() idComment:any;
  @Input() isReply:any;


  constructor(public activeModal: NgbActiveModal, private commentService:CommentService,
              private toastr:ToastrService) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
  dataUpdateCmt:any;
  result:any;
  updateCmt(){
    this.dataUpdateCmt={}
    this.dataUpdateCmt["_id"]=this._id;
    this.dataUpdateCmt["Content"]=this.fromParent;
    if(this.isReply==false){
      this.commentService.updateCmt(this.dataUpdateCmt).then(res=>{
        this.result=res;
        this.toastr.success(this.result.msg)
      })
      .catch(err=>this.toastr.error(err.error.msg))
    }else{
      this.dataUpdateCmt["idComment"]=this.idComment;
      this.commentService.updateReply(this.dataUpdateCmt).then(res=>{
        this.result=res;
        this.toastr.success(this.result.msg)
      })
      .catch(err=>this.toastr.error(err.error.msg))
    }
    // console.log(this.isReply);
    // console.log(this._id);
    // console.log(this.fromParent)
  }
}
