import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PortfolioAnalyzerComponent } from './container/portfolio-analyzer/portfolio-analyzer.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, PortfolioAnalyzerComponent],
  exports: [PortfolioAnalyzerComponent],
})
export class SignInModule {}
