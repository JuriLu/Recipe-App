import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<fromAppReducer.AppState>);
  return store.select('auth').pipe(
    take(1),
    map((authState) => authState.user),
    exhaustMap((user) => {
      if (!user || !user.token) {
        return next(req);
      }
      const modifiedRequest = req.clone({
        params: new HttpParams().set('auth', user.token),
      });
      return next(modifiedRequest);
    })
  );
};
