import { TestBed } from '@angular/core/testing';

import { AntrenoriService } from './antrenori.service';

describe('AntrenoriService', () => {
  let service: AntrenoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntrenoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
