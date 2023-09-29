import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitieIdAdminComponent } from './competitie-id-admin.component';

describe('CompetitieIdAdminComponent', () => {
  let component: CompetitieIdAdminComponent;
  let fixture: ComponentFixture<CompetitieIdAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitieIdAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitieIdAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
