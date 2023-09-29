import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularIdComponent } from './formular-id.component';

describe('FormularIdComponent', () => {
  let component: FormularIdComponent;
  let fixture: ComponentFixture<FormularIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
