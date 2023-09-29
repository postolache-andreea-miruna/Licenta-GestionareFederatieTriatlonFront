import { TestBed } from '@angular/core/testing';

import { NotificariService } from './notificari.service';

describe('NotificariService', () => {
  let service: NotificariService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificariService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
