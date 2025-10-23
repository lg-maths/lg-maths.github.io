import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LessonsService } from '../../services/lessons';
import { InputListLessons, InputListLessonsEl } from '../../models/lessons-inputs.model';
import { HscrollSelecter } from '../hscroll-selecter/hscroll-selecter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [
    CommonModule,
    HscrollSelecter
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class HomepageComponent implements OnInit {
  protected selectedClass?: string;
  
  listLessons?: InputListLessons;
  
  constructor(
    private lessonsService: LessonsService,
    private router: Router
  ) {
    this.lessonsService.getLessonsList().subscribe(response => this.listLessons = response);
  }

  ngOnInit(): void {}

  get classes(): string[] {
    if (this.listLessons === undefined) {
      return [];
    }

    return this.listLessons.classes_sorted;
  }

  lessonsForClass(classname?: string): InputListLessonsEl[] {
    if (this.listLessons === undefined) {
      return [];
    }

    if (classname === undefined) {
      return [];
    }

    return this.listLessons.lessons
      .filter(el => el.classname === classname)
      .sort((a, b) => a.chapter - b.chapter);
  }
  
  onLessonClick(lesson: InputListLessonsEl): void {
    this.router.navigate(['/lesson', lesson.classname, lesson.id]);
  }
}
