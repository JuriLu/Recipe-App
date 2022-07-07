import {Component,OnInit} from '@angular/core';
import {IngredientModel} from "../../Models/ingredient.model";

import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromShoppingList from "./store/shopping-list.reducer"
import * as ShoppingListActions from "./store/shopping-list.actions"

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: IngredientModel[] }>;

  constructor(
    private store: Store<fromShoppingList.AppState>) {        //NgRx
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')  // NgRx
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index)) //NgRx
  }



}
