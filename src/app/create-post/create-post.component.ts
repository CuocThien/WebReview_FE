import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageCategoriesService } from '../admin/manage-categories/manage-categories.service';
import { SignInService } from '../sign-in/sign-in.service';
import { UploadImageService } from '../upload-image.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  providers: [SignInService,UploadImageService,ManageCategoriesService]
})
export class CreatePostComponent implements OnInit {

  constructor(private signInService:SignInService,private uploadImageService:UploadImageService,
    private service:ManageCategoriesService) { }
  ckeConfig: any;
  listGroup:any;
  listCate:any;
  ngOnInit(): void {
    this.ckeConfig = {
      extraPlugins: ['uploadimage'],
      // uploadUrl:
      //   'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      // filebrowserBrowseUrl:
      //   'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      // filebrowserImageBrowseUrl:
      //   'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      // filebrowserUploadUrl:
      //   'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:
        'https://oggy-webreview.herokuapp.com/image/upload',
        width:'100%',
        height:'500px',
    };

    this.service.getGroup().then(res=>{
      this.listGroup=res;
      this.listGroup = this.listGroup.data;
      this.listCate = this.listGroup[0].Category;
      this.selectedValueGroupId=this.listGroup[0].id;
      this.selectedValueCateId=this.listGroup[0].Category[0].id;
    })

  }
onSubmit(form:any) {
    console.log( form.value );
}
isOverMaxLength:boolean=false;
checkLength(event:any){
  if(event.length>=100){
    this.isOverMaxLength=true;
  }else{
    this.isOverMaxLength = false;
  }
}
isOverMaxLengthOverview:boolean=false;
checkLengthOverview(event:any){
  if(event.length>=300){
    this.isOverMaxLengthOverview=true;
  }else{
    this.isOverMaxLengthOverview = false;
  }
}
result:any;
imageSrc:any;
readURL(event: any): void {
  if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset','angular_cloudinary');
      data.append('cloud_name','blogreview')
      this.uploadImageService.updateImage(data)
      .then(res=>{
        this.result=res;
        this.imageSrc=this.result.url;
      })
      .catch(err=>console.log(err))
  }
}
selectedValueGroupId:any;
onChangeGroup(event:any){
  this.selectedValueGroupId=event;
  for(let i = 0; i< this.listGroup.length;i++){
    if(this.listGroup[i].id==this.selectedValueGroupId){
      this.listCate=this.listGroup[i].Category;
      console.log(this.listCate)
    }
  }
  
  }
selectedValueCateId:any;
onChangeCate(event:any){
  this.selectedValueCateId=event;
  }
}
