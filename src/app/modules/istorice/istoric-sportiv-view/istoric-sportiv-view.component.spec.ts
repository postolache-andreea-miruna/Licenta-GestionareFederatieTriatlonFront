import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstoricSportivViewComponent } from './istoric-sportiv-view.component';

describe('IstoricSportivViewComponent', () => {
  let component: IstoricSportivViewComponent;
  let fixture: ComponentFixture<IstoricSportivViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstoricSportivViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstoricSportivViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
