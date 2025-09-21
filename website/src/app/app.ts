import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LessonDisplayComponent } from './components/lesson-display/lesson-display';
import { HomepageComponent } from './components/homepage/homepage';
import { NavbarComponent } from "./components/navbar/navbar";

export interface LessonSelection {
  lessonId: number;
  classname: string;
  lessonTitle: string;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LessonDisplayComponent,
    NavbarComponent,
    HomepageComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('website');
  
  // State management
  currentView = signal<'homepage' | 'lesson'>('homepage');
  selectedLesson = signal<LessonSelection | null>(null);
  
  // Navigation methods
  showHomepage(): void {
    this.currentView.set('homepage');
    this.selectedLesson.set(null);
  }
  
  showLesson(lesson: LessonSelection): void {
    this.selectedLesson.set(lesson);
    this.currentView.set('lesson');
  }
  
  // Computed values for navbar
  get pageTitle(): string {
    const lesson = this.selectedLesson();
    if (lesson) {
      return `${lesson.classname} — ${lesson.lessonTitle}`;
    }
    return '';
  }
}
