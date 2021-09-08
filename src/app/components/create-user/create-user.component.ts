import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../services/common.service';
import { ToastComponent } from '../toast/toast.component';

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
    private api_call: CommonService,
    private toast: ToastComponent,
    private spinner: NgxSpinnerService,
    private router: Router) {

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
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      phone: new FormControl('', [Validators.required]),
      website_url: new FormControl('', [Validators.required]),
    })
  }

  AddUser() {
    if (this.createUserForm.get('name').valid == true &&
      this.createUserForm.get('email').valid == true &&
      this.createUserForm.get('phone').valid == true) {
      let userdata = {
        name: this.createUserForm.controls['name'].value,
        email: this.createUserForm.controls['email'].value,
        phone: this.createUserForm.controls['phone'].value,
        website: this.createUserForm.controls['website_url'].value,
      }
      if (this.userId) {
        this.spinner.show();
        this.api_call.updateUser(userdata, this.userId).subscribe(updateres => {
          // console.log("res", updateres);
          this.toast.success({ message: 'User Updated Successfully', title: 'Success' });
          setTimeout(() => {
          this.createUserForm.reset();
            this.router.navigateByUrl(`/user-list`);
          }, 1000);
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          console.log("error", err);
        })
      }
      else {
        this.spinner.show();
        this.api_call.createUser(userdata).subscribe(res => {
          // console.log("success", res);
          this.toast.success({ message: 'User Created Successfully', title: 'Success' });
          setTimeout(() => {
          this.createUserForm.reset();
            this.router.navigateByUrl(`/user-list`);
          }, 1000);
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          console.log("error", error);
        })
      }
    }
    else {
      this.validateFormFields(this.createUserForm);
    }
  }

  getUserDataById() {
    this.spinner.show();
    this.api_call.getUserDataById(this.userId).subscribe(res => {
      this.userData = res;
      this.createUserForm.controls['name'].setValue(this.userData.name);
      this.createUserForm.controls['email'].setValue(this.userData.email);
      this.createUserForm.controls['phone'].setValue(this.userData.phone);
      this.createUserForm.controls['website_url'].setValue(this.userData.website);
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log("error", error);
    })
  }

  validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      if (field == 'name' || field == 'email' || field == 'phone') {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        }
      }
    });
  }


}
