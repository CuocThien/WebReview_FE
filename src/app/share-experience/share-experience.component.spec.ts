import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareExperienceComponent } from './share-experience.component';

describe('ShareExperienceComponent', () => {
  let component: ShareExperienceComponent;
  let fixture: ComponentFixture<ShareExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
