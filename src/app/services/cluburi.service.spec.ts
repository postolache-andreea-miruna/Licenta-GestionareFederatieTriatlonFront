import { TestBed } from '@angular/core/testing';

import { CluburiService } from './cluburi.service';

describe('CluburiService', () => {
  let service: CluburiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CluburiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
