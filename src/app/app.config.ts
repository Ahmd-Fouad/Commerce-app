import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { headerInterceptor } from './core/interceptor/header-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()), 
    provideClientHydration(withEventReplay()),
    importProvidersFrom(CookieService),
    provideToastr()
  ]
};
function provideServerRoutes(arg0: {
  path: string; renderMode: string; // Change to client-side rendering
}[]): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

