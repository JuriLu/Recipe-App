import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../../../Models/recipe.model";
import {RecipeService} from "../../../Services/recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:RecipeModel;
  id:number;

  constructor(
    private recipeService:RecipeService,
    private activatedRoute:ActivatedRoute,
    private router:Router
) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id)
      })
  }

  onAddToShoppingList(){
    this.recipeService.addIngToSl(this.recipe.ingredients)
  }

  onEditedRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.activatedRoute})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }

}
