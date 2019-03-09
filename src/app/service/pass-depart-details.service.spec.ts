import { TestBed } from '@angular/core/testing';

import { PassDepartDetailsService } from './pass-depart-details.service';

describe('PassDepartDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassDepartDetailsService = TestBed.get(PassDepartDetailsService);
    expect(service).toBeTruthy();
  });
});
