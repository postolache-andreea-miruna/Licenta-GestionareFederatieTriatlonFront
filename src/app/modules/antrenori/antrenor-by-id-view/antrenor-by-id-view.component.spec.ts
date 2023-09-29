import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntrenorByIdViewComponent } from './antrenor-by-id-view.component';

describe('AntrenorByIdViewComponent', () => {
  let component: AntrenorByIdViewComponent;
  let fixture: ComponentFixture<AntrenorByIdViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntrenorByIdViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntrenorByIdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
