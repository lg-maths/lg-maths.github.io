import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown, MARKED_EXTENSIONS } from 'ngx-markdown';
import markedAlert from 'marked-alert';

import { routes } from './app.routes';

const markedAlertOptions = {
  variants: [
    {
      type: 'info',
      icon: 'lightbulb_2',
      title: 'Remarque'
    },
    {
      type: 'warning',
      icon: 'feedback',
      title: 'Attention'
    },
    {
      type: 'theorem',
      icon: 'school',
      title: 'Théorème'
    },
    {
      type: 'demo',
      icon: 'architecture',
      title: 'Démonstration'
    },
    {
      type: 'example',
      icon: 'biotech',
      title: 'Exemple'
    }
  ].map(
    el => (
      {
        type: el.type, 
        title: el.title, 
        icon: `<span class="material-symbols-outlined marked-alert-icon">${el.icon}</span>`
      }
    )
  )
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
