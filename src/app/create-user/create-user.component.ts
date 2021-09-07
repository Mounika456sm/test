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

  getUserDataById() {
    this.api_call.getUserDataById(this.userId).subscribe(res => {
      this.userData = res;
      console.log("res", res, this.userData.name, this.userData.email);
      this.createUserForm.controls['name'].setValue(this.userData.name);
      this.createUserForm.controls['email'].setValue(this.userData.email);
      this.createUserForm.controls['phone'].setValue(this.userData.phone);
      this.createUserForm.controls['website_url'].setValue(this.userData.website);
    }, error => {
      console.log("error", error);
    })
  }
}
