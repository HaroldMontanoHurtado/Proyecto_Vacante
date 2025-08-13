import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import { App } from './app/app';
import { tokenInterceptor } from './app/core/interceptors/token-interceptor';

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
