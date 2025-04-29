
// export const environment = {
//   production: false,
//   auth: {
//     domain: 'dev-rllh1ffa56n14nua.us.auth0.com',
//     clientId: 'jpyapp6GHqtA6QsjjhhH3FKZd4ywRrvU'
//   }
// };

import { EnvironmentProviders } from '@angular/core';

// export const environment = {
//   production: false,
//   auth: typeof window !== 'undefined'
//     ? {
//         domain: 'dev-rllh1ffa56n14nua.us.auth0.com',
//         clientId: 'jpyapp6GHqtA6QsjjhhH3FKZd4ywRrvU',
//         authorizationParams: {
//           redirect_uri: window.location.origin,
//           audience: 'YOUR_AUDIENCE'
//         }
//       }
//     : {
//         domain: '',
//         clientId: '',
//         authorizationParams: {}
//       }
// };


export const environment = {
  production: false,
  auth: {
    domain: 'dev-rllh1ffa56n14nua.us.auth0.com',
    clientId: 'jpyapp6GHqtA6QsjjhhH3FKZd4ywRrvU',
    authorizationParams: {
      redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
    },
    skipRedirectCallback: typeof window === 'undefined', // ✨ Add this
  },
};



