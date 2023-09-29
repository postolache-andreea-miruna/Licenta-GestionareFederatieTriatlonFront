import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticiRezultateMedaliiComponent } from './statistici-rezultate-medalii.component';

describe('StatisticiRezultateMedaliiComponent', () => {
  let component: StatisticiRezultateMedaliiComponent;
  let fixture: ComponentFixture<StatisticiRezultateMedaliiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticiRezultateMedaliiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticiRezultateMedaliiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
