// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';

// import { provideAuth0 } from '@auth0/auth0-angular';
// import { environment } from '../environments/environment';
// import { isPlatformBrowser } from '@angular/common';
// import { inject, PLATFORM_ID } from '@angular/core';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(),
//     provideZoneChangeDetection({ eventCoalescing: true }), 
//     provideRouter(routes), 
//     provideClientHydration(withEventReplay()),
//     {
//       provide: 'auth-provider',
//       useFactory: () => {
//         const platformId = inject(PLATFORM_ID);
//         if (isPlatformBrowser(platformId)) {
//           return provideAuth0(environment.auth);
//         }
//         return []; 
//       },
//     },
//   ]
// };

import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes'; // adjust path if needed

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(),
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideClientHydration(withEventReplay()),
//   ]
// };

import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideAuth0(environment.auth), 
  ],
};

