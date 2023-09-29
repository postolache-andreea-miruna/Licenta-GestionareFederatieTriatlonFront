import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostareAdminComponent } from './postare-admin.component';

describe('PostareAdminComponent', () => {
  let component: PostareAdminComponent;
  let fixture: ComponentFixture<PostareAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostareAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostareAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
