import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loading-sequence-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="loading-sequence-item">
      <span class="text">{{ text }}</span>

      @if (!isComplete) {
      <span class="dots">
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">.</span>
      </span>
      } @else {
      <mat-icon class="checkmark">check_circle</mat-icon>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      .loading-sequence-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        gap: 20px;
        font-size: 18px;
        color: #fff;
        min-height: 30px;
      }

      .dots {
        display: inline-flex;
        gap: 2px;
      }

      .dot {
        animation: dotAnimation 1.4s infinite;
        opacity: 0;
      }

      .dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      .checkmark {
        color: #4caf50;
      }

      @keyframes dotAnimation {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `,
  ],
})
export class LoadingSequenceItemComponent {
  @Input() text = '';
  @Input() isComplete = false;
}
