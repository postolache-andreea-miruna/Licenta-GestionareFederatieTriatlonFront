import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostareViewUtilizComponent } from './postare-view-utiliz.component';

describe('PostareViewUtilizComponent', () => {
  let component: PostareViewUtilizComponent;
  let fixture: ComponentFixture<PostareViewUtilizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostareViewUtilizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostareViewUtilizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
