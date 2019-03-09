import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartDetailsComponent } from './depart-details.component';

describe('DepartDetailsComponent', () => {
  let component: DepartDetailsComponent;
  let fixture: ComponentFixture<DepartDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
