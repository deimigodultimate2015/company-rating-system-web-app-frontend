import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchData} from '../entities/SearchData';
import {PageMKII} from '../entities/pageMKII';
import {Staff} from '../entities/staff';
import {StaffService} from '../service/staff.service';
import {SharedHeaderService} from '../service/shared-header.service';
import {Router} from '@angular/router';
import {PassStaffDetailsService} from '../service/pass-staff-details.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit, OnDestroy {

  subscribe: Subscription;
  searchData: SearchData = new SearchData();
  pageInfo: PageMKII = new PageMKII();
  staffs: Staff[];

  constructor(private staffService: StaffService, private componentHeader: SharedHeaderService, private router: Router,
              private passStaff: PassStaffDetailsService) { }

  ngOnInit() {
    this.searchData.sort = 'id';
    this.setComponentHeader();
    this.loadData();
  }

  onSubmit() {
    this.loadData();
  }

  loadData() {
    this.subscribe = this.staffService.searchStaffsListing(this.searchData).subscribe(data => {
      this.staffs = data.content ;
      this.pageInfo.currentPage = data.number;
      this.pageInfo.pageSize = data.size;
      this.pageInfo.totalEntity = data.totalElements;
    }, error1 => {
      console.log(error1);
    });
  }

  pageChanged(event) {
    this.searchData.page = event;
    this.searchData.page -= 1;
    this.loadData();
  }

  toStaffDetails(staff: Staff) {
    this.router.navigateByUrl('staffDetails');
    this.passStaff.changeDepart(staff);
  }

  setComponentHeader() {
    this.componentHeader.changeMessage('STAFF LISTING');
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
