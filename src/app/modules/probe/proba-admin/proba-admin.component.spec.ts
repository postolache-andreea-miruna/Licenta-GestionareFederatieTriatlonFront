import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbaAdminComponent } from './proba-admin.component';

describe('ProbaAdminComponent', () => {
  let component: ProbaAdminComponent;
  let fixture: ComponentFixture<ProbaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
