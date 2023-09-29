import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenziiCompIdComponent } from './recenzii-comp-id.component';

describe('RecenziiCompIdComponent', () => {
  let component: RecenziiCompIdComponent;
  let fixture: ComponentFixture<RecenziiCompIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecenziiCompIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecenziiCompIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
