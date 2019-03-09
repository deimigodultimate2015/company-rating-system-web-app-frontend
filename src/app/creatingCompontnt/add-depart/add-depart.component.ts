import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SharedHeaderService} from '../../service/shared-header.service';
import {DepartsDetails} from '../../entities/departsDetails';
import {DepartService} from '../../service/depart.service';
import {PassDepartDetailsService} from '../../service/pass-depart-details.service';

@Component({
  selector: 'app-add-depart',
  templateUrl: './add-depart.component.html',
  styleUrls: ['./add-depart.component.css']
})
export class AddDepartComponent implements OnInit, OnDestroy {

  error = false;
  success = false;
  add: true;
  message: '';

  subscribe: Subscription;
  departDetails: DepartsDetails = new DepartsDetails();

  constructor(private departService: DepartService, private setWebHeader: SharedHeaderService,
              private getDepart: PassDepartDetailsService) { }

  ngOnInit() {
    this.subscribe = this.getDepart.currentDepart.subscribe(data => {
      if ( data.id) {
        this.departDetails = data;
      }
    });

    this.setWebHeader.changeMessage('ADD DEPARTMENT');
    this.error = false;
    this.success = false;
    this.message = '';
  }

  onSubmit() {
    if (this.departDetails.id) {
      this.departService.editDepart(this.departDetails).subscribe(
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
      this.subscribe = this.departService.addDepart(this.departDetails).subscribe(
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
    this.getDepart.changeDepart(undefined);
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

}
