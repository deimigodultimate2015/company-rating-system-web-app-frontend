import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { RecordListComponent } from './record-list/record-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { DepartDetailsComponent } from './depart-details/depart-details.component';
import { DepartStaffListComponent } from './depart-staff-list/depart-staff-list.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { StaffRecordListComponent } from './staff-record-list/staff-record-list.component';
import { AddStaffComponent } from './creatingCompontnt/add-staff/add-staff.component';
import { AddUserComponent } from './creatingCompontnt/add-user/add-user.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AddDepartComponent } from './creatingCompontnt/add-depart/add-depart.component';
import { Top10listComponent } from './top10list/top10list.component';
import {httpInterceptorProviders} from './auth/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentListComponent,
    StaffListComponent,
    RecordListComponent,
    UserListComponent,
    DepartDetailsComponent,
    DepartStaffListComponent,
    StaffDetailsComponent,
    StaffRecordListComponent,
    AddStaffComponent,
    AddUserComponent,
    AddDepartComponent,
    Top10listComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

