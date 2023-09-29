import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitieAdminComponent } from './competitie-admin.component';

describe('CompetitieAdminComponent', () => {
  let component: CompetitieAdminComponent;
  let fixture: ComponentFixture<CompetitieAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitieAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitieAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
