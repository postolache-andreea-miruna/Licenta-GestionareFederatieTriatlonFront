import { TestBed } from '@angular/core/testing';

import { ComentariiService } from './comentarii.service';

describe('ComentariiService', () => {
  let service: ComentariiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentariiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
