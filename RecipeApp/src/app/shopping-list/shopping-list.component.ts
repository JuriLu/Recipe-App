import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../Models/ingredient.model";
import {ShoppingListService} from "../Services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: IngredientModel[];
  private igChangesSub: Subscription;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
   this.igChangesSub = this.slService.ingredientsChanged.subscribe(
      (ingredients:IngredientModel[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index:number){
    this.slService.startedEditing.next(index)
  }

  ngOnDestroy(){
    this.igChangesSub.unsubscribe()
  }


}
