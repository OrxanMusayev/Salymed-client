import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginData = {
    email: '',
    password: ''
  };
  
  showPassword = false;
  rememberMe = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      if (this.loginData.email === 'admin@salymed.com' && this.loginData.password === 'admin123') {
        // Success - navigate to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'E-posta veya şifre hatalı';
      }
      this.isLoading = false;
    }, 1500);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    // Navigate to register page (when implemented)
    console.log('Navigate to register');
  }
}
