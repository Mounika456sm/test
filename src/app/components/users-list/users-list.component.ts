import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ToastComponent } from '../toast/toast.component';
import { NgxSpinnerService } from "ngx-spinner";
import 'jquery';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  public userData: any;
  public userId: any;

  constructor(private api_call: CommonService,
    private router: Router,
    private toast: ToastComponent,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userList();
  }

  userList() {
    this.spinner.show();
    this.api_call.getUserData().subscribe(res => {
      // console.log("success res", res);
      this.userData = res;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log("error", error);
    })
  }

  getUserData(user: any) {
    this.router.navigateByUrl(`/create-user/${user.id}`);
  }

  DeleteUserId(userid: number) {
    this.userId = userid;
  }

  DeleteUser() {
    this.spinner.show();
    this.api_call.deleteUser(this.userId).subscribe(res => {
      // console.log("res", res);
      $('.modal-backdrop').hide();
      $("#deleteUser .close").click();
      this.toast.success({ message: 'User Deleted Successfully', title: 'Success' });
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log("error", err);
    })
  }

}
