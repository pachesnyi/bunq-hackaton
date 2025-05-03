import {
  InvestorProfile,
  Portfolio,
  PortfolioAsset,
  PnlPoint,
  ChatRequest,
  ChatResponse,
  HealthResponse,
} from '../interfaces/api.interface';

export const mockInvestorProfile: InvestorProfile = {
  userId: '1c9bd125-81bc-49ea-a14a-f5af6b6e86ba',
  riskBucket: 'Balanced',
  riskScore: 0.47,
  disposableIncomePercent: 0.23,
  projectedCAGR: 0.072,
  projectedRange: {
    low: 0.031,
    high: 0.112,
  },
  liquidityBufferMonths: 5,
  lastUpdated: '2025-05-02T10:11:22Z',
};

export const mockPortfolioAssets: PortfolioAsset[] = [
  {
    symbol: 'VWCE',
    name: 'Vanguard FTSE All-World ETF',
    assetClass: 'Equity',
    weight: 0.45,
    currentPrice: 109.25,
    units: 13.72,
    currency: 'EUR',
    market: 'XETRA',
    priceDate: '2025-05-01',
    expectedYield: 0.018,
  },
  {
    symbol: 'AGGH',
    name: 'iShares Global Aggregate Bond ETF',
    assetClass: 'Fixed Income',
    weight: 0.35,
    currentPrice: 45.8,
    units: 25.45,
    currency: 'EUR',
    market: 'XETRA',
    priceDate: '2025-05-01',
    expectedYield: 0.025,
  },
  {
    symbol: 'GLDM',
    name: 'SPDR Gold MiniShares Trust',
    assetClass: 'Commodity',
    weight: 0.2,
    currentPrice: 35.15,
    units: 8.92,
    currency: 'USD',
    market: 'NYSE',
    priceDate: '2025-05-01',
    expectedYield: 0.0,
  },
];

export const mockPnlSeries: PnlPoint[] = [
  {
    date: '2024-01-01',
    balance: 10000.0,
    netReturn: 0.0,
  },
  {
    date: '2024-02-01',
    balance: 10250.0,
    netReturn: 0.025,
  },
  {
    date: '2024-03-01',
    balance: 10455.0,
    netReturn: 0.0455,
  },
  {
    date: '2024-04-01',
    balance: 10718.63,
    netReturn: 0.0719,
  },
  {
    date: '2024-05-01',
    balance: 10500.0,
    netReturn: 0.05,
  },
  {
    date: '2024-06-01',
    balance: 10815.0,
    netReturn: 0.0815,
  },
  {
    date: '2024-07-01',
    balance: 11031.3,
    netReturn: 0.1031,
  },
  {
    date: '2024-08-01',
    balance: 11251.93,
    netReturn: 0.1252,
  },
  {
    date: '2024-09-01',
    balance: 10914.37,
    netReturn: 0.0914,
  },
  {
    date: '2024-10-01',
    balance: 11132.66,
    netReturn: 0.1133,
  },
  {
    date: '2024-11-01',
    balance: 11466.64,
    netReturn: 0.1467,
  },
  {
    date: '2024-12-01',
    balance: 11810.64,
    netReturn: 0.1811,
  },
  {
    date: '2025-01-01',
    balance: 12046.85,
    netReturn: 0.2047,
  },
  {
    date: '2025-02-01',
    balance: 12308.79,
    netReturn: 0.2309,
  },
  {
    date: '2025-03-01',
    balance: 12554.96,
    netReturn: 0.2555,
  },
  {
    date: '2025-04-01',
    balance: 12806.06,
    netReturn: 0.2806,
  },
  {
    date: '2025-05-01',
    balance: 10234.77,
    netReturn: 0.0235,
  },
];

export const mockPortfolio: Portfolio = {
  userId: '1c9bd125-81bc-49ea-a14a-f5af6b6e86ba',
  totalBalance: 10234.77,
  rebalanceFrequencyDays: 90,
  assets: mockPortfolioAssets,
  pnlSeries: mockPnlSeries,
  lastUpdated: '2025-05-02T10:13:57Z',
};

export const mockChatRequest: ChatRequest = {
  message: 'Can we go a bit more aggressive?',
};

export const mockChatResponse: ChatResponse = {
  reply: "Sure! Switching you to the Growth bucket. Here's the updated mix.",
  updatedProfile: {
    ...mockInvestorProfile,
    riskBucket: 'Growth',
    riskScore: 0.65,
    projectedCAGR: 0.085,
    projectedRange: {
      low: 0.045,
      high: 0.125,
    },
  },
  updatedPortfolio: {
    ...mockPortfolio,
    assets: [
      {
        ...mockPortfolioAssets[0],
        weight: 0.6,
      },
      {
        ...mockPortfolioAssets[1],
        weight: 0.25,
      },
      {
        ...mockPortfolioAssets[2],
        weight: 0.15,
      },
    ],
  },
};

export const mockHealthResponse: HealthResponse = {
  status: 'ok',
};
