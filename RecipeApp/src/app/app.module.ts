import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from '../shared/header/header.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { RecipeEditComponent } from './Components/recipes/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './Components/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './Components/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './Components/recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './Components/recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './Components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './Components/shopping-list/shopping-edit/shopping-edit.component';

import { RecipeService } from "./Services/recipe.service";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { AppRoutingModule } from "./app-routing.module";
import { DropdownDirective } from '../shared/dropdown.directive';
import { DataStorageService } from "./Services/data-storage.service";
import { ShoppingListService } from "./Services/shopping-list.service";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { StoreModule } from '@ngrx/store';
import {shoppingListReducer} from "./Components/shopping-list/store/shopping-list.reducer";



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    RecipesComponent,
    DropdownDirective,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeStartComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({shoppingList:shoppingListReducer})

  ],
  providers: [RecipeService,ShoppingListService,DataStorageService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
