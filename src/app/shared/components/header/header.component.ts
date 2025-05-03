import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { UserProfile } from '../../../shared/interfaces/api.interface';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    RouterModule,
  ],
  template: `
    <mat-toolbar *ngIf="showHeader" color="primary" class="header">
      <span class="logo" routerLink="/">bunq Rebalancer</span>
      <span class="spacer"></span>
      <p class="user-name">
        Hi, {{ userProfile?.firstName }} {{ userProfile?.lastName }}
      </p>
      <!-- <button
        mat-icon-button
        [matMenuTriggerFor]="userMenu"
        class="user-menu-button"
      >
        <img
          [src]="userProfile?.avatarUrl || 'assets/images/default-avatar.svg'"
          alt="User avatar"
          class="user-avatar"
        />
      </button>
      <mat-menu #userMenu="matMenu">
        <div class="user-info"></div>
        <mat-divider></mat-divider>
        <button mat-menu-item routerLink="/profile">
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-menu-item routerLink="/settings">
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item (click)="logout()">
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu> -->
    </mat-toolbar>
  `,
  styles: [
    `
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        height: 64px;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: 500;
        cursor: pointer;
        text-decoration: none;
        color: white;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .user-menu-button {
        margin-right: 16px;
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid white;
      }

      .user-info {
        padding: 16px;
        text-align: center;
      }

      .user-name {
        margin: 0;
        font-weight: 500;
      }

      mat-divider {
        margin: 8px 0;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  userProfile: UserProfile | null = null;
  showHeader = false;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEnd = event as NavigationEnd;
        this.showHeader = !navigationEnd.url.includes('/sign-in');
      });

    if (!this.router.url.includes('/sign-in')) {
      this.loadUserProfile();
    }
  }

  private loadUserProfile(): void {
    this.http
      .get<UserProfile>(
        'https://bunq-hackathon-billowing-water-3051.fly.dev/api/v1/me'
      )
      .subscribe({
        next: (profile) => {
          this.userProfile = profile;
        },
        error: (error) => {
          console.error('Error loading user profile:', error);
        },
      });
  }

  logout(): void {
    // Implement logout logic here
    console.log('Logout clicked');
  }
}
