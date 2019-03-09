import { TestBed } from '@angular/core/testing';

import { PassStaffDetailsService } from './pass-staff-details.service';

describe('PassStaffDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassStaffDetailsService = TestBed.get(PassStaffDetailsService);
    expect(service).toBeTruthy();
  });
});
