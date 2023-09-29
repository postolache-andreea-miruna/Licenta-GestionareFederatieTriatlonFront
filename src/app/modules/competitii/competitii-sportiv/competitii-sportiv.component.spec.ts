import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitiiSportivComponent } from './competitii-sportiv.component';

describe('CompetitiiSportivComponent', () => {
  let component: CompetitiiSportivComponent;
  let fixture: ComponentFixture<CompetitiiSportivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitiiSportivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitiiSportivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
