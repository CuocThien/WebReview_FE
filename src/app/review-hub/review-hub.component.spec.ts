import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHubComponent } from './review-hub.component';

describe('ReviewHubComponent', () => {
  let component: ReviewHubComponent;
  let fixture: ComponentFixture<ReviewHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
