import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../entities/login';
import {Observable} from 'rxjs';
import {JwtResponse} from '../entities/jwt-response';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private baseUrl = 'http://localhost:8080/homepage/';

  constructor(private httpClient: HttpClient) { }

  login(login: Login): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.baseUrl}signin`, login, httpOptions);
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}resetPassword/${email}`, null, { responseType: 'text'});
  }

  top10(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}top10`);
  }
}
