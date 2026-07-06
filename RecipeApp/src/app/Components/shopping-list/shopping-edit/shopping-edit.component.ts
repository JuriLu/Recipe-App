import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IngredientModel } from '../../../Models/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromAppReducer from '../../../store/app.reducer';

@Component({
  standalone: true,
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm!: NgForm;
  readonly editMode = signal(false);
  editedItem: IngredientModel | null = null;

  private readonly store = inject(Store<fromAppReducer.AppState>);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.store
      .select('shoppingList')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode.set(true);
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode.set(false);
        }
      });

    this.destroyRef.onDestroy(() => {
      this.store.dispatch(new ShoppingListActions.StopEdit());
    });
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new IngredientModel(value.name, value.amount);
    if (this.editMode()) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode.set(false);
    form.reset();
  }

  onClear(): void {
    this.slForm.reset();
    this.editMode.set(false);
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
