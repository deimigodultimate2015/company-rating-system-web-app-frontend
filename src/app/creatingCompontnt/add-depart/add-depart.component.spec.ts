import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartComponent } from './add-depart.component';

describe('AddDepartComponent', () => {
  let component: AddDepartComponent;
  let fixture: ComponentFixture<AddDepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
