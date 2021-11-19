import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { SignUpService } from './sign-up.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [SignUpService]
})
export class SignUpComponent implements OnInit {

  constructor(private toastr:ToastrService,private renderer: Renderer2, private service: SignUpService,
    private router:AppRoutingModule) { }
  ngOnInit(): void {
    
  }
  result:any
  onSubmit(formSignUp:any){

    if(formSignUp.value.PassWord != formSignUp.value.Confirm){
      this.toastr.error("Xác nhận lại mật khẩu!", "Lỗi!!!")
      this.renderer.removeClass(document.getElementById("confirm"),"ng-valid");
      this.renderer.addClass(document.getElementById("confirm"),"ng-invalid");
    }else if(formSignUp.invalid){
      this.toastr.error("Vui lòng điền đầy đủ thông tin đăng ký!", "Lỗi!!!")
    }
    else{
      this.renderer.addClass(document.getElementById("confirm"),"ng-valid");
      this.service.signUp(formSignUp.value)
      .then(res=>{console.log(res)
        this.result = res;
        this.toastr.success(this.result.msg)
        this.router.signin();
      })
      .catch(err=>this.toastr.error(err.error.msg));
  }
  }
}
