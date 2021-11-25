import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManageCategoriesService } from '../admin/manage-categories/manage-categories.service';
import { SignInService } from '../sign-in/sign-in.service';
import { UploadImageService } from '../upload-image.service';
import { UpdatePostService } from './update-post.service';
import { ActivatedRoute } from '@angular/router';
import { ReadPostService } from '../read-post/read-post.service';
import { NgxSpinnerService } from 'ngx-spinner';

//nhớ load lại groupid và cateid

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
  providers: [SignInService, UploadImageService, ManageCategoriesService, UpdatePostService, ReadPostService]

})
export class UpdatePostComponent implements OnInit {

  constructor(private uploadImageService: UploadImageService, private route: ActivatedRoute,
    private service: ManageCategoriesService, private toastr: ToastrService,
    private updatePostService: UpdatePostService, private router: Router,
    private readPostService: ReadPostService, private spinner : NgxSpinnerService) { }
  ckeConfig: any;
  listGroup: any;
  listCate: any = [];
  postId: any;
  groupId: any;
  post: any;
  ngOnInit(): void {
    this.spinner.show();
    this.ckeConfig = {
      extraPlugins: ['uploadimage'],
      filebrowserImageUploadUrl:
        'https://oggy-webreview.herokuapp.com/image/upload',
      width: '100%',
      height: '500px',
    };

    this.service.getGroup().then(res => {
      this.listGroup = res;
      this.listGroup = this.listGroup.data;
      for (let group of this.listGroup) {
        if (group.id == this.groupId) {
          console.log(group)
          for (let cate of group.Category) {
            this.listCate.push(cate)
          }
        }
      }
    })

    this.groupId = this.route.snapshot.paramMap.get("GroupId");
    this.postId = this.route.snapshot.paramMap.get("PostId");

    this.readPostService.getDetailPost(this.groupId, this.postId).then(res => {
      this.post = res;
      this.post = this.post.data.dataPost
      this.selectedValueCateId = this.post.CategoryId;
      this.imageSrc = this.post.Image
      // console.log(this.post.dataPost.Content)
      console.log(this.post)
    })
      .catch(err => console.log(err))
  }
  ngAfterViewInit(){
    this.spinner.hide();
  }
  resultUpdate: any
  onSubmit(form: any) {
    if (form.value.Title == "") {
      this.toastr.error("Nhập thông tin tiêu đề cho bài viết")
    } else if (form.value.Content == "") {
      this.toastr.error("Nhập thông tin nội dung cho bài viết")
    } else {
      this.post["Image"] = this.imageSrc;
      this.post["Title"] = form.value.Title;
      this.post["Content"] = form.value.Content;
      this.post["Overview"] = form.value.Overview;
      this.post["CategoryId"] = this.selectedValueCateId
      this.updatePostService.updatePost(this.groupId, this.postId, this.post).then(res => {
        this.resultUpdate = res
        this.toastr.success(this.resultUpdate.msg)
        console.log(res)
        this.router.navigate(['/post-detail/' + this.groupId + '/' + this.postId])
      }).catch(err => console.log(err));
      console.log(this.post);
    }

  }
  isOverMaxLength: boolean = false;
  checkLength(event: any) {
    if (event.length >= 100) {
      this.isOverMaxLength = true;
    } else {
      this.isOverMaxLength = false;
    }
  }
  isOverMaxLengthOverview: boolean = false;
  checkLengthOverview(event: any) {
    if (event.length >= 300) {
      this.isOverMaxLengthOverview = true;
    } else {
      this.isOverMaxLengthOverview = false;
    }
  }
  result: any;
  imageSrc: any;
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'angular_cloudinary');
      data.append('cloud_name', 'blogreview')
      this.uploadImageService.updateImage(data)
        .then(res => {
          this.result = res;
          this.imageSrc = this.result.url;
        })
        .catch(err => console.log(err))
    }
  }


  selectedValueCateId: any;
  onChangeCate(event: any) {
    this.selectedValueCateId = event;
  }
}
