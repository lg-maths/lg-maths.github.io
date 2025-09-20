import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown, MARKED_EXTENSIONS } from 'ngx-markdown';
import markedAlert from 'marked-alert';

import { routes } from './app.routes';

const markedAlertOptions = {
  variants: [
    {
      type: 'note',
      icon: '<i class="mr-2">✏️</i>',
      title: 'Note'
    },
    {
      type: 'theorem',
      icon: '',
      title: 'Théorème'
    }
  ]
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideMarkdown(),
    {
      provide: MARKED_EXTENSIONS,
      useValue: markedAlert(markedAlertOptions),
      multi: true
    }
  ]
};
