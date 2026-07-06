import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { RecipeModel } from '../../../Models/recipe.model';
import { RecipeService } from '../../../Services/recipe.service';
import { DataStorageService } from '../../../Services/data-storage.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  standalone: true,
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RecipeItemComponent],
})
export class RecipeListComponent implements OnInit {
  readonly recipes = signal<RecipeModel[]>([]);

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Auto-fetch on load
    this.dataStorageService.fetchRecipes().subscribe();

    // Seed from service
    this.recipes.set(this.recipeService.getRecipes());

    // React to changes
    this.recipeService.recipesChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((recipes: RecipeModel[]) => {
        this.recipes.set(recipes);
      });
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
