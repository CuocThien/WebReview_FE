import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SignInService } from '../sign-in/sign-in.service';
import { UploadImageService } from '../upload-image.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService,SignInService,DatePipe,UploadImageService]
})
export class ProfileComponent implements OnInit {
  user:any;
  DOB:any;
  imageSrc: any;
  data:any;
  result:any;
  constructor(private service:ProfileService, private signInService:SignInService,
    private cookieService:CookieService,public datepipe: DatePipe, private uploadImageService:UploadImageService) { }

  ngOnInit(): void {
    this.signInService.getUser(this.cookieService.get("authToken"))
    .then(res=>{this.user=res
      this.user=this.user.data;
      this.DOB=this.datepipe.transform(this.user.DOB, 'yyyy-MM-dd');
    this.imageSrc=this.user.Avatar;
    });
    
    
  }
  onSubmit(formUpdateProfile:any){
    this.data=formUpdateProfile.value;
    this.data["Avatar"]=this.imageSrc;
    console.log(this.data)
    this.service.updateUser(this.data);
  }
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
}
