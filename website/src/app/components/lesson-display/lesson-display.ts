import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { LessonsService } from '../../services/lessons';
import { LessonToDisplay } from '../../models/lessons-outputs.model';

@Component({
  selector: 'app-lesson-display',
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './lesson-display.html',
  styleUrl: './lesson-display.css',
  encapsulation: ViewEncapsulation.None
})
export class LessonDisplayComponent implements OnInit {
  lessonToDisplay: LessonToDisplay | null = null;

  ngOnInit(): void {
    this.loadLessonContent();
  }

  constructor(
    private lessonsService: LessonsService
  ) { }

  private loadLessonContent(): void {
    this.lessonsService.getLesson(0, null).subscribe({
      next: (lesson) => {
        this.lessonToDisplay = lesson
      },
      error: (error) => {
        console.error('Error loading lesson content:', error);
      }
    });
  }
}
