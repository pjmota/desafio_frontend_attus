import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { UsersEffects } from './features/users/store/users.effects';
import { usersFeatureKey, usersReducer } from './features/users/store/users.reducer';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      closeButton: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      timeOut: 3500,
    }),
    provideStore(),
    provideState(usersFeatureKey, usersReducer),
    provideEffects([UsersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
