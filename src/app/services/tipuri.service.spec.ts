import { TestBed } from '@angular/core/testing';

import { TipuriService } from './tipuri.service';

describe('TipuriService', () => {
  let service: TipuriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipuriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
