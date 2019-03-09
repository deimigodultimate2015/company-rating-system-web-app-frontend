import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchData} from '../entities/SearchData';
import {Observable} from 'rxjs';
import {RecordMKII} from '../entities/recordMKII';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private baseUrl  = 'http://localhost:8080/rating/';

  constructor(private httpClient: HttpClient) {

  }

  searchRecordsListing(searchData: SearchData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}search`,   searchData);
  }


  getStaffsRecord(searchData: SearchData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}searchById`,  searchData);
  }

  createRecord(staffId: number, record: RecordMKII) {
    return this.httpClient.post(`${this.baseUrl}create/${staffId}`, record, {responseType: 'text'});
  }

}
