import { TestBed } from '@angular/core/testing';

import { IstoriceService } from './istorice.service';

describe('IstoriceService', () => {
  let service: IstoriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IstoriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
