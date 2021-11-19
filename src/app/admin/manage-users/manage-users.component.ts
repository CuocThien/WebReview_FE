import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from './manage-users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers: [ManageUsersService]
})
export class ManageUsersComponent implements OnInit {

  constructor(private service:ManageUsersService) { }

  listUsers:any;
  ngOnInit(): void {
    this.service.getAccounts().then(res=>{
      this.listUsers = res;
      this.listUsers = this.listUsers.data.accounts
      console.log(this.listUsers)
    })
  }

}
