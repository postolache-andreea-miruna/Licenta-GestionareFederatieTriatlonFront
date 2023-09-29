import { TestBed } from '@angular/core/testing';

import { ReactiipostareService } from './reactiipostare.service';

describe('ReactiipostareService', () => {
  let service: ReactiipostareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiipostareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
