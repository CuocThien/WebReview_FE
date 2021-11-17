import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManageCategoriesService } from './manage-categories.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css'],
  providers: [ManageCategoriesService]
})
export class ManageCategoriesComponent implements OnInit {

  constructor(private service:ManageCategoriesService, private toastr:ToastrService) { }

  cateId:any;
  groupId:any;
  cateName:any;
  listGroup:any;selectedValue:any;
  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.service.getGroup().then(res=>{
      this.listGroup=res;
      this.listGroup = this.listGroup.data;
      this.selectedValue=this.listGroup[0].id;
    })
  }
  resultAddCate:any;
  onSubmit(formAddCategory:any){
    console.log(formAddCategory.value)
    if(formAddCategory.invalid){
      this.toastr.error("Nhập đầy đủ thông tin để thêm!!", "Lỗi!!!")
    }else{
      this.service.addCategory(formAddCategory.value).then(res=>{
        this.resultAddCate = res;
        this.toastr.success(this.resultAddCate.msg)
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
    this.service.updateCategory(this.cateId,this.dataUpdate).then(res=>{
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
    this.service.deleteCategory(this.cateId,this.dataDelete).then(res=>{
      this.resultDelete = res;
      this.toastr.success(this.resultDelete.msg);
      this.getData()
    }).catch(err=>{
      this.resultDelete = err;
      this.toastr.error(this.resultDelete.error.msg)
      console.log(err)
    })
  }
}
