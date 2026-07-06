import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from '../Services/auth.service';
import { ToastService } from '../Services/toast.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, AlertComponent, LoadingSpinnerComponent],
})
export class AuthComponent {
  readonly isLoginMode = signal(true);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

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
        this.toastService.show(
          this.isLoginMode() ? 'Welcome back!' : 'Sign up successful! Welcome!',
          'success'
        );
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage: string) => {
        console.log(errorMessage);
        this.error.set(errorMessage);
        this.isLoading.set(false);
        this.toastService.show(errorMessage, 'error');
      },
    });

    form.reset();
  }

  onHandleError(): void {
    this.error.set(null);
  }
}
