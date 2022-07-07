import {NgModule} from '@angular/core';
import {CoreModule} from "./core/core.module";
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./shared/header/header.component";
import * as fromAppReducer from "./store/app.reducer"


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromAppReducer.appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
