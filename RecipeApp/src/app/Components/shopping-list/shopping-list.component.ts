import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromAppReducer from '../../store/app.reducer';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@Component({
  standalone: true,
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShoppingEditComponent]
})
export class ShoppingListComponent {
  private readonly store = inject(Store<fromAppReducer.AppState>);
  readonly shoppingList = this.store.selectSignal(state => state.shoppingList);

  onEditItem(index: number): void {
    this.store.dispatch(ShoppingListActions.startEdit({ payload: index }));
  }
}
