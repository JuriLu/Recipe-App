import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from "../../../Models/ingredient.model";
import {ShoppingListService} from "../../../Services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm
  subscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: IngredientModel;

  constructor(
    private slService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: IngredientModel[] } }>) {
  }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index
        this.editedItem = this.slService.getIngredient(index)
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }


  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new IngredientModel(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index:this.editedItemIndex,ingredient: newIngredient})) //NgRx
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient)) //NGRX
    }
    this.editMode = false
    form.reset()
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex)
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex))
    this.onClear()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
