import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LessonToDisplay } from '../models/lessons-outputs.model';
import { InputLesson, InputClassEl, InputListLessons, InputListLessonsEl } from '../models/lessons-inputs.model';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private http = inject(HttpClient);
  
  // Cache storage
  private lessonsListCache$?: Observable<InputListLessons>;
  private lessonCache = new Map<string, Observable<InputLesson>>();
  private classesCache$?: Observable<string[]>;

  private jsonBase = "assets/json-data"

  getLesson(lesson_id: string, classname: string | null): Observable<LessonToDisplay> {
    // Get cached raw lesson data
    const rawLesson$ = this.getRawLesson(lesson_id);
    
    return rawLesson$.pipe(
      map(
        (inputLesson: InputLesson) => this.buildLesson(inputLesson, classname)
      )
    );
  }

  private buildLesson(inputLesson: InputLesson, classname: string | null): LessonToDisplay {
    var targetClass: InputClassEl | undefined = { 
      classname: "",
      chapter: 0,
      disclaimer: null
    };

    if (classname != null) {
      targetClass = inputLesson.classes.find(cls => cls.classname === classname);
    
      if (!targetClass) {
        throw new Error(`Class "${classname}" not found for lesson`);
      }
    }
    
    console.debug(inputLesson);

    // Transform to LessonToDisplay
    const lessonToDisplay: LessonToDisplay = {
      id: inputLesson.id,
      title: inputLesson.title,
      classname: targetClass.classname,
      content: (targetClass as any).content || inputLesson.content,
      exercices: inputLesson.exercises.sort((a, b) => a.id - b.id),
      disclaimer: targetClass.disclaimer ?? undefined
    };

    return lessonToDisplay;
  }

  private getRawLesson(lesson_id: string): Observable<InputLesson> {
    if (this.lessonCache.has(lesson_id)) {
      return this.lessonCache.get(lesson_id)!;
    }

    const lesson$ = this.http.get<InputLesson>(`${this.jsonBase}/${lesson_id}.json`).pipe(
      shareReplay(1)
    );
    this.lessonCache.set(lesson_id, lesson$);

    return this.lessonCache.get(lesson_id)!;
  }

  getLessonsList(): Observable<InputListLessons> {
    if (this.lessonsListCache$) {
      return this.lessonsListCache$;
    }

    this.lessonsListCache$ = this.http.get<InputListLessons>(`${this.jsonBase}/generic.json`).pipe(
      shareReplay(1)
    );

    return this.lessonsListCache$;
  }

  /**
   * Clear all cached data - useful for refreshing data or memory management
   */
  clearCache(): void {
    this.lessonsListCache$ = undefined;
    this.classesCache$ = undefined;
    this.lessonCache.clear();
  }

  /**
   * Clear cache for a specific lesson
   */
  clearLessonCache(lesson_id: string): void {
    this.lessonCache.delete(lesson_id);
  }
}
