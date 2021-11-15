import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor() { }
  ckeConfig: any;
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
        height:'80%',
    };
  }
  public model = {
    name: 'Hardik',
    description: '<p>This is a sample form using CKEditor 4.</p>'
  };
onSubmit(form:any) {
    console.log( form.value );
}

}
