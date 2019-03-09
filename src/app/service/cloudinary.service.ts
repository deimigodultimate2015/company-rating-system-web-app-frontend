import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  baseUrl = 'http://localhost:8080/image/';

  constructor(private httpClient: HttpClient) { }

  uploadImage(fd: FormData, staffId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}update/${staffId}`, fd, {responseType: 'text'});
  }

  getImage(staffId: number): Observable<object> {
    return this.httpClient.get(`${this.baseUrl}get/${staffId}`);
  }
}
