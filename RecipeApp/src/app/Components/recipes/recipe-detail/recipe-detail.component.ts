import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeModel } from '../../../Models/recipe.model';
import { RecipeService } from '../../../Services/recipe.service';
import { DropdownDirective } from '../../../shared/dropdown.directive';

@Component({
  standalone: true,
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownDirective],
})
export class RecipeDetailComponent implements OnInit {
  readonly recipe = signal<RecipeModel | null>(null);
  readonly id = signal(0);

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.id.set(id);
      this.recipe.set(this.recipeService.getRecipe(id));
    });
  }

  onAddToShoppingList(): void {
    const r = this.recipe();
    if (r) {
      this.recipeService.addIngToSl(r.ingredients);
    }
  }

  onEditedRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id());
    this.router.navigate(['/recipes']);
  }
}
