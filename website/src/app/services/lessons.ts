import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LessonToDisplay } from '../models/lessons-outputs.model';
import { InputLesson, InputClassEl } from '../models/lessons-inputs.model';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private http = inject(HttpClient);

  getLesson(lesson_id: number, classname: string | null): Observable<LessonToDisplay> {
    return this.http.get<InputLesson>(`assets/.lessons-json/${lesson_id}.json`).pipe(
      map((inputLesson: InputLesson) => {
        // Find the specific class information for the requested classname
        var targetClass: InputClassEl | undefined = { 
          classname: "",
          chapter: 0,
          disclaimer: null
        };

        if (classname != null) {
          targetClass = inputLesson.classes.find(cls => cls.classname === classname);
        
          if (!targetClass) {
            throw new Error(`Class "${classname}" not found for lesson ${lesson_id}`);
          }
        }

        // Transform to LessonToDisplay
        const lessonToDisplay: LessonToDisplay = {
          id: inputLesson.id,
          title: inputLesson.title,
          classname: targetClass.classname,
          content: inputLesson.content,
          disclaimer: targetClass.disclaimer || undefined
        };

        return lessonToDisplay;
      })
    );
  }
}
