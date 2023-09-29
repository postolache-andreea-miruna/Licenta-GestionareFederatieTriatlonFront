import { TestBed } from '@angular/core/testing';

import { VideoclipuriService } from './videoclipuri.service';

describe('VideoclipuriService', () => {
  let service: VideoclipuriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoclipuriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
