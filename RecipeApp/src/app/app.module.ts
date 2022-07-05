import {NgModule} from '@angular/core';
import {CoreModule} from "./core/core.module";
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {SharedModule} from "../shared/shared.module";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {shoppingListReducer} from "./Components/shopping-list/store/shopping-list.reducer";
import {HeaderComponent} from "../shared/header/header.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    // AuthModule,   //Lazy Loading
    // RecipesModule,   //removed because it is implemented as lazy loading
    // ShoppingListModule,  // Lazy Loading
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
