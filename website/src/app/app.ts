import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LessonDisplayComponent } from './components/lesson-display/lesson-display';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LessonDisplayComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('website');
}
