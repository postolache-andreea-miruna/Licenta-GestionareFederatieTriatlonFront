import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompidComponent } from './compid.component';

describe('CompidComponent', () => {
  let component: CompidComponent;
  let fixture: ComponentFixture<CompidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
