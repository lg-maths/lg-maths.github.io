import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LessonDisplayComponent } from './components/lesson-display/lesson-display';
import { HomepageComponent } from './components/homepage/homepage';
import { NavbarComponent } from "./components/navbar/navbar";

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
}
