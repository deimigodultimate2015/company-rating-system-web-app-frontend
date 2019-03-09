import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10listComponent } from './top10list.component';

describe('Top10listComponent', () => {
  let component: Top10listComponent;
  let fixture: ComponentFixture<Top10listComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10listComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
