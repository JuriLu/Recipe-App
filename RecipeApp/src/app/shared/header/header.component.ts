import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { AuthService } from '../../Services/auth.service';
import { AppState } from '../../store/app.reducer';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  readonly collapsed = signal(true);

  private readonly store = inject(Store<AppState>);
  private readonly authService = inject(AuthService);

  // toSignal() replaces manual subscribe + takeUntilDestroyed — automatically cleaned up
  private readonly authUser = toSignal(
    this.store.select('auth').pipe(map((s) => s.user)),
    { initialValue: null }
  );

  readonly isAuthenticated = computed(() => !!this.authUser());

  onLogout(): void {
    this.authService.logout();
  }
}
