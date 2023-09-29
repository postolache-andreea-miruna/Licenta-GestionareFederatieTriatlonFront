import { TestBed } from '@angular/core/testing';

import { AuthSportivGuard } from './auth-sportiv.guard';

describe('AuthSportivGuard', () => {
  let guard: AuthSportivGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSportivGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
