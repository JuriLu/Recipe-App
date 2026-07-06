import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from '../../Services/toast.service';

@Component({
  standalone: true,
  selector: 'app-toast-container',
  template: `
    <div class="toast-container" role="alert" aria-live="assertive">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast-box" [class]="toast.type" (click)="toastService.remove(toast.id)">
          <div class="toast-icon">
            @if (toast.type === 'success') {
              <span>✓</span>
            } @else if (toast.type === 'error') {
              <span>✗</span>
            } @else {
              <span>ℹ</span>
            }
          </div>
          <p class="toast-message">{{ toast.message }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: var(--fib-21);
      right: var(--fib-21);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: var(--fib-8);
      max-width: 320px;
    }
    .toast-box {
      display: flex;
      align-items: center;
      gap: var(--fib-13);
      padding: var(--fib-13) var(--fib-21);
      border-radius: var(--fib-8);
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(12px);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #f8fafc;
      cursor: pointer;
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .toast-box:hover {
      transform: translateY(-2px);
      background: rgba(30, 41, 59, 0.95);
    }
    .toast-box.success {
      border-left: 4px solid #10b981;
    }
    .toast-box.error {
      border-left: 4px solid #ef4444;
    }
    .toast-box.info {
      border-left: 4px solid #3b82f6;
    }
    .toast-icon {
      font-weight: bold;
      font-size: 16px;
    }
    .toast-box.success .toast-icon { color: #10b981; }
    .toast-box.error .toast-icon { color: #ef4444; }
    .toast-box.info .toast-icon { color: #3b82f6; }
    .toast-message {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
    }
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}
