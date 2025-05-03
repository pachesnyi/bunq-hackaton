/**
 * API interfaces based on OpenAPI specification
 */

export interface Error {
  code: number;
  message: string;
}

export type RiskBucket = 'Conservative' | 'Balanced' | 'Growth' | 'Aggressive';

export interface ProjectedRange {
  low: number;
  high: number;
}

export interface InvestorProfile {
  userId: string;
  riskBucket: RiskBucket;
  riskScore: number;
  disposableIncomePercent: number;
  projectedCAGR: number;
  projectedRange: ProjectedRange;
  liquidityBufferMonths: number;
  lastUpdated: string;
}

export interface PortfolioAsset {
  symbol: string;
  name: string;
  assetClass: string;
  weight: number;
  currentPrice: number;
  units: number;
  currency: string;
  market: string;
  priceDate: string;
  expectedYield: number;
}

export interface PnlPoint {
  date: string;
  balance: number;
  netReturn: number;
}

export interface Pnl {
  balance: number;
  date: string;
  netReturn: number;
}

export interface Portfolio {
  userId: string;
  totalBalance: number;
  rebalanceFrequencyDays: number;
  assets: PortfolioAsset[];
  pnlSeries: PnlPoint[];
  lastUpdated: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
  updatedProfile?: InvestorProfile;
  updatedPortfolio?: Portfolio;
}

export interface HealthResponse {
  status: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}
