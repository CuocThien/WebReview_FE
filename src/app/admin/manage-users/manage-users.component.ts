import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManageUsersService } from './manage-users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers: [ManageUsersService]
})
export class ManageUsersComponent implements OnInit {

  constructor(private service:ManageUsersService, private toastr:ToastrService) { }

  listUsers:any;
  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.service.getAccounts().then(res=>{
      this.listUsers = res;
      this.listUsers = this.listUsers.data.accounts
      console.log(this.listUsers)
    })
  }
  userName:any;
  accountId:any;
  setUser(event:any){
    this.userName = event.target.name;
    this.accountId = event.target.id;
  }
  resultDel:any
  deleteUser(){
    this.service.deleteAccounts(this.accountId).then(res=>{
      this.resultDel = res;
      this.toastr.success(this.resultDel.msg);
      console.log(res);
      this.getData();
    }).catch(err=>{
      console.log(err);
      this.toastr.error(err.error.msg)
    })
  }

}
