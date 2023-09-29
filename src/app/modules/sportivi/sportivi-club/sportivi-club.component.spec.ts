import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportiviClubComponent } from './sportivi-club.component';

describe('SportiviClubComponent', () => {
  let component: SportiviClubComponent;
  let fixture: ComponentFixture<SportiviClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportiviClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportiviClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
