import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { SignInService } from '../sign-in/sign-in.service';
import { CommentService } from './comment.service';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MyBootstrapModalComponent } from '../modals/my-bootstrap-modal/my-bootstrap-modal.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [SignInService, CommentService]
})
export class CommentComponent implements OnInit {
  isDisplay:boolean=false;
  @Input() listCmt:any;
  @Input() postId:any;
  @Input() countCmt:any;
  txtCmt:any;
  user:any;
  dataPostCmt:any;
  myAvatar:any;
  constructor(private renderer:Renderer2, private signInService:SignInService, 
    private cookieService:CookieService, private router:AppRoutingModule,
    private service:CommentService, private toastr:ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    //Lấy User
    if(this.cookieService.get("authToken")!=""){
      this.signInService.getUser(this.cookieService.get("authToken")).then(res=>{
        this.user = res;
        this.user = this.user.data;
        this.myAvatar = this.user.Avatar;
      })
    }
  }
  turnOnReply(event:any){
    const id = event.target.name;
    if(this.cookieService.get("authToken")==""){
      this.router.signin();
    }
    if(document.getElementById(id)?.style.display=="none")
    {
      this.renderer.setStyle(document.getElementById(id),"display","flex")
    }else{
      this.renderer.setStyle(document.getElementById(id),"display","none")
    }
  }
  resPostCmt:any;
  postComment(){
    this.txtCmt = document.getElementById("postCmt-"+this.postId);
    let content = this.txtCmt.value;
    this.dataPostCmt = {}
    this.dataPostCmt["PostId"]=this.postId;
    this.dataPostCmt["Content"]=content;
    // console.log(this.dataPostCmt)
    this.service.postCmt(this.dataPostCmt).then(res=>{
      this.resPostCmt = res;
      this.toastr.success(this.resPostCmt.msg);
      this.txtCmt.value = '';

      this.refreshCmt()
    })
  }

  resPostReply:any;
  dataPostReply:any;
  txtReply:any;
  postReply(event:any){
    const id = event.target.id;
    this.txtReply = document.getElementById("contentReply_"+id);
    let content = this.txtReply.value;
    
    this.dataPostReply = {}
    this.dataPostReply["_id"]=id;
    this.dataPostReply["Content"]=content;
    // console.log(this.dataPostCmt)
    this.service.postReply(this.dataPostReply).then(res=>{
      this.resPostReply = res;
      this.toastr.success(this.resPostReply.msg);
      this.txtReply.value = '';

      this.refreshCmt();
    })
  }
  setIdDelCmt(event:any){
    var el = document.getElementsByClassName("delCmt");
    this.renderer.setAttribute(el[0],"id",event.target.id);
  }
  resultDelCmt:any;
  deleteCmt(event:any){
    this.service.deleteCmt(event.target.id).then(res=>{
      this.resultDelCmt = res;
      this.toastr.success(this.resultDelCmt.msg);

      if(this.countCmt==1){
        this.countCmt=0;
        this.listCmt=[];
      }else{
        this.refreshCmt()}
    })
    .catch(err=>{this.toastr.error(err.error.msg)})
  }

  setIdDelReply(event:any){
    var el = document.getElementsByClassName("delReply");
    this.renderer.setAttribute(el[0],"id",event.target.id);
  }
  dataDeleteReply:any;
  resultDelReply:any;
  deleteReply(event:any){
    var id = event.target.id.split('&');
    this.dataDeleteReply={}
    this.dataDeleteReply["_id"]=id[0];
    this.dataDeleteReply["idComment"]=id[1];
    this.service.deleteReply(this.dataDeleteReply).then(res=>{
      this.resultDelReply = res;
      this.toastr.success(this.resultDelReply.msg);

      this.refreshCmt()
    })
    .catch(err=>this.toastr.error(err.error.msg))
  }
  closeModal: any;
  openModal(event:any) {
    const modalRef = this.modalService.open(MyBootstrapModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
      });
    let content = event.target.name;
    let data = content;

    modalRef.componentInstance.fromParent = data;
    if(event.target.className=="updateCmt"){
      modalRef.componentInstance.isReply = false;
      modalRef.componentInstance._id = event.target.id;
    }else{
      modalRef.componentInstance.isReply = true;
      var id=event.target.id.split('&')
      modalRef.componentInstance._id = id[0];
      modalRef.componentInstance.idComment=id[1];
    }
    modalRef.result.then(res=>{ setTimeout(()=>{ 
      this.refreshCmt()
  }, 1000);})
  }
  
  refreshCmt(){
    this.service.getCmt(this.postId).then(res=>{
      this.listCmt = res;
      this.countCmt = this.listCmt.data.countCmt;
      this.listCmt = this.listCmt.data.comment;
    })
    .catch(err=>console.log(err));
  }
}
