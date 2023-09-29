import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompIdViewSpComponent } from './comp-id-view-sp.component';

describe('CompIdViewSpComponent', () => {
  let component: CompIdViewSpComponent;
  let fixture: ComponentFixture<CompIdViewSpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompIdViewSpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompIdViewSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
