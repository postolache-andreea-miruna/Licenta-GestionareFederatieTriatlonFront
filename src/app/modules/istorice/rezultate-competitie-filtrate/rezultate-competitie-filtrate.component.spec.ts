import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezultateCompetitieFiltrateComponent } from './rezultate-competitie-filtrate.component';

describe('RezultateCompetitieFiltrateComponent', () => {
  let component: RezultateCompetitieFiltrateComponent;
  let fixture: ComponentFixture<RezultateCompetitieFiltrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezultateCompetitieFiltrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezultateCompetitieFiltrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
