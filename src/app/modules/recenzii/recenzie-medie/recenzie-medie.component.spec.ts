import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenzieMedieComponent } from './recenzie-medie.component';

describe('RecenzieMedieComponent', () => {
  let component: RecenzieMedieComponent;
  let fixture: ComponentFixture<RecenzieMedieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecenzieMedieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecenzieMedieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
