import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DBSUIAssignment';

  constructor(private api_call: CommonService) {

  }
  ngOnInit() {
  }
}
