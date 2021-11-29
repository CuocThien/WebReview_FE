import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [ChangePasswordService]
})
export class ChangePasswordComponent implements OnInit {

  constructor(private toastr: ToastrService, private renderer: Renderer2, private service: ChangePasswordService) { }

  ngOnInit(): void {
  }
  onSubmit(formChangePassword: any) {
    if (formChangePassword.value.NewPassword.length < 6) {
      this.toastr.error("Mật khẩu có ít nhất 6 kí tự!", "Lỗi!!!")
    }
    else if (formChangePassword.value.NewPassword != formChangePassword.value.ConfirmPassword) {
      this.toastr.error("Xác nhận lại mật khẩu!", "Lỗi!!!")
      this.renderer.removeClass(document.getElementById("confirm"), "ng-valid");
      this.renderer.addClass(document.getElementById("confirm"), "ng-invalid");
    }
    else if (formChangePassword.invalid) {
      this.toastr.error("Vui lòng điền đầy đủ thông tin!", "Lỗi!!!")
    }
    else {
      this.renderer.removeClass(document.getElementById("confirm"), "ng-invalid");
      this.service.changePassword(formChangePassword.value)
    }
  }
}
