import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { RecipeModel } from '../../../../Models/recipe.model';

@Component({
  standalone: true,
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class RecipeItemComponent {
  readonly recipe = input.required<RecipeModel>();
  readonly index = input.required<number>();
}
