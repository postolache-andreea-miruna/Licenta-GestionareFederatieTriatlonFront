import { TestBed } from '@angular/core/testing';

import { LocatiiService } from './locatii.service';

describe('LocatiiService', () => {
  let service: LocatiiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocatiiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
