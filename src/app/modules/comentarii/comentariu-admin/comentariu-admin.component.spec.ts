import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariuAdminComponent } from './comentariu-admin.component';

describe('ComentariuAdminComponent', () => {
  let component: ComentariuAdminComponent;
  let fixture: ComponentFixture<ComentariuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariuAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
