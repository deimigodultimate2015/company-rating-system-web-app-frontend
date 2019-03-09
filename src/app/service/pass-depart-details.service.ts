import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DepartsDetails} from '../entities/departsDetails';

@Injectable({
  providedIn: 'root'
})
export class PassDepartDetailsService {

  private departSource = new BehaviorSubject(new DepartsDetails());
  currentDepart = this.departSource.asObservable();

  constructor() { }

  changeDepart(depart: DepartsDetails) {
    this.departSource.next(depart);
  }
}
