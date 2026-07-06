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

import { DataStorageService } from '../../Services/data-storage.service';
import { AuthService } from '../../Services/auth.service';
import { AppState } from '../../store/app.reducer';
import { DropdownDirective } from '../dropdown.directive';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, DropdownDirective],
})
export class HeaderComponent implements OnInit {
  readonly collapsed = signal(true);
  readonly isAuthenticated = signal(false);

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
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

  onSaveData(): void {
    this.dataStorageService.storeRecipes().subscribe((data) => {
      console.log(data);
    });
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
