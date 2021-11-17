import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManageGroupService } from './manage-group.service';

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.css'],
  providers: [ManageGroupService]
})
export class ManageGroupComponent implements OnInit {

  constructor(private service:ManageGroupService,private toastr:ToastrService) { }

  listGroup:any;
  ngOnInit(): void {
    this.getGroup();
  }
  result:any;
  p:number=1;
  Id:any;
  Name:any;
  onSubmit(formAddGroup:any){
    console.log(formAddGroup.value)
    if(formAddGroup.invalid){
      this.toastr.error("Nhập đầy đủ thông tin!!!","Lỗi")
    }else{
      this.service.addGroup(formAddGroup.value).then(res=>{
        this.result = res;
        this.toastr.success(this.result.msg);
        this.getGroup();
      }).catch(err=>{
        this.result = err;
        // console.log(err)
        this.toastr.error(this.result.error.msg)
      })
    }
  }
  getGroup(){
    this.service.getGroup().then(res=>{
      this.listGroup = res;
      this.listGroup = this.listGroup.data;
    })
    .catch(err=>console.log(err))
  }
  update(event:any){
    this.Id = event.target.id;
    this.Name = event.target.name;
  }
  data:any;
  resultUpdate:any;
  updateGroup(){
    this.data={}
    this.data["Name"]= this.Name
    this.service.updateGroup(this.Id,this.data).then(res=>{
      this.resultUpdate = res;
      this.toastr.success(this.resultUpdate.msg);
      this.getGroup()
    }).catch(err=>{
      this.resultUpdate = err;
      this.toastr.error(this.resultUpdate.error.msg,"Lỗi!!!")
    })
  }
  resultDelete:any
  deleteGroup(){
    this.service.deleteGroup(this.Id).then(res=>{
      this.resultDelete = res;
      this.toastr.success(this.resultDelete.msg);
      this.getGroup()
    }).catch(err=>{
      this.resultDelete = err;
      this.toastr.error(this.resultDelete.error.msg,"Lỗi!!!")
    })
  }
}
