import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  public userData: any;

  constructor(private api_call: CommonService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userList();
  }

  userList() {
    this.spinner.show();
    this.api_call.getUserData().subscribe(res => {
      // console.log("success res", res);
      this.userData = res;
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
    }, error => {
      console.log("error", error);
    })
  }

  getUserData(user: any) {
    this.router.navigateByUrl(`/create-user/${user.id}`);
  }

  DeleteUserId(userid: number) {
    this.api_call.deleteUser(userid).subscribe(res => {
      // console.log("res", res);
    }, err => {
      console.log("error", err);
    })
  }
}