import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";

import {RouterModule} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations:[
    RecipesComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeStartComponent,
    RecipeDetailComponent,
  ],
  imports:[
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ],
  exports:[
    // RecipesComponent,
    // RecipeItemComponent,
    // RecipeListComponent,
    // RecipeEditComponent,
    // RecipeStartComponent,
    // RecipeDetailComponent,
      // Exports can be not used because they are being used internally in the RecipesModule through RecipesRoutingModule
  ]
})
export class RecipesModule {}
