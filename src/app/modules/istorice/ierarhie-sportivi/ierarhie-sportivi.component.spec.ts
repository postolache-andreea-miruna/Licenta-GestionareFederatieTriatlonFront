import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IerarhieSportiviComponent } from './ierarhie-sportivi.component';

describe('IerarhieSportiviComponent', () => {
  let component: IerarhieSportiviComponent;
  let fixture: ComponentFixture<IerarhieSportiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IerarhieSportiviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IerarhieSportiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
