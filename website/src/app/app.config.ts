import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown, MARKED_EXTENSIONS } from 'ngx-markdown';
import markedAlert from 'marked-alert';

import { routes } from './app.routes';

const markedAlertOptions = {
  variants: [
    {
      type: 'remark',
      icon: '<span class="marked-alert-icon">🤓</span>',
      title: 'Remarque'
    },
    {
      type: 'theorem',
      icon: '<span class="marked-alert-icon">🔬</span>',
      title: 'Théorème'
    },
    {
      type: 'demo',
      icon: '<span class="marked-alert-icon">🔧</span>',
      title: 'Démonstration'
    },
    {
      type: 'example',
      icon: '<span class="marked-alert-icon">🔍</span>',
      title: 'Exemple'
    },
    {
      type: 'exo',
      icon: '<span class="marked-alert-icon">✏️</span>',
      title: 'Exercice'
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
