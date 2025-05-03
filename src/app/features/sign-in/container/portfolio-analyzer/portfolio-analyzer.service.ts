import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Portfolio,
  InvestorProfile,
  ChatRequest,
  ChatResponse,
  Pnl,
} from '../../../../shared/interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class PortfolioAnalyzerService {
  private readonly baseUrl =
    'https://bunq-hackathon-billowing-water-3051.fly.dev/api/v1';

  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches the current portfolio data
   * @returns Observable of Portfolio data
   */
  getPortfolio(): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.baseUrl}/portfolio`);
  }

  /**
   * Fetches the investor profile data
   * @returns Observable of InvestorProfile data
   */
  getInvestorProfile(): Observable<InvestorProfile> {
    return this.http.get<InvestorProfile>(`${this.baseUrl}/investor-profile`);
  }

  /**
   * Fetches the PnL data
   * @returns Observable of Pnl data
   */
  getPnl(): Observable<Pnl> {
    return this.http.get<Pnl>(`${this.baseUrl}/pnl`);
  }

  /**
   * Sends a chat message to the AI assistant
   * @param message The message to send
   * @returns Observable of ChatResponse
   */
  sendChatMessage(message: string): Observable<ChatResponse> {
    const request: ChatRequest = { message };
    return this.http.post<ChatResponse>(`${this.baseUrl}/chat`, request);
  }
}
