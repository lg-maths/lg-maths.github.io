import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDisplay } from './lesson-display';

describe('LessonDisplay', () => {
  let component: LessonDisplay;
  let fixture: ComponentFixture<LessonDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
