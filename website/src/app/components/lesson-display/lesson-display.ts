import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { MarkdownContent, AcademicLevel } from '../../models/markdown-content.model';

@Component({
  selector: 'app-lesson-display',
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './lesson-display.html',
  styleUrl: './lesson-display.css',
  encapsulation: ViewEncapsulation.None
})
export class LessonDisplayComponent implements OnInit {
  private http = inject(HttpClient);
  markdownContent: MarkdownContent | null = null;

  ngOnInit(): void {
    this.loadLessonContent();
  }

  private loadLessonContent(): void {
    this.http.get<any>('assets/.lessons-json/test.json').subscribe({
      next: (data) => {
        this.markdownContent = {
          title: data.title,
          content: data.content,
          level: data.level as AcademicLevel
        };
      },
      error: (error) => {
        console.error('Error loading lesson content:', error);
      }
    });
  }
}
