import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostariUtilizatorComponent } from './postari-utilizator.component';

describe('PostariUtilizatorComponent', () => {
  let component: PostariUtilizatorComponent;
  let fixture: ComponentFixture<PostariUtilizatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostariUtilizatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostariUtilizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
