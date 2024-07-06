import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // You'll need to create this service

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = null;
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/dashboard']); // Navigate to dashboard on successful login
          } else {
            this.error = 'Invalid username or password';
          }
        },
        error: (err) => {
          console.error('Login error', err);
          this.error = 'An error occurred during login. Please try again.';
        }
      });
    } else {
      this.error = 'Please enter both username and password';
    }
  }
}