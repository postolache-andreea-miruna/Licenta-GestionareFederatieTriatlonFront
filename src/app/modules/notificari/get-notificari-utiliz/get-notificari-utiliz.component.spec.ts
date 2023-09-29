import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNotificariUtilizComponent } from './get-notificari-utiliz.component';

describe('GetNotificariUtilizComponent', () => {
  let component: GetNotificariUtilizComponent;
  let fixture: ComponentFixture<GetNotificariUtilizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetNotificariUtilizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetNotificariUtilizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
