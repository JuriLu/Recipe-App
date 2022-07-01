import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from '../shared/header/header.component';

import { RecipeService } from "./Services/recipe.service";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { AppRoutingModule } from "./app-routing.module";
import { DataStorageService } from "./Services/data-storage.service";
import { ShoppingListService } from "./Services/shopping-list.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { StoreModule } from '@ngrx/store';
import {shoppingListReducer} from "./Components/shopping-list/store/shopping-list.reducer";
import {RecipesModule} from "./Components/recipes/recipes.module";
import {ShoppingListModule} from "./Components/shopping-list/shopping-list.module";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "./core/core.module";



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({shoppingList:shoppingListReducer})
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
