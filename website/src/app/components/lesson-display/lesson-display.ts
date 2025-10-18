import { Component, OnInit, inject, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { LessonsService } from '../../services/lessons';
import { LessonToDisplay } from '../../models/lessons-outputs.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ExoDisplay } from '../exo-display/exo-display';

@Component({
  selector: 'app-lesson-display',
  imports: [CommonModule, MarkdownComponent, MatIconModule, MatTabsModule, MatExpansionModule, MatCardModule, MatButtonModule, ExoDisplay],
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
