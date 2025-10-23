import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LessonToDisplay } from '../models/lessons-outputs.model';
import { InputLesson, InputClassEl, InputListLessons, InputListLessonsEl } from '../models/lessons-inputs.model';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
	public title: string = "hello world!"
}
