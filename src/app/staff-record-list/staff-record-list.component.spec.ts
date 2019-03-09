import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRecordListComponent } from './staff-record-list.component';

describe('StaffRecordListComponent', () => {
  let component: StaffRecordListComponent;
  let fixture: ComponentFixture<StaffRecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
