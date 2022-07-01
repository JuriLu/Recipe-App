import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeService} from "../Services/recipe.service";
import {ShoppingListService} from "../Services/shopping-list.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../auth/auth.interceptor";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    RecipeService,
    ShoppingListService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ]
})
export class CoreModule { }
