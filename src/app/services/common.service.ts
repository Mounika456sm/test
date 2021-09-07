import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getUserData() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getUserDataById(user_id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${user_id}`);
  }
}
// https://jsonplaceholder.typicode.com/users
// https://api.publicapis.org/entries
