import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../../../Models/recipe.model";
import {RecipeService} from "../../../Services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../../Services/data-storage.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy{
  recipes: RecipeModel[];
  subscription:Subscription

  constructor(
    private recipeService:RecipeService,
    private dataStorageService:DataStorageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(){
        //automatically set the fetch request
    this.dataStorageService.fetchRecipes().subscribe()


    //automatically get the recipes
    this.recipes = this.recipeService.getRecipes();

    //React to the changes of the recipes
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes:RecipeModel[]) => {
        this.recipes = recipes
    })
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.activatedRoute})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
