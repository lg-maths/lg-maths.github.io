import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { LessonsService } from '../../services/lessons';
import { LessonToDisplay } from '../../models/lessons-outputs.model';
import { ExoDisplay } from '../exo-display/exo-display';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-lesson-display',
  imports: [CommonModule, MarkdownComponent, ExoDisplay],
  templateUrl: './lesson-display.html',
  styleUrl: './lesson-display.scss',
  encapsulation: ViewEncapsulation.None
})
export class LessonDisplayComponent implements OnInit {
  lessonId!: string;
  class!: string;
  lessonToDisplay: LessonToDisplay | null = null;

  constructor (
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private lessonsService: LessonsService
  ) { }

  ngOnInit(): void {
    // Get route parameters
    this.route.params.subscribe(params => {
      this.lessonId = params['lessonId'];
      this.class = params['classname'];

      // Load lesson content
      this.lessonsService.getLesson(this.lessonId, this.class).subscribe(
        lesson => this.loadLesson(lesson)
      );

      
    });
  }

  private loadLesson(lesson: LessonToDisplay) {
    this.lessonToDisplay = lesson;
    this.navbarService.title = lesson.title;
  }
}
