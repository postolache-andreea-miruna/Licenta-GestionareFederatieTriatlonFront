import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubidComponent } from './clubid.component';

describe('ClubidComponent', () => {
  let component: ClubidComponent;
  let fixture: ComponentFixture<ClubidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
