import { Component, OnInit, inject, ViewEncapsulation, Input } from '@angular/core';
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
  @Input({ required: true }) lessonId!: number;
  @Input({ required: true }) class!: string;

  lessonToDisplay: LessonToDisplay | null = null;

  ngOnInit(): void {
    this.lessonsService.getLesson(this.lessonId, this.class).subscribe({
      next: (lesson) => {
        this.lessonToDisplay = lesson
      },
      error: (error) => {
        console.error('Error loading lesson content:', error);
      }
    });
  }

  constructor(
    private lessonsService: LessonsService
  ) { }
}
