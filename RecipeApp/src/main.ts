import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { appReducer } from './app/store/app.reducer';
import { authInterceptor } from './app/auth/auth.interceptor';
import { RecipesEffects } from './app/Components/recipes/store/recipes.effects';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(appReducer),
    provideEffects([RecipesEffects]),
  ],
}).catch((err) => console.error(err));
