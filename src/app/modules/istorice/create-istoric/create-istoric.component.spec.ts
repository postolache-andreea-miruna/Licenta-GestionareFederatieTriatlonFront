import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIstoricComponent } from './create-istoric.component';

describe('CreateIstoricComponent', () => {
  let component: CreateIstoricComponent;
  let fixture: ComponentFixture<CreateIstoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIstoricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIstoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
