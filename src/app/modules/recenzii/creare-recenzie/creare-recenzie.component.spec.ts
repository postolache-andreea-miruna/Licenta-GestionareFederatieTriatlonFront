import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreareRecenzieComponent } from './creare-recenzie.component';

describe('CreareRecenzieComponent', () => {
  let component: CreareRecenzieComponent;
  let fixture: ComponentFixture<CreareRecenzieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreareRecenzieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreareRecenzieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
