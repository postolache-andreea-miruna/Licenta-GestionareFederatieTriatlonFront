import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportiviByIdViewComponent } from './sportivi-by-id-view.component';

describe('SportiviByIdViewComponent', () => {
  let component: SportiviByIdViewComponent;
  let fixture: ComponentFixture<SportiviByIdViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportiviByIdViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportiviByIdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
