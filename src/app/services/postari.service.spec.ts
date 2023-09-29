import { TestBed } from '@angular/core/testing';

import { PostariService } from './postari.service';

describe('PostariService', () => {
  let service: PostariService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostariService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
