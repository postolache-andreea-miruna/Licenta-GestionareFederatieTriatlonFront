import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntrenoriClubComponent } from './antrenori-club.component';

describe('AntrenoriClubComponent', () => {
  let component: AntrenoriClubComponent;
  let fixture: ComponentFixture<AntrenoriClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntrenoriClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntrenoriClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
