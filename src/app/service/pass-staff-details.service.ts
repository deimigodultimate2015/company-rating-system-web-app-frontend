import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DepartsDetails} from '../entities/departsDetails';
import {Staff} from '../entities/staff';

@Injectable({
  providedIn: 'root'
})
export class PassStaffDetailsService {
  private staffSource = new BehaviorSubject(new Staff());
  currentStaff = this.staffSource.asObservable();

  constructor() { }

  changeDepart(staff: Staff) {
    this.staffSource.next(staff);
  }
}
