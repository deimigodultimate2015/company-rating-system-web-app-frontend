import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Staff} from '../entities/staff';
import {PassStaffDetailsService} from '../service/pass-staff-details.service';
import {SharedHeaderService} from '../service/shared-header.service';
import {RecordMKII} from '../entities/recordMKII';
import {RecordService} from '../service/record.service';
import {StaffRecordListComponent} from '../staff-record-list/staff-record-list.component';
import {Router} from '@angular/router';
import {Cloudinary} from '../entities/cloudinary';
import {CloudinaryService} from '../service/cloudinary.service';
import {StaffService} from '../service/staff.service';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit, OnDestroy {

  @ViewChild(StaffRecordListComponent) myChild: StaffRecordListComponent;

  uploadFailed = false;
  uploadFailedMess = '';

  uploadSuccess = false;
  uploadSuccessMess = '';

  cloudinary: Cloudinary = new Cloudinary();

  currentFile: File = null;

  staff: Staff = new Staff();
  subscribes: Subscription;
  subscribes2: Subscription;
  record: RecordMKII = new RecordMKII();

  constructor(private getStaff: PassStaffDetailsService, private webHeader: SharedHeaderService,
              private recordService: RecordService, private router: Router, private cloudinaryService: CloudinaryService,
              private staffService: StaffService) {
  }

  ngOnInit(): void {

    this.uploadFailed = false;
    this.uploadFailedMess = '';

    this.record.date = '1-1-2011';

    this.subscribes = this.getStaff.currentStaff.subscribe(data => {
      this.staff = data;
      console.log(data);
    });
    this.webHeader.changeMessage('STAFF DETAILS');

    if (!this.staff.id) {
      this.router.navigateByUrl('staffListing');
    }

    this.getImage();
  }

  ngOnDestroy(): void {
    if (this.subscribes) {
      this.subscribes.unsubscribe();
    }

    if (this.subscribes2) {
      this.subscribes.unsubscribe();
    }
  }

  onFileSelected(event) {
    this.currentFile = <File>event.target.files[0];
  }

  onSubmit() {
    const df = new FormData();
    df.append('image', this.currentFile);

    this.cloudinaryService.uploadImage(df, this.staff.id).subscribe(data => {
      this.uploadFailed = false;

      this.uploadSuccess = true;
      console.log(data);
      this.uploadSuccessMess = 'Upload success';
      this.getImage();
      }, error1 => {
      this.uploadSuccess = false;

      this.uploadFailed = true;
      console.log(error1);
      this.uploadFailedMess = 'Upload failed';
    });
  }

  disactiveStaff() {
    this.staffService.disactiveStaff(this.staff.id).subscribe(data => {
      this.uploadFailed = false;
      this.staff.active = false;

      this.uploadSuccess = true;
      this.uploadSuccessMess = 'Staff has been dis-activated';
    }, error1 =>  {
      this.uploadSuccess = false;

      this.uploadFailed = true;
      this.uploadFailedMess = 'Dis-active failed';
      console.log(error1);
    });
  }

  activeStaff() {
    this.staffService.disactiveStaff(this.staff.id).subscribe(data => {
      this.uploadFailed = false;
      this.staff.active = true;

      this.uploadSuccess = true;
      this.uploadSuccessMess = 'Staff has been re-activated';
    }, error1 =>  {
      this.uploadSuccess = false;

      this.uploadFailed = true;
      this.uploadFailedMess = 're-active failed';
      console.log(error1);
    });
  }

  createRecord() {
    this.subscribes2 = this.recordService.createRecord(this.staff.id, this.record).subscribe(data => {
      this.uploadFailed = false;

      this.uploadSuccess = true;
      console.log(data);
      this.uploadSuccessMess = 'Create record success';

      this.myChild.ngOnInit();
    }, error1 => {
      this.uploadSuccess = false;

      this.uploadFailed = true;
      console.log(error1);
      this.uploadFailedMess = 'Create record failed';
    });
  }

  getImage() {
    this.cloudinaryService.getImage(this.staff.id).subscribe(data => {
      this.cloudinary = data as Cloudinary;
    }, error1 => {
      console.log(error1);
      this.setDefaultImage();
    });
  }

  editStaff() {
    this.getStaff.changeDepart(this.staff);
    this.router.navigateByUrl('addStaff');
  }

  setDefaultImage() {
    this.cloudinary.staffId = 'notfound';
    this.cloudinary.version = '1550997259';
    this.cloudinary.type = 'png';
  }

}
