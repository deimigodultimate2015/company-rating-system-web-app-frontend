import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Staff} from '../../entities/staff';
import {StaffService} from '../../service/staff.service';
import {SharedHeaderService} from '../../service/shared-header.service';
import {UserService} from '../../service/user.service';
import {User} from '../../entities/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  error = false;
  success = false;
  add: true;
  message: '';

  subscribe: Subscription;
  user: User = new User();

  constructor(private userService: UserService, private setWebHeader: SharedHeaderService) { }

  ngOnInit() {
    this.setWebHeader.changeMessage('ADD USER')
    this.error = false;
    this.success = false;
    this.message = '';
  }

  onSubmit() {
    this.subscribe = this.userService.addUser(this.user).subscribe(
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

  addMore() {
    this.error = false;
    this.success = false;
    this.message = '';
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

}
