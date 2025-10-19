import { Component, Input, Output, EventEmitter, model, OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ElementRef, signal, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselItem {
  value: string;
  id: string; // Unique ID for DOM tracking
  position: number; // Position index in the circular buffer
}

interface CopyWrapper {
  copyIndex: number;
  items: CarouselItem[];
}

@Component({
  selector: 'app-hscroll-selecter',
  imports: [CommonModule],
  templateUrl: './hscroll-selecter.html',
  styleUrl: './hscroll-selecter.scss'
})
export class HscrollSelecter implements OnInit, OnDestroy {
  @Input() values: string[] = [];
  
  // Two-way bindable property using Angular's model signal
  selection = model<string | undefined>();
  
  @Output() onSelectionChange = new EventEmitter<string>();

  protected copies = [...Array(4).keys()];

  // Drag properties
  private startTranslateX = 0;
  private stateTranslateX = 0;
  private isDragging = false;
  private startX = 0;
  private currentDragOffset = 0;

  private groupWidth?: number;

  // Animation properties
  private animationId?: number;
  private readonly pixelsPerSecond = 5;
  private readonly stepsPerSecond = 60;
  private readonly incrementPerStep = this.pixelsPerSecond / this.stepsPerSecond; // 10px / 60 = ~0.1667px per step

  ngOnInit() {
    const gap = 10;
    const width = 120;
    const elsCount = this.values.length;
    this.groupWidth = gap * (elsCount) + width * elsCount;
    console.log(this.groupWidth);
    this.startTranslateX = -1 * this.groupWidth;
    
    // Start the automatic scrolling animation
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  get globalTranslateX(): number {
    return this.startTranslateX + this.stateTranslateX + this.currentDragOffset;
  }

  get jumpTranslateGroupX(): number {
    if (this.groupWidth === undefined) return 0;

    return Math.floor((this.stateTranslateX + this.currentDragOffset) / this.groupWidth) * this.groupWidth;
  }

  get totalGroupTranslationX(): number {
    return this.globalTranslateX - this.jumpTranslateGroupX;
  }

  // Selection methods
  protected selectElement(value: string): void {
    this.selection.set(value);
    this.onSelectionChange.emit(value);
  }

  protected isSelected(value: string): boolean {
    return this.selection() === value;
  }

  // Helper method to get clientX from either mouse or touch event
  private getClientX(event: MouseEvent | TouchEvent): number {
    // Check if it's a touch event by looking for the touches property
    if ('touches' in event && event.touches && event.touches.length > 0) {
      return event.touches[0].clientX;
    }
    // Otherwise it's a mouse event
    return (event as MouseEvent).clientX;
  }

  // Unified drag methods for both mouse and touch
  protected onScrollStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.startX = this.getClientX(event);
    this.currentDragOffset = 0;
    this.stopAutoScroll();
  }

  protected onScrollMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    
    // Prevent default only for touch events
    if ('touches' in event) {
      event.preventDefault(); // Prevent scrolling only for touch
    }
    
    const currentX = this.getClientX(event);
    this.currentDragOffset = currentX - this.startX;
  }

  protected onScrollEnd(): void {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.stateTranslateX += this.currentDragOffset;
    this.currentDragOffset = 0;
    this.startAutoScroll(.3);
  }

  // Auto-scroll animation methods
  private startAutoScroll(delaySeconds: number = 0): void {
    const startAnimation = () => {
      const animate = () => {
        this.stateTranslateX += this.incrementPerStep;
        this.animationId = requestAnimationFrame(animate);
      };
      this.animationId = requestAnimationFrame(animate);
    };

    if (delaySeconds > 0) {
      setTimeout(startAnimation, delaySeconds * 1000);
    } else {
      startAnimation();
    }
  }

  private stopAutoScroll(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }

}
