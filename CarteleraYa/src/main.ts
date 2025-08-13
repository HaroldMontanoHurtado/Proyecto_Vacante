import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App, routes } from './app/app';
import { tokenInterceptor } from './app/core/interceptors/token-interceptor';

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    importProvidersFrom(
      RouterModule.forRoot(routes)
    )
  ]
}).catch(err => console.error(err));
