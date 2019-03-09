import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartStaffListComponent } from './depart-staff-list.component';

describe('DepartStaffListComponent', () => {
  let component: DepartStaffListComponent;
  let fixture: ComponentFixture<DepartStaffListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartStaffListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
