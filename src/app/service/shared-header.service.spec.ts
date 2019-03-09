import { TestBed } from '@angular/core/testing';

import { SharedHeaderService } from './shared-header.service';

describe('SharedHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedHeaderService = TestBed.get(SharedHeaderService);
    expect(service).toBeTruthy();
  });
});
