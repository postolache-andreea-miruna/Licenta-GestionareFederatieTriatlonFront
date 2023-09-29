import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportiviAntrenorComponent } from './sportivi-antrenor.component';

describe('SportiviAntrenorComponent', () => {
  let component: SportiviAntrenorComponent;
  let fixture: ComponentFixture<SportiviAntrenorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportiviAntrenorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportiviAntrenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
