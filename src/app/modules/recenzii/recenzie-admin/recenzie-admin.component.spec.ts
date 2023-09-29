import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenzieAdminComponent } from './recenzie-admin.component';

describe('RecenzieAdminComponent', () => {
  let component: RecenzieAdminComponent;
  let fixture: ComponentFixture<RecenzieAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecenzieAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecenzieAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
