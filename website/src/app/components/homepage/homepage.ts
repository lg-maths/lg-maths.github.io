import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LessonsService } from '../../services/lessons';
import { InputListLessons, InputListLessonsEl } from '../../models/lessons-inputs.model';
import { LessonSelection } from '../../app';
import { HscrollSelecter } from '../hscroll-selecter/hscroll-selecter';

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
  @Output() lessonSelected = new EventEmitter<LessonSelection>();
  protected selectedClass?: string;
  
  listLessons?: InputListLessons;
  
  constructor(private lessonsService: LessonsService) {
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
    const lessonSelection: LessonSelection = {
      lessonId: lesson.id,
      classname: lesson.classname,
      lessonTitle: lesson.title
    };
    this.lessonSelected.emit(lessonSelection);
  }
}
