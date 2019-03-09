import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../entities/user';
import {ChangePassword} from '../entities/change-password';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl  = 'http://localhost:8080/user/';

  constructor(private httpClient: HttpClient) {

  }

  changePassword(changePassword: ChangePassword): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}changePassword`, changePassword, {responseType: 'text'});
  }

  getUsersListing(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get`);
  }

  addUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}add`, user, {responseType: 'text'});
  }
}
