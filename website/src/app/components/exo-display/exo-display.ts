import { Component, Input, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { InputExercice } from '../../models/lessons-inputs.model';

@Component({
  selector: 'app-exo-display',
  imports: [CommonModule, MatButtonModule, MatIconModule, MarkdownComponent],
  templateUrl: './exo-display.html',
  styleUrl: './exo-display.css',
  encapsulation: ViewEncapsulation.None
})
export class ExoDisplay {
  @Input({ required: true }) exercice!: InputExercice;

  // Signal to track whether we're showing the solution (true) or statement (false)
  showSolution = signal(false);

  toggleView() {
    this.showSolution.set(!this.showSolution());
  }

  get currentContent(): string {
    return this.showSolution() ? this.exercice.solution : this.exercice.statement;
  }

  get buttonLabel(): string {
    return this.showSolution() ? 'Énoncé' : 'Solution';
  }
}
