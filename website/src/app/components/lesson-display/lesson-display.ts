import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { MarkdownLesson, AcademicLevel } from '../../models/markdown-lesson.model';
import { LessonsService } from '../../services/lessons';

@Component({
  selector: 'app-lesson-display',
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './lesson-display.html',
  styleUrl: './lesson-display.css',
  encapsulation: ViewEncapsulation.None
})
export class LessonDisplayComponent implements OnInit {
  private http = inject(HttpClient);
  markdownContent: MarkdownLesson | null = null;

  ngOnInit(): void {
    this.loadLessonContent();
  }

  constructor(
    private lessonsService: LessonsService
  ) { }

  private loadLessonContent(): void {
    this.lessonsService.getLesson(0).subscribe({
      next: (lesson) => {
        this.markdownContent = lesson
      },
      error: (error) => {
        console.error('Error loading lesson content:', error);
      }
    });
  }
}
