import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportivByEmailComponent } from './sportiv-by-email.component';

describe('SportivByEmailComponent', () => {
  let component: SportivByEmailComponent;
  let fixture: ComponentFixture<SportivByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportivByEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportivByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
