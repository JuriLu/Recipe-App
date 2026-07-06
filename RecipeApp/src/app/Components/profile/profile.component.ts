import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

  // toSignal() replaces manual subscribe lifecycle — cleaned up automatically
  private readonly authUser = toSignal(
    this.store.select('auth').pipe(map((s) => s.user)),
    { initialValue: null }
  );

  readonly userId = computed(() => this.authUser()?.id ?? '');
  readonly userEmail = computed(() => this.authUser()?.email ?? '');
  readonly userToken = computed(() => this.authUser()?.token ?? '');

  // Form Fields (writable signals)
  readonly firstName = signal<string>('');
  readonly lastName = signal<string>('');
  readonly newPassword = signal<string>('');
  readonly showPassword = signal<boolean>(false);

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
    // Sync loaded database profile into form fields
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
    const id = this.userId();
    if (id) {
      this.profileService.loadProfile(id);
    }
  }

  onTogglePreference(preference: string): void {
    this.selectedPreferences.update((prefs) =>
      prefs.includes(preference)
        ? prefs.filter((p) => p !== preference)
        : [...prefs, preference]
    );
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

    this.profileService.saveProfile(profileData);

    if (this.newPassword().trim().length >= 6) {
      this.authService.updatePassword(this.userToken(), this.newPassword()).subscribe({
        next: () => {
          this.toastService.show('Password updated successfully!', 'success');
          this.newPassword.set('');
        },
        error: (err: string) => {
          this.toastService.show(err || 'Failed to update password.', 'error');
        },
      });
    }
  }
}
