import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app';
import { tokenInterceptor } from './app/core/interceptors/token-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(appRoutes)
  ]
}).catch(err => console.error(err));
