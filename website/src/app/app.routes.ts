import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage';
import { LessonDisplayComponent } from './components/lesson-display/lesson-display';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomepageComponent },
	{
		path: 'lesson/:classname/:lessonId',
		component: LessonDisplayComponent
	}
];
