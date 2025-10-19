import { Component, Input, Output, EventEmitter, model, OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ElementRef, signal, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselItem {
  value: string;
  id: string; // Unique ID for DOM tracking
  position: number; // Position index in the circular buffer
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
  @ViewChildren('itemElement') itemElements!: QueryList<ElementRef<HTMLButtonElement>>;

  // Carousel items
  carouselItems: CarouselItem[] = [];
  
  // Track which specific instance is selected
  selectedId = signal<string | null>(null);

  // Drag-to-scroll properties
  private isDragging = false;
  private startX = 0;
  currentTranslate = 0; // Made public for template binding
  private previousTranslate = 0;
  private hasDragged = false;
  
  // Item dimensions
  private itemWidth = 0;
  private readonly minVisibleItems = 5; // Minimum items to keep visible

  ngOnInit(): void {
    this.createCarouselItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values'] && !changes['values'].firstChange) {
      this.createCarouselItems();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateItemWidth();
      this.centerInitialView();
    }, 0);
  }

  private calculateItemWidth(): void {
    if (this.itemElements && this.itemElements.length > 0) {
      const firstItem = this.itemElements.first.nativeElement;
      const rect = firstItem.getBoundingClientRect();
      const styles = getComputedStyle(firstItem);
      const marginRight = parseFloat(styles.marginRight);
      this.itemWidth = rect.width + marginRight;
      console.log('Item width calculated:', this.itemWidth);
    }
  }

  private centerInitialView(): void {
    // Start centered
    this.currentTranslate = 0;
    this.previousTranslate = 0;
  }

  private createCarouselItems(): void {
    if (!this.values || this.values.length === 0) {
      this.carouselItems = [];
      return;
    }

    // Create enough copies to fill the viewport with extra buffer
    const totalItems = Math.max(this.values.length * 3, this.minVisibleItems * 2);
    this.carouselItems = [];
    
    for (let i = 0; i < totalItems; i++) {
      const valueIndex = i % this.values.length;
      this.carouselItems.push({
        value: this.values[valueIndex],
        id: `item-${i}`,
        position: i
      });
    }
  }

  selectValue(item: CarouselItem, event: MouseEvent): void {
    // Don't select if user was dragging
    if (this.hasDragged) {
      this.hasDragged = false;
      event.preventDefault();
      return;
    }
    
    this.selectedId.set(item.id);
    this.selection.set(item.value);
    this.onSelectionChange.emit(item.value);
  }

  isSelected(item: CarouselItem): boolean {
    return this.selectedId() === item.id;
  }

  // Drag-to-scroll methods
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.hasDragged = false;
    this.startX = event.clientX;
    this.scrollContainer.nativeElement.style.cursor = 'grabbing';
  }

  onMouseLeave(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.previousTranslate = this.currentTranslate;
      this.scrollContainer.nativeElement.style.cursor = 'grab';
    }
  }

  onMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.previousTranslate = this.currentTranslate;
      this.scrollContainer.nativeElement.style.cursor = 'grab';
      
      // Check if items need repositioning after drag ends
      this.repositionItems();
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    
    const currentX = event.clientX;
    const diff = currentX - this.startX;
    
    // If moved more than 5px, consider it a drag
    if (Math.abs(diff) > 5) {
      this.hasDragged = true;
    }
    
    this.currentTranslate = this.previousTranslate + diff;
    this.repositionItems();
  }

  private repositionItems(): void {
    if (!this.itemWidth || this.carouselItems.length === 0 || this.values.length === 0) return;

    const container = this.scrollContainer.nativeElement;
    const containerWidth = container.offsetWidth;
    const totalWidth = this.carouselItems.length * this.itemWidth;
    const valueWidth = this.values.length * this.itemWidth;
    
    // When we've scrolled more than one set of values, adjust
    if (this.currentTranslate > valueWidth / 2) {
      this.currentTranslate -= valueWidth;
      this.previousTranslate -= valueWidth;
    } else if (this.currentTranslate < -valueWidth / 2) {
      this.currentTranslate += valueWidth;
      this.previousTranslate += valueWidth;
    }
  }
}
