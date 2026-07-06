import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from '../Services/auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, AlertComponent, LoadingSpinnerComponent],
})
export class AuthComponent {
  readonly isLoginMode = signal(true);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSwitchMode(): void {
    this.isLoginMode.update((v) => !v);
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;
    let authObs: Observable<AuthResponseData>;

    this.isLoading.set(true);

    if (this.isLoginMode()) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage: string) => {
        console.log(errorMessage);
        this.error.set(errorMessage);
        this.isLoading.set(false);
      },
    });

    form.reset();
  }

  onHandleError(): void {
    this.error.set(null);
  }
}
