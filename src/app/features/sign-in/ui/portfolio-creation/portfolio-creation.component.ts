import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingSequenceItemComponent } from '../loading-sequence-item/loading-sequence-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-creation',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule, LoadingSequenceItemComponent],
  template: `
    <div class="portfolio-creation-container">
      <ngx-spinner
        bdColor="rgba(0, 0, 0, 0.8)"
        size="medium"
        color="#ff7819"
        type="ball-scale-multiple"
        [showSpinner]="true"
      >
      </ngx-spinner>
      <h1 class="creation-title">Creating Your Portfolio</h1>

      <div class="loading-sequence">
        <app-loading-sequence-item
          text="We are checking your investment preferences"
          [isComplete]="step1Complete"
        />
        <app-loading-sequence-item
          text="Create personalized portfolio"
          [isComplete]="step2Complete"
        />
        <app-loading-sequence-item
          text="Generate suggestions"
          [isComplete]="step3Complete"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .portfolio-creation-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
      }

      .creation-title {
        font-size: 2rem;
        color: #333;
        margin-bottom: 2rem;
      }

      .loading-sequence {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        min-width: 300px;
      }
    `,
  ],
})
export class PortfolioCreationComponent implements OnInit {
  step1Complete = false;
  step2Complete = false;
  step3Complete = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startLoadingSequence();
  }

  private async startLoadingSequence() {
    // Step 1
    await this.delay(3000);
    this.step1Complete = true;

    // Step 2
    await this.delay(3000);
    this.step2Complete = true;

    // Step 3
    await this.delay(3000);
    this.step3Complete = true;

    // Navigate to next screen after all steps are complete
    await this.delay(1000);
    await this.router.navigate(['/analyzer']);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
