import { TestBed } from '@angular/core/testing';

import { ProbeService } from './probe.service';

describe('ProbeService', () => {
  let service: ProbeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProbeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
