import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { COUNTRIES, Country } from '../shared/countries';

@Component({
  selector: 'app-clinic-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinic-registration.html',
  styleUrls: ['./clinic-registration.scss']
})
export class ClinicRegistrationComponent {
  countries = COUNTRIES;
  selectedCountry: Country = this.countries.find(c => c.code === 'AZ') || this.countries[0];
  isCountryDropdownOpen = false;
  
  currentStep = 1; // 1 veya 2
  
  // Klinik bilgileri (Adım 1)
  clinicData = {
    clinicName: '',
    address: '',
    phone: '',
    email: ''
  };
  
  // Admin bilgileri (Adım 2)
  adminData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  toggleCountryDropdown() {
    this.isCountryDropdownOpen = !this.isCountryDropdownOpen;
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.isCountryDropdownOpen = false;
  }

  onPhoneKeyPress(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    
    if (allowedKeys.includes(event.key)) {
      return;
    }
    
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  goBack() {
    if (this.currentStep === 1) {
      this.router.navigate(['/']);
    } else {
      this.currentStep = 1;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nextStep() {
    if (this.currentStep === 1 && this.isStep1Valid()) {
      this.currentStep = 2;
    }
  }

  passwordsMatch(): boolean {
    return this.adminData.password === this.adminData.confirmPassword;
  }

  completeRegistration() {
    if (this.isStep2Valid() && this.passwordsMatch()) {
      const registrationData = {
        clinic: {
          clinicName: this.clinicData.clinicName,
          address: this.clinicData.address,
          phone: `${this.selectedCountry.dialCode}${this.clinicData.phone}`,
          email: this.clinicData.email
        },
        admin: {
          firstName: this.adminData.firstName,
          lastName: this.adminData.lastName,
          email: this.adminData.email,
          password: this.adminData.password
        }
      };

      console.log('Registration completed:', registrationData);

      this.router.navigate(['/subscription-selection'], {
        state: { registrationData }
      });
    }
  }

  isStep1Valid(): boolean {
    return !!(
      this.clinicData.clinicName &&
      this.clinicData.address &&
      this.clinicData.phone &&
      this.clinicData.email &&
      this.isEmailValid(this.clinicData.email)
    );
  }

  isStep2Valid(): boolean {
    return !!(
      this.adminData.firstName &&
      this.adminData.lastName &&
      this.adminData.email &&
      this.adminData.password &&
      this.adminData.confirmPassword &&
      this.isEmailValid(this.adminData.email) &&
      this.adminData.password.length >= 6
    );
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
