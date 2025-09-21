import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDisplayComponent } from './lesson-display';

describe('LessonDisplayComponent', () => {
  let component: LessonDisplayComponent;
  let fixture: ComponentFixture<LessonDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
