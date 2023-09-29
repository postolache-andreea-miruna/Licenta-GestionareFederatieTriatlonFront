import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulareAdminComponent } from './formulare-admin.component';

describe('FormulareAdminComponent', () => {
  let component: FormulareAdminComponent;
  let fixture: ComponentFixture<FormulareAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulareAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulareAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
