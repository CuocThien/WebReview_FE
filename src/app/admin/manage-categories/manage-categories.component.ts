import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ManageGroupService } from '../manage-group/manage-group.service';
import { ManageCategoriesService } from './manage-categories.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css'],
  providers: [ManageCategoriesService, ManageGroupService]
})
export class ManageCategoriesComponent implements OnInit {

  constructor(private manageCateService:ManageCategoriesService, private toastr:ToastrService,
    private manageGroupService:ManageGroupService, private spinner:NgxSpinnerService) { }

  cateId:any;
  groupId:any;
  cateName:any;
  listGroup:any;
  listCate:any;selectedValue:any;
  isDel:any=false;
  ngOnInit(): void {
    this.spinner.show()
    this.getData()
    this.manageGroupService.getGroup().then(res=>{
      this.listGroup = res;
      this.listGroup = this.listGroup.data;
      this.selectedValue = this.listGroup[0]._id
      console.log(this.listGroup)
      
    }).catch(err=>console.log(err))
  }
  getData(){
    this.spinner.show();
    this.manageCateService.getGroup().then(res=>{
      this.listCate=res;
      this.listCate = this.listCate.data;

      this.spinner.hide()
    }).catch(err=>{console.log(err);
      
      this.spinner.hide()
    })
  }
  getDataDel(){
    this.spinner.show()
    this.manageCateService.getCateDeleted().then(res=>{
      this.listCate=res;
      this.listCate = this.listCate.data;

    this.spinner.hide()
    }).catch(err=>{console.log(err);
      
    this.spinner.hide()
    })
  }
  resultAddCate:any;
  input:any
  onSubmit(formAddCategory:any){
    // console.log(formAddCategory.value)
    if(formAddCategory.invalid){
      this.toastr.error("Nhập đầy đủ thông tin để thêm!!", "Lỗi!!!")
    }else{
      this.manageCateService.addCategory(formAddCategory.value).then(res=>{
        this.resultAddCate = res;
        this.toastr.success(this.resultAddCate.msg)
        this.getData();
        this.input=document.getElementsByName("CateName");
        this.input[0].value=""
      }).catch(err=>{
        this.resultAddCate = err;
        this.toastr.error(this.resultAddCate.error.msg)
      })
    }
  }
  onChange(event:any){
    this.selectedValue=event;
    }
  setValue(event:any){
    var ids=event.target.id.split("&");
    this.groupId=ids[0];
    this.cateId=ids[1];
    this.cateName=event.target.name;
  }
  dataUpdate:any
  resultUpdate:any
  updateCategory(){
    this.dataUpdate={}
    this.dataUpdate["GroupId"]=this.groupId;
    this.dataUpdate["CateName"]=this.cateName;
    this.manageCateService.updateCategory(this.cateId,this.dataUpdate).then(res=>{
      this.resultUpdate = res;
      this.toastr.success(this.resultUpdate.msg);
      this.getData();
    }).catch(err=>{
      this.resultUpdate = err;
      this.toastr.error(this.resultUpdate.error.msg)
    })
  }
  dataDelete:any
  resultDelete:any
  deleteCategory(){
    this.dataDelete={}
    this.dataDelete["GroupId"]=this.groupId;
    this.dataDelete["Status"]=false;
    this.manageCateService.changeStatusCategory(this.cateId,this.dataDelete).then(res=>{
      this.resultDelete = res;
      this.toastr.success(this.resultDelete.msg);
      this.getData()
    }).catch(err=>{
      this.resultDelete = err;
      this.toastr.error(this.resultDelete.error.msg)
      console.log(err)
    })
  }
  dataRes:any
  resultRes:any
  restoreCate(){
    this.dataRes={}
    this.dataRes["GroupId"]=this.groupId;
    this.dataRes["Status"]=true;
    this.manageCateService.changeStatusCategory(this.cateId,this.dataRes).then(res=>{
      this.resultRes = res;
      this.toastr.success(this.resultRes.msg);
      this.getDataDel()
    }).catch(err=>{
      this.resultRes = err;
      this.toastr.error(this.resultRes.error.msg)
      console.log(err)
    })
  }
  changeFilter(event:any){
    // console.log(event.target.value) 
    const filter = event.target.value
    if(filter=="using"){
      this.getData();
      this.isDel=false;
    }else{
      this.getDataDel();
      this.isDel=true;
    }
  }
}
