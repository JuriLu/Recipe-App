import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  effect,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { AuthService } from '../../Services/auth.service';
import { ProfileService, UserProfile } from '../../Services/profile.service';
import { AppState } from '../../store/app.reducer';
import { ToastService } from '../../Services/toast.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly profileService = inject(ProfileService);
  private readonly store = inject(Store<AppState>);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  readonly userId = signal<string>('');
  readonly userToken = signal<string>('');
  readonly userEmail = signal<string>('');

  // Form Fields
  readonly firstName = signal<string>('');
  readonly lastName = signal<string>('');
  readonly newPassword = signal<string>('');
  readonly showPassword = signal<boolean>(false);

  // Food Preferences list
  readonly availablePreferences = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Low-Carb',
    'Halal',
    'Kosher',
  ];
  readonly selectedPreferences = signal<string[]>([]);

  constructor() {
    // Populate form fields when database profile is loaded
    effect(() => {
      const profile = this.profileService.currentProfile();
      if (profile) {
        this.firstName.set(profile.firstName || '');
        this.lastName.set(profile.lastName || '');
        this.selectedPreferences.set(profile.foodPreferences || []);
      }
    });
  }

  ngOnInit(): void {
    // Fetch active user details from Auth store state
    this.store
      .select('auth')
      .pipe(
        map((authState) => authState.user),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((user) => {
        if (user) {
          this.userId.set(user.id);
          this.userEmail.set(user.email);
          this.userToken.set(user.token || '');
          this.profileService.loadProfile(user.id);
        }
      });
  }

  onTogglePreference(preference: string): void {
    this.selectedPreferences.update((prefs) => {
      if (prefs.includes(preference)) {
        return prefs.filter((p) => p !== preference);
      } else {
        return [...prefs, preference];
      }
    });
  }

  onToggleShowPassword(): void {
    this.showPassword.update((v) => !v);
  }

  onSaveProfile(form: NgForm): void {
    if (!form.valid) return;

    const profileData: UserProfile = {
      userId: this.userId(),
      firstName: this.firstName(),
      lastName: this.lastName(),
      foodPreferences: this.selectedPreferences(),
    };

    // Save profile settings to json-server database
    this.profileService.saveProfile(profileData);

    // If new password is provided, trigger update through AuthService
    if (this.newPassword().trim().length >= 6) {
      this.authService.updatePassword(this.userToken(), this.newPassword()).subscribe({
        next: () => {
          this.toastService.show('Password updated successfully!', 'success');
          this.newPassword.set('');
        },
        error: (err) => {
          this.toastService.show(err || 'Failed to update password.', 'error');
        },
      });
    }
  }
}
