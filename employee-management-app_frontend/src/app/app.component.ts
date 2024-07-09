import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  title = 'employee-management-app';
  logClick(route: string) {
    console.log(`Clicked ${route}`);
  }
  getCurrentUser(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.username : '';
  }
}