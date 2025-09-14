import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  };

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  goToPricing() {
    this.router.navigate(['/pricing']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    console.log('Contact form submitted:', this.contactForm);
    // Burada form verilerini backend'e gönderebilirsiniz
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
    this.resetForm();
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    };
  }
}
