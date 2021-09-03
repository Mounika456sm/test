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
    // this.api_call.getUserData().subscribe(res => {
    //   console.log(res);
    // })


    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: 'wwew',
    //     body: 'qwewq',
    //     userId: 2,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));

    /***************************/

    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));


  }
}
