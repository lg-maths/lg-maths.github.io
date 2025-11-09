import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('website');

  constructor(
    private router: Router,
    private navbarService: NavbarService
  ) { }

  // Computed property to determine current view
  get currentView(): 'homepage' | 'lesson-page' {
    return this.router.url.includes('/lesson/') ? 'lesson-page' : 'homepage';
  }
}
