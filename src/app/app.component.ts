import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main [class.main-content]="showHeader">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .main-content {
        padding-top: 64px;
        min-height: calc(100vh - 64px);
        background-color: #f5f5f5;
      }
    `,
  ],
})
export class AppComponent {
  showHeader = false;

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEnd = event as NavigationEnd;
        this.showHeader = !navigationEnd.url.includes('/sign-in');
      });
  }
}
