import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ManageGroupService } from './manage-group.service';

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.css'],
  providers: [ManageGroupService]
})
export class ManageGroupComponent implements OnInit {

  constructor(private service:ManageGroupService,private toastr:ToastrService, private spinner:NgxSpinnerService) { }

  listGroup:any;
  isDel:any=false;
  ngOnInit(): void {
    this.spinner.show()
    this.getGroup();
  }
  result:any;
  p:number=1;
  Id:any;
  Name:any;
  inputId:any;
  inputName:any;
  onSubmit(formAddGroup:any){
    console.log(formAddGroup.value)
    if(formAddGroup.invalid){
      this.toastr.error("Nhập đầy đủ thông tin!!!","Lỗi")
    }else{
      this.service.addGroup(formAddGroup.value).then(res=>{
        this.result = res;
        this.toastr.success(this.result.msg);
        this.getGroup();
        this.inputId = document.getElementsByName("Id")
        this.inputId[0].value=""
        this.inputName = document.getElementsByName("Name")
        this.inputName[0].value=""
      }).catch(err=>{
        this.result = err;
        // console.log(err)
        this.toastr.error(this.result.error.msg)
      })
    }
  }
  getGroup(){
    this.spinner.show();
    this.service.getGroup().then(res=>{
      this.listGroup = res;
      this.listGroup = this.listGroup.data;
      this.spinner.hide();
    })
    .catch(err=>{console.log(err)
      this.spinner.hide();
    })
  }
  getGroupDeleted(){
    this.spinner.show();
    this.service.getGroupDeleted().then(res=>{
      this.listGroup = res;
      this.listGroup = this.listGroup.data;
      this.spinner.hide();
    })
    .catch(err=>{console.log(err);
      this.spinner.hide()
    })
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
  dataDel:any={}
  deleteGroup(){
    this.dataDel["Status"]=false;
    this.service.changeStatusGroup(this.Id,this.dataDel).then(res=>{
      this.resultDelete = res;
      this.toastr.success(this.resultDelete.msg);
      this.getGroup()
    }).catch(err=>{
      this.resultDelete = err;
      this.toastr.error(this.resultDelete.error.msg,"Lỗi!!!")
    })
  }
  resultRestore:any
  dataRes:any={}
  restoreGroup(){
    this.dataRes["Status"]=true;
    this.service.changeStatusGroup(this.Id,this.dataRes).then(res=>{
      this.resultRestore = res;
      this.toastr.success(this.resultRestore.msg);
      this.getGroupDeleted()
    }).catch(err=>{
      this.resultRestore = err;
      this.toastr.error(this.resultRestore.error.msg,"Lỗi!!!")
    })
  }
  changeFilter(event:any){
    console.log(event.target.value)
    const filter=event.target.value;
    if(filter == "using"){
      this.getGroup();
      this.isDel = false;
    }else{
      this.getGroupDeleted();
      this.isDel = true;
    }
  }
}
