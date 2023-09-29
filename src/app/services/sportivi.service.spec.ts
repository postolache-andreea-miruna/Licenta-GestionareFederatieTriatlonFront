import { TestBed } from '@angular/core/testing';

import { SportiviService } from './sportivi.service';

describe('SportiviService', () => {
  let service: SportiviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportiviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
