import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulareSportivComponent } from './formulare-sportiv.component';

describe('FormulareSportivComponent', () => {
  let component: FormulareSportivComponent;
  let fixture: ComponentFixture<FormulareSportivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulareSportivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulareSportivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
