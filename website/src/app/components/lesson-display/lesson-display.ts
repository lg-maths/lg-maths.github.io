import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-lesson-display',
  imports: [MarkdownComponent],
  templateUrl: './lesson-display.html',
  styleUrl: './lesson-display.css'
})
export class LessonDisplayComponent {

}
