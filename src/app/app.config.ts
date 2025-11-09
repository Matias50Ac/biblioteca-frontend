import { importProvidersFrom } from '@angular/core'; 
import { ReactiveFormsModule } from '@angular/forms';import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // <-- Añade , withFetch
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient(),
    provideHttpClient(withFetch()), // <-- Añade withFetch() aquí
    importProvidersFrom(ReactiveFormsModule)
  ]
};