import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import {exhaustMap, map, take} from 'rxjs';
import {AuthService} from "../Services/auth.service";
import {Store} from "@ngrx/store";
import * as fromAppReducer from'../store/app.reducer'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromAppReducer.AppState> ){
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone(
          {params: new HttpParams().set('auth', user.token)}
        )
        return next.handle(modifiedRequest);
      })
    );
  }
}
