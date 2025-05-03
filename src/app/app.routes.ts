import { Routes } from '@angular/router';
import { SignInComponent } from './features/sign-in/container/sign-in/sign-in.component';
import { surveyGuard } from './features/sign-in/guards/survey.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'survey',
    loadComponent: () =>
      import(
        './features/sign-in/container/investment-survey/investment-survey.component'
      ).then((m) => m.InvestmentSurveyComponent),
  },
  {
    path: 'portfolio',
    loadComponent: () =>
      import(
        './features/sign-in/container/portfolio-analyzer/portfolio-analyzer.component'
      ).then((m) => m.PortfolioAnalyzerComponent),
    canActivate: [],
  },
];
