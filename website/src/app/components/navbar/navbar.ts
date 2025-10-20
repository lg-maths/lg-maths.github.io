import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = '';
  @Output() homeClicked = new EventEmitter<void>();
  
  siteTitle: string = 'LG Maths';
  activeSection: string = 'cours';

  ngOnInit(): void {
    // Check initial scroll position
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  navigateToHome(): void {
    this.homeClicked.emit();
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

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateActiveSection();
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
