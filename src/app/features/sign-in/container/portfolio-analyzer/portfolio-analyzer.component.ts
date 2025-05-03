import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { curveLinear } from 'd3-shape';
import {
  Portfolio,
  PortfolioAsset,
  PnlPoint,
  InvestorProfile,
  Pnl,
} from '../../../../shared/interfaces/api.interface';
import { PortfolioAnalyzerService } from './portfolio-analyzer.service';
import { finalize } from 'rxjs/operators';
import { InvestmentSurveyComponent } from '../investment-survey/investment-survey.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-portfolio-analyzer',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    NgxChartsModule,
    FormsModule,
    InvestmentSurveyComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './portfolio-analyzer.component.html',
  styleUrls: ['./portfolio-analyzer.component.scss'],
})
export class PortfolioAnalyzerComponent implements OnInit {
  portfolio: Portfolio | null = null;
  investorProfile: InvestorProfile | null = null;
  pnl: Pnl | null = null;
  isLoading = true;
  error: string | null = null;
  showQuestionnaire = signal(true);
  showAnalyzerLoader = false;
  showDashboard = signal(false);
  chatMessage = '';
  chatMessages: { text: string; isUser: boolean }[] = [];
  delayNumber = 3000;

  // Chart configurations
  pieChartData: ChartData[] = [];
  performanceData: any[] = [];
  view: [number, number] = [800, 350];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Date';
  showYAxisLabel = false;
  yAxisLabel = 'Portfolio Value';
  timeline = true;
  autoScale = true;
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2E7D32', '#388E3C', '#43A047', '#4CAF50', '#66BB6A'],
  };

  step1Complete = false;
  step2Complete = false;
  step3Complete = false;

  curveLinear = curveLinear;

  constructor(
    private readonly portfolioService: PortfolioAnalyzerService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    this.error = null;

    this.portfolioService
      .getPortfolio()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (portfolio) => {
          this.portfolio = portfolio;
          this.initializeChartData();
        },
        error: (error) => {
          console.error('Error loading portfolio:', error);
          this.error = 'Failed to load portfolio data. Please try again later.';
        },
      });

    this.portfolioService.getInvestorProfile().subscribe({
      next: (profile) => {
        this.investorProfile = profile;
      },
      error: (error) => {
        console.error('Error loading investor profile:', error);
      },
    });

    this.portfolioService.getPnl().subscribe({
      next: (pnl) => {
        this.pnl = pnl;
        this.updatePerformanceData();
      },
      error: (error) => {
        console.error('Error loading PnL data:', error);
      },
    });
  }

  private initializeChartData(): void {
    if (!this.portfolio?.assets?.length) {
      this.pieChartData = [];
      this.performanceData = [];
      return;
    }

    // Prepare pie chart data
    this.pieChartData = this.portfolio.assets.map((asset: PortfolioAsset) => ({
      name: asset.name,
      value: asset.weight * 100,
    }));

    // Initialize performance data
    this.performanceData = [];
  }

  private updatePerformanceData(): void {
    if (!this.pnl || !Array.isArray(this.pnl)) return;

    // Sort the data by date in ascending order
    const sortedData = [...this.pnl].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Format the data for the chart
    this.performanceData = [
      {
        name: 'Portfolio Value',
        series: sortedData.map((point) => ({
          name: new Date(point.date).toISOString().split('T')[0],
          value: point.balance,
        })),
      },
    ];
  }

  sendMessage(): void {
    if (this.chatMessage.trim()) {
      const userMessage = this.chatMessage;
      this.chatMessages.push({
        text: userMessage,
        isUser: true,
      });
      this.chatMessage = '';

      this.portfolioService.sendChatMessage(userMessage).subscribe({
        next: (response) => {
          this.chatMessages.push({
            text: response.reply,
            isUser: false,
          });
          if (response.updatedPortfolio) {
            this.portfolio = response.updatedPortfolio;
            this.initializeChartData();
          }
          if (response.updatedProfile) {
            this.investorProfile = response.updatedProfile;
          }
        },
        error: (error) => {
          console.error('Error sending chat message:', error);
          this.chatMessages.push({
            text: 'Starting managing your risks...',
            isUser: false,
          });
        },
      });
    }
  }

  onSurveyCompleted(): void {
    // Reset all states
    this.step1Complete = false;
    this.step2Complete = false;
    this.step3Complete = false;
    this.showDashboard.set(false);

    // Show loader and hide questionnaire
    this.showAnalyzerLoader = true;
    this.showQuestionnaire.set(false);

    this.spinner.show();
    this.runLoadingSequence();
  }

  private async runLoadingSequence(): Promise<void> {
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

      // After all steps are complete, load the portfolio data
      this.loadData();

      // Only show dashboard after all steps are complete
      if (this.step1Complete && this.step2Complete && this.step3Complete) {
        this.showDashboard.set(true);
        this.showAnalyzerLoader = false;
      }
    } catch (error) {
      console.error('Loading sequence failed:', error);
    } finally {
      this.spinner.hide();
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
