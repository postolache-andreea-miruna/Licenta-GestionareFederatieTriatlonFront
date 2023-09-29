import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenziileSportivuluiComponent } from './recenziile-sportivului.component';

describe('RecenziileSportivuluiComponent', () => {
  let component: RecenziileSportivuluiComponent;
  let fixture: ComponentFixture<RecenziileSportivuluiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecenziileSportivuluiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecenziileSportivuluiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
