import { TestBed } from '@angular/core/testing';

import { DepartService } from './depart.service';

describe('DepartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartService = TestBed.get(DepartService);
    expect(service).toBeTruthy();
  });
});
