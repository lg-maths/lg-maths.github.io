import { Component, Input, Output, EventEmitter, model, OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DuplicatedItem {
  value: string;
  instanceId: string; // Unique identifier for this specific instance
}

@Component({
  selector: 'app-hscroll-selecter',
  imports: [CommonModule],
  templateUrl: './hscroll-selecter.html',
  styleUrl: './hscroll-selecter.scss'
})
export class HscrollSelecter implements OnInit, AfterViewInit, OnChanges {
  @Input() values: string[] = [];
  
  // Two-way bindable property using Angular's model signal
  selection = model<string | undefined>();
  
  @Output() onSelectionChange = new EventEmitter<string>();

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef<HTMLDivElement>;

  // Tripled values for infinite scroll effect
  duplicatedValues: DuplicatedItem[] = [];
  
  // Track which specific instance is selected (not just the value)
  selectedInstanceId = signal<string | null>(null);

  private isScrolling = false;
  private scrollTimeout: any;

  ngOnInit(): void {
    this.createDuplicatedValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values'] && !changes['values'].firstChange) {
      this.createDuplicatedValues();
      // Re-position scroll after values change
      setTimeout(() => this.positionScrollToCenter(), 100);
    }
  }

  ngAfterViewInit(): void {
    // Position scroll in the middle (on the second copy)
    this.positionScrollToCenter();
  }

  private positionScrollToCenter(): void {
    if (this.scrollContainer && this.duplicatedValues.length > 0) {
      const container = this.scrollContainer.nativeElement;
      setTimeout(() => {
        const scrollWidth = container.scrollWidth;
        container.scrollLeft = scrollWidth / 3;
      }, 0);
    }
  }

  private createDuplicatedValues(): void {
    if (!this.values || this.values.length === 0) {
      this.duplicatedValues = [];
      return;
    }

    // Create 3 copies of the values array with unique instance IDs
    this.duplicatedValues = [
      ...this.values.map((value, idx) => ({ value, instanceId: `prev-${idx}` })),
      ...this.values.map((value, idx) => ({ value, instanceId: `mid-${idx}` })),
      ...this.values.map((value, idx) => ({ value, instanceId: `next-${idx}` }))
    ];
  }

  selectValue(item: DuplicatedItem): void {
    this.selectedInstanceId.set(item.instanceId);
    this.selection.set(item.value);
    this.onSelectionChange.emit(item.value);
  }

  isSelectedInstance(item: DuplicatedItem): boolean {
    return this.selectedInstanceId() === item.instanceId;
  }

  onScroll(event: Event): void {
    if (this.isScrolling) return;

    const container = event.target as HTMLDivElement;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const sectionWidth = scrollWidth / 3;

    // Clear existing timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Wait for scrolling to stop before repositioning
    this.scrollTimeout = setTimeout(() => {
      // If scrolled to the left section, jump to middle
      if (scrollLeft < sectionWidth * 0.1) {
        this.isScrolling = true;
        container.scrollLeft = scrollLeft + sectionWidth;
        setTimeout(() => this.isScrolling = false, 50);
      }
      // If scrolled to the right section, jump to middle
      else if (scrollLeft > sectionWidth * 1.9) {
        this.isScrolling = true;
        container.scrollLeft = scrollLeft - sectionWidth;
        setTimeout(() => this.isScrolling = false, 50);
      }
    }, 100);
  }
}
