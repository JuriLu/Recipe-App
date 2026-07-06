import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import { IngredientModel } from '../../../Models/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromAppReducer from '../../../store/app.reducer';

@Component({
  standalone: true,
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm!: NgForm;

  private readonly store = inject(Store<fromAppReducer.AppState>);

  // toSignal() replaces subscribe + takeUntilDestroyed pattern
  private readonly slState = toSignal(
    this.store.select('shoppingList'),
    { initialValue: null }
  );

  readonly editMode = computed(() => (this.slState()?.editedIngredientIndex ?? -1) > -1);

  ngOnInit(): void {
    // Reactively update form when edit state changes
    // We still use OnInit to set up the effect
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new IngredientModel(value.name, value.amount);
    if (this.editMode()) {
      this.store.dispatch(ShoppingListActions.updateIngredient({ payload: newIngredient }));
    } else {
      this.store.dispatch(ShoppingListActions.addIngredient({ payload: newIngredient }));
    }
    form.reset();
  }

  onClear(): void {
    this.slForm.reset();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onDelete(): void {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onClear();
  }
}
