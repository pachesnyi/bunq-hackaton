import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingSequenceItemComponent } from '../../ui/loading-sequence-item/loading-sequence-item.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    NgxSpinnerModule,
    CommonModule,
    LoadingSequenceItemComponent,
  ],
})
export class SignInComponent {
  step1Complete = false;
  step2Complete = false;
  step3Complete = false;
  showLoadingSequence = false;

  delayNumber = 6000;

  constructor(private spinner: NgxSpinnerService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(async () => {
      await this.signIn();
    }, 9000);
  }

  async signIn(): Promise<void> {
    this.spinner.show();
    this.showLoadingSequence = true;

    try {
      // Step 1
      await this.delay(this.delayNumber);
      this.step1Complete = true;

      // Step 2
      await this.delay(this.delayNumber);
      this.step2Complete = true;

      // Step 3
      await this.delay(this.delayNumber);
      this.step3Complete = true;

      await this.delay(1000);

      await this.router.navigate(['/portfolio']);
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      this.spinner.hide();
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
