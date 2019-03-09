import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Staff} from '../entities/staff';
import {DepartService} from '../service/depart.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-depart-staff-list',
  templateUrl: './depart-staff-list.component.html',
  styleUrls: ['./depart-staff-list.component.css']
})
export class DepartStaffListComponent implements OnInit {

  @Output() reloadParentInfo = new EventEmitter();

  updateSuccess = false;
  updateFailed = false;
  updateMessage = '';

  @Input() departID: number;
  staffs: Observable<Staff[]>;

  constructor(private departService: DepartService) { }

  ngOnInit() {
    this.initUpdate();
    this.initTable();
  }

  initUpdate() {
    this.updateSuccess = false;
    this.updateFailed = false;
    this.updateMessage = '';
  }

  initTable() {
    this.staffs = this.departService.getDepartStaffs(this.departID);
  }

  dismissStaff(staffID: number) {
    this.departService.dissmissStaff(staffID).subscribe(data => {
      this.updateFailed = false;
      this.updateSuccess = true;
      this.updateMessage = 'Dismiss success';

      this.reloadParentInfo.emit();

      console.log(data);
      this.initTable();
    }, error1 => {
      this.updateFailed = true;
      this.updateSuccess = false;
      this.updateMessage = 'Dismiss failed';

      console.log(error1);
    });
  }

}
