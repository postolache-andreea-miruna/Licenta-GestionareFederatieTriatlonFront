import { TestBed } from '@angular/core/testing';

import { RecenziiService } from './recenzii.service';

describe('RecenziiService', () => {
  let service: RecenziiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecenziiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
