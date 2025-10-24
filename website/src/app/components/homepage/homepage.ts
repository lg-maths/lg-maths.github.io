import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LessonsService } from '../../services/lessons';
import { InputListLessons, InputListLessonsEl } from '../../models/lessons-inputs.model';
import { HscrollSelecter } from '../hscroll-selecter/hscroll-selecter';
import { Router } from '@angular/router';
import { Obj3dCss, Vec3 } from '../../obj3d-css/obj3d-css';


@Component({
  selector: 'app-homepage',
  imports: [
    CommonModule,
    HscrollSelecter,
    Obj3dCss
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class HomepageComponent implements OnInit {
  protected selectedClass?: string;
  
  listLessons?: InputListLessons;

  protected tris = [
    {
      p: new Vec3(0, -1, 3),
      q: new Vec3(2, 2, -1),
      r: new Vec3(-1, 5, 4),
      color: 'yellow'
    },
    {
      p: new Vec3(0, 0, 0),
      q: new Vec3(1, 0, 0),
      r: new Vec3(0, 1, 0),
      color: 'red'
    },
  ]
  
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
