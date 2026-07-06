import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipeService } from '../../../Services/recipe.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  standalone: true,
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RecipeItemComponent],
})
export class RecipeListComponent implements OnInit {
  readonly recipes = this.recipeService.recipes;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.recipeService.fetchRecipes();
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
