import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() homeClicked = new EventEmitter<void>();

  constructor (
    private navbarService: NavbarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get pageTitle(): string {
    return this.navbarService.title;
  }
  
  siteTitle: string = 'LG Maths';
  activeSection: string = 'cours';
  isCollapsed: boolean = false;
  hasCollapsedOnce: boolean = false;
  private collapseThreshold: number = 300; // Scroll threshold for collapse

  ngOnInit(): void {
    // Check initial scroll position
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 120; // Height of the full-width navbar with padding
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight - 16; // Extra 16px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      this.activeSection = sectionId;
    }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateActiveSection();
    
    // Auto-collapse logic (only once per lesson)
    if (!this.hasCollapsedOnce && !this.isCollapsed && window.scrollY > this.collapseThreshold) {
      this.isCollapsed = true;
      this.hasCollapsedOnce = true;
    }
  }

  private updateActiveSection(): void {
    const sections = ['cours', 'exercices'];
    const navbarHeight = 120; // Height of the full-width navbar with padding
    const scrollPosition = window.scrollY + navbarHeight + 100; // Add offset for better UX

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        this.activeSection = sections[i];
        break;
      }
    }
  }
}
