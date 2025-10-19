import { Component, Input, Output, EventEmitter, model, OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ElementRef, signal, QueryList, ViewChildren } from '@angular/core';
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
export class HscrollSelecter {
  @Input() values: string[] = [];
  
  // Two-way bindable property using Angular's model signal
  selection = model<string | undefined>();
  
  @Output() onSelectionChange = new EventEmitter<string>();

  protected copies = [...Array(5).keys()];

  // Drag properties
  private stateTranslateX = 0;
  private isDragging = false;
  private startX = 0;
  private currentDragOffset = 0;

  get globalTranslateX(): number {
    return this.stateTranslateX + this.currentDragOffset;
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
  }

  protected onScrollMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    
    // Prevent default only for touch events
    if ('touches' in event) {
      event.preventDefault(); // Prevent scrolling only for touch
    }
    
    const currentX = this.getClientX(event);
    this.currentDragOffset = currentX - this.startX;

    console.log(this.globalTranslateX);
  }

  protected onScrollEnd(): void {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.stateTranslateX += this.currentDragOffset;
    this.currentDragOffset = 0;
  }

}
