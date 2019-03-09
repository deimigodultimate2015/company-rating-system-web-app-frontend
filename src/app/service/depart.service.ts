import { Injectable } from '@angular/core';
import {SearchData} from '../entities/SearchData';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DepartsDetails} from '../entities/departsDetails';

@Injectable({
  providedIn: 'root'
})
export class DepartService {

  private baseUrl  = 'http://localhost:8080/depart/';

  constructor(private httpClient: HttpClient) {

  }

  addDepart(departDetails: DepartsDetails): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}add`, departDetails, {responseType: 'text'});
  }

  editDepart(departDetails: DepartsDetails): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}edit`, departDetails, {responseType: 'text'});
  }

  disactiveDepart(departId: number): Observable<any> {
      return this.httpClient.put(`${this.baseUrl}disactive/${departId}`, null, {responseType: 'text'});
  }

  searchDapartsListing(searchData: SearchData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}search`,   searchData);
  }

  getDepartStaffs(departID: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}staffs/${departID}`);
  }

  dissmissStaff(staffID: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}dismissStaff/${staffID}`, null, {responseType: 'text'});
  }

  getDepartDetailsById(departID: number): Observable<object> {
    return this.httpClient.get(`${this.baseUrl}getDetails/${departID}`);
  }

  addStaff(staffID: number, depart: DepartsDetails): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}addStaff/${staffID}`, depart, {responseType: 'text'});
  }

}
