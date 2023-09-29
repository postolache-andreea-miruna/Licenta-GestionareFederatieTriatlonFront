import { TestBed } from '@angular/core/testing';

import { AuthAntrenorGuard } from './auth-antrenor.guard';

describe('AuthAntrenorGuard', () => {
  let guard: AuthAntrenorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAntrenorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
