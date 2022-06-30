import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeModel} from "../Models/recipe.model";
import {RecipeService} from "./recipe.service";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url:string = 'https://recipes-5f607-default-rtdb.firebaseio.com/'
  recipesEndpoint:string = 'recipes.json'

  constructor(private http: HttpClient,private recipeService:RecipeService,private authService:AuthService) { }

  storeRecipes(){
    const recipes:RecipeModel[] = this.recipeService.getRecipes();
    return this.http.put(
        this.url + this.recipesEndpoint,
        recipes  //body
      )
  }

      //the Take pipe makes sure that we take only one value from where we subscribe(user) and then automatically subscribe
      //exhaustMap merges 2 observables into one,In our case it first waits for the user observable to finish and
      // when we pass an argument where it will be the other observable we will merge

  fetchRecipes(){
    return this.http.get<RecipeModel[]>
    (this.url + this.recipesEndpoint,).pipe(
      map(recipes => {
        return recipes.map(recipe =>{                             //map here is a Javascript array method map
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }});
        }),
      tap(recipes =>{
        this.recipeService.setRecipes(recipes)
      })
    )
  }


}
