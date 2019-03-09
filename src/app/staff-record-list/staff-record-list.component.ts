import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SearchData} from '../entities/SearchData';
import {PageMKII} from '../entities/pageMKII';
import {RecordMKII} from '../entities/recordMKII';
import {StaffService} from '../service/staff.service';
import {RecordService} from '../service/record.service';

@Component({
  selector: 'app-staff-record-list',
  templateUrl: './staff-record-list.component.html',
  styleUrls: ['./staff-record-list.component.css']
})
export class StaffRecordListComponent implements OnInit, OnDestroy {
  @Input() staffID: number;

  private subscription: Subscription;

  searchData: SearchData = new SearchData();
  pageInfo: PageMKII = new PageMKII();
  records: RecordMKII[] = [];

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    this.searchData.search = this.staffID + '';
    this.searchData.size = 10;
    this.loadData();
  }

  loadData() {
    this.subscription = this.recordService.getStaffsRecord(this.searchData).subscribe(data => {
      this.records = data.records ;
      this.pageInfo = data.page;
    }, error1 => {
      console.log(error1);
    });
  }


  pageChanged(event) {
    this.searchData.page = event;
    this.searchData.page -= 1;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
