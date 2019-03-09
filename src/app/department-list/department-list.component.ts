import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchData} from '../entities/SearchData';
import {DepartService} from '../service/depart.service';
import {DepartsDetails} from '../entities/departsDetails';
import {PageMKII} from '../entities/pageMKII';
import {Subscription} from 'rxjs';
import {SharedHeaderService} from '../service/shared-header.service';
import {Router} from '@angular/router';
import {PassDepartDetailsService} from '../service/pass-depart-details.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  searchData: SearchData = new SearchData();
  pageInfo: PageMKII = new PageMKII();
  departs: DepartsDetails[];
  showDetails = true;

  constructor(private departService: DepartService,
              private componentHeader: SharedHeaderService, private router: Router, private passDepart: PassDepartDetailsService) { }

  ngOnInit() {
    this.searchData.sort = 'staffs';
    this.changeComponentHeader();
    this.loadData();
  }

  onSubmit() {
    this.loadData();
  }

  loadData() {
    this.subscription = this.departService.searchDapartsListing(this.searchData).subscribe(data => {
      this.departs = data.depart ;
      this.pageInfo = data.pageinf;
    }, error1 => {
      console.log(error1);
    });
  }


  pageChanged(event) {
    this.searchData.page = event;
    this.loadData();
  }

  toTheDetails(depart: DepartsDetails) {
    this.passDepart.changeDepart(depart);
    this.router.navigateByUrl('departDetails');
    console.log('clicked');
  }

  changeComponentHeader() {
    this.componentHeader.changeMessage('DEPARTMENT LISTING');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
