import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

interface SurveyQuestion {
  id: string;
  type: 'radio' | 'checkbox' | 'select';
  question: string;
  description?: string;
  options: { value: string; label: string }[];
  required: boolean;
}

@Component({
  selector: 'app-investment-survey',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  templateUrl: './investment-survey.component.html',
  styleUrls: ['./investment-survey.component.scss'],
})
export class InvestmentSurveyComponent implements OnInit {
  @Output() surveyCompleted = new EventEmitter<void>();

  currentQuestionIndex = 0;
  answers: { [key: string]: any } = {};
  progress = 0;

  questions: SurveyQuestion[] = [
    {
      id: 'experience',
      type: 'radio',
      question: 'What is your investment experience?',
      description: 'This helps us tailor our recommendations to your expertise',
      options: [
        { value: 'none', label: 'No experience with investments' },
        { value: 'crypto', label: 'Actively investing in crypto' },
        { value: 'stocks', label: 'Using brokers for stock market' },
        { value: 'both', label: 'Experience with both crypto and stocks' },
      ],
      required: true,
    },
    {
      id: 'investment-horizon',
      type: 'radio',
      question: 'What is your investment time horizon?',
      description: 'How long do you plan to keep your investments?',
      options: [
        { value: 'short', label: 'Short term (1-3 years)' },
        { value: 'medium', label: 'Medium term (3-7 years)' },
        { value: 'long', label: 'Long term (7+ years)' },
      ],
      required: true,
    },
    {
      id: 'risk-tolerance',
      type: 'radio',
      question: 'How would you describe your risk tolerance?',
      description: 'This helps us determine the right balance of assets',
      options: [
        {
          value: 'conservative',
          label: 'Conservative - I prefer stable returns',
        },
        { value: 'moderate', label: 'Moderate - I can handle some volatility' },
        { value: 'aggressive', label: 'Aggressive - I seek higher returns' },
      ],
      required: true,
    },
    {
      id: 'investment-goals',
      type: 'checkbox',
      question: 'What are your primary investment goals?',
      description: 'Select all that apply',
      options: [
        { value: 'retirement', label: 'Retirement planning' },
        { value: 'wealth-growth', label: 'Long-term wealth growth' },
        { value: 'income', label: 'Regular income generation' },
        { value: 'tax-benefits', label: 'Tax optimization' },
        { value: 'diversification', label: 'Portfolio diversification' },
      ],
      required: true,
    },
    {
      id: 'asset-preferences',
      type: 'checkbox',
      question: 'Which asset classes are you interested in?',
      description: 'Select all that apply',
      options: [
        { value: 'stocks', label: 'Stocks' },
        { value: 'bonds', label: 'Bonds' },
        { value: 'crypto', label: 'Cryptocurrencies' },
        { value: 'etf', label: 'ETFs' },
        { value: 'commodities', label: 'Commodities' },
      ],
      required: true,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateProgress();
  }

  get currentQuestion(): SurveyQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  updateProgress(): void {
    this.progress =
      ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  onAnswerChange(value: any): void {
    this.answers[this.currentQuestion.id] = value;
  }

  onCheckboxChange(event: any): void {
    const currentAnswers = this.answers[this.currentQuestion.id] || [];
    if (event.checked) {
      this.answers[this.currentQuestion.id] = [
        ...currentAnswers,
        event.source.value,
      ];
    } else {
      this.answers[this.currentQuestion.id] = currentAnswers.filter(
        (value: string) => value !== event.source.value
      );
    }
  }

  isNextDisabled(): boolean {
    const currentAnswer = this.answers[this.currentQuestion.id];
    if (!currentAnswer) return true;

    if (this.currentQuestion.type === 'checkbox') {
      return !Array.isArray(currentAnswer) || currentAnswer.length === 0;
    }

    return false;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.updateProgress();
    } else {
      this.submitSurvey();
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.updateProgress();
    }
  }

  private submitSurvey(): void {
    localStorage.setItem('surveyCompleted', 'true');
    localStorage.setItem('surveyResults', JSON.stringify(this.answers));
    this.surveyCompleted.emit();
  }
}
