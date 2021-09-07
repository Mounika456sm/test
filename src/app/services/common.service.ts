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

  createUser(userdata: any) {
    return this.http.post('https://jsonplaceholder.typicode.com/users', userdata);
  }

  updateUser(userData: any, userId: number) {
    return this.http.put(`https://jsonplaceholder.typicode.com/users/${userId}`, userData);
  }

  deleteUser(userId: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
  }
}

