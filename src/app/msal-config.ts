import { PublicClientApplication } from '@azure/msal-browser';
import { MSAL_INSTANCE, MsalService, MsalGuardConfiguration, MSAL_GUARD_CONFIG, MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { InjectionToken } from '@angular/core';
import { InteractionType } from '@azure/msal-browser';

// export const msalInstanceFactory = () =>
//   return  new PublicClientApplication({
//     auth: {
//       clientId: '9298e23f-f951-4164-ad53-92347706120b',
//       authority: 'https://login.microsoftonline.com/45488ed5-ce1d-4d00-87d2-144f056d15d3',
//       redirectUri: 'http://localhost:4200/',
//     },
//     cache: {
//       cacheLocation: 'localStorage',
//       storeAuthStateInCookie: false,
//     }
//   });
  export function msalInstanceFactory() {
    return new PublicClientApplication({
      auth: {
        clientId: '9298e23f-f951-4164-ad53-92347706120b',
        authority: 'https://login.microsoftonline.com/45488ed5-ce1d-4d00-87d2-144f056d15d3',
        redirectUri: 'http://localhost:4200',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
      },
    });
  }
export const msalGuardConfigFactory = (): MsalGuardConfiguration => ({
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['user.read'],
  }
});
