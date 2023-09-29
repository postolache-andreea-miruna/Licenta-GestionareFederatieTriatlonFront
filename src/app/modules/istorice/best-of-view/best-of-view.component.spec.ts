import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestOfViewComponent } from './best-of-view.component';

describe('BestOfViewComponent', () => {
  let component: BestOfViewComponent;
  let fixture: ComponentFixture<BestOfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestOfViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestOfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
