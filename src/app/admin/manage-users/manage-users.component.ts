import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ManageUsersService } from './manage-users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers: [ManageUsersService]
})
export class ManageUsersComponent implements OnInit {

  constructor(private service: ManageUsersService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  p: number = 1;
  listUsers: any;
  countUser:any;
  ngOnInit(): void {
    this.spinner.show();
    this.getData()
  }
  getData() {
    this.service.getAccounts().then(res => {
      this.listUsers = res;
      this.listUsers = this.listUsers.data.accounts
      // console.log(this.listUsers)
      this.spinner.hide();
    }).catch(err => {
      // console.log(err);
      this.toastr.error(err.error.msg);
      this.spinner.hide()
    })
  }
  userName: any;
  accountId: any;
  setUser(event: any) {
    this.userName = event.target.name;
    this.accountId = event.target.id;
  }
  resultDel: any
  deleteUser() {
    this.service.deleteAccounts(this.accountId).then(res => {
      this.resultDel = res;
      this.toastr.success(this.resultDel.msg);
      this.service.getAccounts().then(res=>{
        this.countUser = res;
        this.countUser = this.countUser.data.accounts.length;
        this.checkAmountUser(this.countUser);
      })
      this.getData();
    }).catch(err => {
      // console.log(err);
      this.toastr.error(err.error.msg)
    })
  }
  checkAmountUser(amountU:any){
    const page = Math.floor(amountU / 5);
    const maxPage = amountU % 5;
    if(maxPage != 0){
      this.p = page + 1;
    }else{
      this.p = page;
    }
  }
  goToTop(){
    window.scrollTo(0,0)
  }
}
