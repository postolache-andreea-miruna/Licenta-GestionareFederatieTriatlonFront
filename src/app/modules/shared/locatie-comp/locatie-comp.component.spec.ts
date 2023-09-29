import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatieCompComponent } from './locatie-comp.component';

describe('LocatieCompComponent', () => {
  let component: LocatieCompComponent;
  let fixture: ComponentFixture<LocatieCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatieCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocatieCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
