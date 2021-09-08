import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {


  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  success(data: any) {
    this.toastrService.success('' + data.message, '' + data.title);
  }
  error(data: any) {
    this.toastrService.error('' + data.message, '' + data.title);
  }

}
