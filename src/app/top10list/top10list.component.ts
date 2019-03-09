import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {StaffMKX} from '../entities/staffMKX';
import {HomepageService} from '../service/homepage.service';

@Component({
  selector: 'app-top10list',
  templateUrl: './top10list.component.html',
  styleUrls: ['./top10list.component.css']
})
export class Top10listComponent implements OnInit {

  staffMKXs: StaffMKX[]  = [];

  constructor(private homePageService: HomepageService) { }

  ngOnInit() {
    this.homePageService.top10().subscribe(data => {
      this.staffMKXs = data ;
    }, error1 => console.log(error1));

  }
}
