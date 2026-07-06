import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<fromAppReducer.AppState>);
  const router = inject(Router);

  return store.select('auth').pipe(
    take(1),
    map((authState) => authState.user),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    })
  );
};
