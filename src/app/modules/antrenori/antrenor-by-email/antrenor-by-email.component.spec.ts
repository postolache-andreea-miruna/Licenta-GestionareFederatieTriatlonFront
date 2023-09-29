import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntrenorByEmailComponent } from './antrenor-by-email.component';

describe('AntrenorByEmailComponent', () => {
  let component: AntrenorByEmailComponent;
  let fixture: ComponentFixture<AntrenorByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntrenorByEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntrenorByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
