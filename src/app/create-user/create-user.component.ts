import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public userId: any;
  public createUserForm: any = FormGroup;
  public userData: any;

  constructor(private activatedRoute: ActivatedRoute,
    private api_call: CommonService) {

    this.activatedRoute.params.subscribe(param => {
      this.userId = param.id;
      if (param && param.id) {
        this.getUserDataById();
      }
    }, error => {
      console.log("error", error);
    })
  }

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      website_url: new FormControl('', [Validators.required]),
    })
  }

  AddUser() {
    let userdata = {
      name: this.createUserForm.controls['name'].value,
      email: this.createUserForm.controls['email'].value,
      phone: this.createUserForm.controls['phone'].value,
      website: this.createUserForm.controls['website_url'].value,
    }
    if (this.userId) {
      this.api_call.updateUser(userdata, this.userId).subscribe(updateres => {
        // console.log("res", updateres);
      }, err => {
        console.log("error", err);
      })
    }
    else {
      this.api_call.createUser(userdata).subscribe(res => {
        // console.log("success", res);
      }, error => {
        console.log("error", error);
      })
    }
  }



  getUserDataById() {
    this.api_call.getUserDataById(this.userId).subscribe(res => {
      this.userData = res;
      this.createUserForm.controls['name'].setValue(this.userData.name);
      this.createUserForm.controls['email'].setValue(this.userData.email);
      this.createUserForm.controls['phone'].setValue(this.userData.phone);
      this.createUserForm.controls['website_url'].setValue(this.userData.website);
    }, error => {
      console.log("error", error);
    })
  }
}
