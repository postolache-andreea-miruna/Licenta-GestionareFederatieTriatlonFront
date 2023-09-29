import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipuriAdminComponent } from './tipuri-admin.component';

describe('TipuriAdminComponent', () => {
  let component: TipuriAdminComponent;
  let fixture: ComponentFixture<TipuriAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipuriAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipuriAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
