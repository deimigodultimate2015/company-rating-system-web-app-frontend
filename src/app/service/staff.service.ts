import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchData} from '../entities/SearchData';
import {Observable} from 'rxjs';
import {Staff} from '../entities/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private baseUrl  = 'http://localhost:8080/staff/';

  constructor(private httpClient: HttpClient) {

  }

  addStaffs(staff: Staff): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}add`, staff, {responseType: 'text'});
  }

  getStaffById(staffId: number): Observable<object> {
    return this.httpClient.get(`${this.baseUrl}get/${staffId}`);
  }

  searchStaffsListing(searchData: SearchData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}search`,  searchData);
  }

  disactiveStaff(staffId: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}disactive/${staffId}`, null, {responseType: 'text'});
  }

  updateStaff(staff: Staff): Observable<string> {
    return this.httpClient.put(`${this.baseUrl}update`, staff, {responseType: 'text'});
  }
}
