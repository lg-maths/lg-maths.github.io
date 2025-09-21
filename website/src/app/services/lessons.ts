import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AcademicLevel, MarkdownLesson } from '../models/markdown-lesson.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private http = inject(HttpClient);

  getLesson(lesson_id: number): Observable<MarkdownLesson> {
    return this.http.get<any>(`assets/.lessons-json/${lesson_id}.json`).pipe(
      map((data) => ({
        id: data.id || lesson_id,
        title: data.title,
        content: data.content,
        level: data.level as AcademicLevel
      }))
    );
  }
}
