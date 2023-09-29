import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstoricSportivComponent } from './istoric-sportiv.component';

describe('IstoricSportivComponent', () => {
  let component: IstoricSportivComponent;
  let fixture: ComponentFixture<IstoricSportivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstoricSportivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstoricSportivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
