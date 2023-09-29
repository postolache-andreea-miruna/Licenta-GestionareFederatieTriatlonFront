import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenziiCompIdSpViewComponent } from './recenzii-comp-id-sp-viewcomponent';

describe('RecenziiCompIdSpViewComponent', () => {
  let component: RecenziiCompIdSpViewComponent;
  let fixture: ComponentFixture<RecenziiCompIdSpViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecenziiCompIdSpViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecenziiCompIdSpViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
