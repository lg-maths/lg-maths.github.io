import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LessonsService } from '../../services/lessons';
import { InputListLessons, InputListLessonsEl } from '../../models/lessons-inputs.model';
import { HscrollSelecter } from '../hscroll-selecter/hscroll-selecter';
import { Router } from '@angular/router';
import { Obj3dCss, Vec3 } from '../../obj3d-css/obj3d-css';

const a = new Vec3(0, 0, 0);
const b = new Vec3(1, 0, 0);
const c = new Vec3(.5, 3**.5 / 2, 0);
const d = new Vec3(.5, 3**.5 / 6, -1*(2/3)**.5);

const e = new Vec3(.5, 3**.5 / 6, 0);

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

  protected tetrahedron = [
    {
      p: a.sub(e),
      q: b.sub(e),
      r: c.sub(e),
      color: 'red'
    },
    {
      p: a.sub(e),
      q: b.sub(e),
      r: d.sub(e),
      color: 'green'
    },
    {
      p: b.sub(e),
      q: c.sub(e),
      r: d.sub(e),
      color: 'blue'
    },
    {
      p: a.sub(e),
      q: c.sub(e),
      r: d.sub(e),
      color: 'yellow'
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
