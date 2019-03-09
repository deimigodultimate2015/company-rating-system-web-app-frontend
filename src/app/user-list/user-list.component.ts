import { Component, OnInit } from '@angular/core';;
import {SharedHeaderService} from '../service/shared-header.service';
import {User} from '../entities/user';
import {UserService} from '../service/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: UserService, private componentHeader: SharedHeaderService) { }

  ngOnInit() {
    this.setComponentHeader();
    this.loadData();
  }

  loadData() {
    this.users = this.userService.getUsersListing();
  }

  setComponentHeader() {
    this.componentHeader.changeMessage('USERS LISTING');
  }

}
