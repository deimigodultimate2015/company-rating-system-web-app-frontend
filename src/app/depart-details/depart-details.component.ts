import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DepartsDetails} from '../entities/departsDetails';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PassDepartDetailsService} from '../service/pass-depart-details.service';
import {SharedHeaderService} from '../service/shared-header.service';
import {DepartService} from '../service/depart.service';
import {DepartmentListComponent} from '../department-list/department-list.component';
import {DepartStaffListComponent} from '../depart-staff-list/depart-staff-list.component';

@Component({
  selector: 'app-depart-details',
  templateUrl: './depart-details.component.html',
  styleUrls: ['./depart-details.component.css']
})
export class DepartDetailsComponent implements OnInit, OnDestroy {

  @ViewChild(DepartStaffListComponent) departListChild: DepartStaffListComponent;

  staffIDToAdd: number;

  uploadSuccess = false;
  uploadFailed = false;

  uploadMessage  = '';

  departDetails: DepartsDetails = new DepartsDetails();
  subscribes: Subscription;

  constructor(private getDepart: PassDepartDetailsService, private webHeader: SharedHeaderService,
              private router: Router, private departService: DepartService) {
  }

  ngOnInit(): void {
    this.setAlertDefault();

    this.subscribes = this.getDepart.currentDepart.subscribe(data => this.departDetails = data);
    this.webHeader.changeMessage('DEPART DETAILS');
    if (!this.departDetails.id) {
      this.router.navigateByUrl('departListing');
    }
  }

  toEditDepart() {
    this.getDepart.changeDepart(this.departDetails);
    this.router.navigateByUrl('addDepart');
  }

  reloadDepart() {
    this.departService.getDepartDetailsById(this.departDetails.id).subscribe(data => {
      this.departDetails = data as DepartsDetails;
    }, error1 => console.log(error1));
  }

  addStaff() {
    this.departService.addStaff(this.staffIDToAdd, this.departDetails).subscribe( data => {
      this.uploadSuccess = true;
      this.uploadFailed = false;
      this.uploadMessage = 'Add staff success';

      this.departListChild.initTable();

      console.log(data);
    }, error1 => {
      this.uploadFailed = true;
      this.uploadSuccess = false;
      this.uploadMessage = error1.error;

      console.log(error1);
    });
  }

  disactiveDepart() {
    this.departService.disactiveDepart(this.departDetails.id).subscribe(data => {
      this.uploadFailed = false;

      this.uploadSuccess = true;
      this.uploadMessage = 'Departments has been depart success';
      this.reloadDepart();

      this.departListChild.ngOnInit();
      console.log(data);
    }, error1 => {
      this.uploadSuccess = false;

      this.uploadFailed = true;
      this.uploadMessage =  'Depart department failed';
      console.log(error1);
    });
  }

  reactiveDepart() {
    this.departService.disactiveDepart(this.departDetails.id).subscribe(data => {
      this.uploadFailed = false;

      this.uploadSuccess = true;
      this.uploadMessage = 'Departments has been re-active success!';
      this.departDetails.active = true;
      console.log(data);
    }, error1 => {
      this.uploadSuccess = false;

      this.uploadFailed = true;
      this.uploadMessage =  'Re-active department failed!';
      console.log(error1);
    });
  }


  ngOnDestroy(): void {
    this.subscribes.unsubscribe();
  }

  setAlertDefault() {
    this.uploadSuccess = false;
    this.uploadFailed = false;

    this.uploadMessage  = '';
  }
}
