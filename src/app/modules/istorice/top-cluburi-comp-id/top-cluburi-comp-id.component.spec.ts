import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCluburiCompIdComponent } from './top-cluburi-comp-id.component';

describe('TopCluburiCompIdComponent', () => {
  let component: TopCluburiCompIdComponent;
  let fixture: ComponentFixture<TopCluburiCompIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCluburiCompIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCluburiCompIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
