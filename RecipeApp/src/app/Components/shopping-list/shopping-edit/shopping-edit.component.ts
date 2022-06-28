import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from "../../../Models/ingredient.model";
import {ShoppingListService} from "../../../Services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy {
  @ViewChild('f') slForm:NgForm
  subscription:Subscription
  editMode = false
  editedItemIndex :number
  editedItem :IngredientModel;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
   this.subscription =  this.slService.startedEditing.subscribe(
     (index:number) => {
       this.editMode = true;
       this.editedItemIndex = index
       this.editedItem = this.slService.getIngredient(index)
       this.slForm.setValue({
         name: this.editedItem.name,
         amount : this.editedItem.amount
       })
     }
    )
  }


  onSubmit(form:NgForm){
    const value = form.value
    const newIngredient = new IngredientModel(value.name,value.amount);
    if (this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false
    form.reset()
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
