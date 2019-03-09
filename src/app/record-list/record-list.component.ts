import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SearchData} from '../entities/SearchData';
import {PageMKII} from '../entities/pageMKII';
import {SharedHeaderService} from '../service/shared-header.service';
import {RecordMKII} from '../entities/recordMKII';
import {RecordService} from '../service/record.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  searchData: SearchData = new SearchData();
  pageInfo: PageMKII = new PageMKII();
  records: RecordMKII[];

  constructor(private recordService: RecordService, private componentHeader: SharedHeaderService) { }

  ngOnInit() {
    this.searchData.sort = 'staff_id';
    this.changeComponentHeader();
    this.loadData();
  }

  onSubmit() {
    this.loadData();
  }

  loadData() {
    this.subscription = this.recordService.searchRecordsListing(this.searchData).subscribe(data => {
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

  changeComponentHeader() {
    this.componentHeader.changeMessage('RECORDS LISTING');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
