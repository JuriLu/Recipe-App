import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../Services/auth.service';
import { RecipeService } from '../../Services/recipe.service';
import { AppState } from '../../store/app.reducer';


@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class HeaderComponent implements OnInit {
  readonly collapsed = signal(true);
  readonly isAuthenticated = signal(false);

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(
        map((authState) => authState.user),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((user) => {
        this.isAuthenticated.set(!!user);
      });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
