import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostariUtilizatorOtherViewComponent } from './postari-utilizator-other-view.component';

describe('PostariUtilizatorOtherViewComponent', () => {
  let component: PostariUtilizatorOtherViewComponent;
  let fixture: ComponentFixture<PostariUtilizatorOtherViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostariUtilizatorOtherViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostariUtilizatorOtherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
