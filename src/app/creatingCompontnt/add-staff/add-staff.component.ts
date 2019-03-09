import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StaffService} from '../../service/staff.service';
import {Staff} from '../../entities/staff';
import {error} from 'util';
import {SharedHeaderService} from '../../service/shared-header.service';
import {PassStaffDetailsService} from '../../service/pass-staff-details.service';
import {DepartService} from '../../service/depart.service';
import {Depart} from '../../entities/depart';
import {SearchData} from '../../entities/SearchData';
import {DepartsDetails} from '../../entities/departsDetails';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit, OnDestroy {

  error = false;
  success = false;
  add: true;
  message: '';
  departMKX: DepartsDetails[] = [];
  searchData: SearchData = new SearchData();

  subscribe: Subscription;
  staff: Staff = new Staff();

  constructor(private staffService: StaffService, private setWebHeader: SharedHeaderService, private getStaff: PassStaffDetailsService,
              private departService: DepartService) { }

  ngOnInit() {
    this.searchData.size = 1000;

    this.departService.searchDapartsListing(this.searchData).subscribe(data => {
      this.departMKX = data.depart;
      console.log('get ted');
    }, error1 => {
      console.log(error1);
    });

    this.getStaff.currentStaff.subscribe(data => {
      if ( data.id) {
        this.staff = data;
      } else {
        this.staff.gender = false;
      }
    });

    if (!this.staff.depart) {
      this.staff.depart = new Depart();
    }

    this.setWebHeader.changeMessage('ADD STAFF');
    this.error = false;
    this.success = false;
    this.message = '';
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.staff.id) {
     this.staffService.updateStaff(this.staff).subscribe(
        data => {
          this.success = true;
          this.error = false;
          console.log(data);
        }, error1 => {
          this.error = true;
          this.success = false;
          this.message = error1.error;
          console.log(error1);
        }
      );
    } else {
      this.subscribe = this.staffService.addStaffs(this.staff).subscribe(
        data => {
          this.success = true;
          this.error = false;
          console.log(data);
        }, error1 => {
          this.error = true;
          this.success = false;
          this.message = error1.error;
          console.log(error1);
        }
      );
    }
  }

  addMore() {
    this.error = false;
    this.success = false;
    this.message = '';
  }

  ngOnDestroy(): void {
    this.getStaff.changeDepart(undefined);
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

}
