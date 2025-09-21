import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { LessonsService } from '../../services/lessons';
import { InputListLessonsEl } from '../../models/lessons-inputs.model';

@Component({
  selector: 'app-homepage',
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class HomepageComponent implements OnInit {
  classes$: Observable<string[]>;
  
  constructor(private lessonsService: LessonsService) {
    this.classes$ = this.lessonsService.getAllClasses();
  }

  ngOnInit(): void {}

  getLessonsForClass(classname: string): Observable<InputListLessonsEl[]> {
    return this.lessonsService.getLessonsForClass(classname);
  }
}
