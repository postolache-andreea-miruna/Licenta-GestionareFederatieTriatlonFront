import { TestBed } from '@angular/core/testing';

import { CompetitiiService } from './competitii.service';

describe('CompetitiiService', () => {
  let service: CompetitiiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitiiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
