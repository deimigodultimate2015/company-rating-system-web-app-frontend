import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StaffListComponent} from './staff-list/staff-list.component';
import {DepartmentListComponent} from './department-list/department-list.component';
import {RecordListComponent} from './record-list/record-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {DepartDetailsComponent} from './depart-details/depart-details.component';
import {StaffDetailsComponent} from './staff-details/staff-details.component';
import {AddStaffComponent} from './creatingCompontnt/add-staff/add-staff.component';
import {AddUserComponent} from './creatingCompontnt/add-user/add-user.component';
import {AddDepartComponent} from './creatingCompontnt/add-depart/add-depart.component';

const routes: Routes = [
  {path: 'staffListing', component: StaffListComponent },
  {path: 'departListing', component: DepartmentListComponent},
  {path: 'recordListing', component: RecordListComponent},
  {path: 'userListing', component: UserListComponent},
  {path: 'departDetails', component: DepartDetailsComponent},
  {path: 'staffDetails', component: StaffDetailsComponent},
  {path: 'addUser', component: AddUserComponent},
  {path: 'addStaff', component: AddStaffComponent},
  {path: 'addDepart', component: AddDepartComponent},
  {path: '', redirectTo: 'staffListing', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
