import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { COUNTRIES, Country } from '../shared/countries';

@Component({
  selector: 'app-admin-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-info.html',
  styleUrls: ['./admin-info.scss']
})
export class AdminInfoComponent {
  countries = COUNTRIES;
  selectedCountry: Country = this.countries.find(c => c.code === 'AZ') || this.countries[0];
  isCountryDropdownOpen = false;
  
  // Form fields
  firstName = '';
  lastName = '';
  phoneNumber = '';
  email = '';

  constructor(private router: Router) {}

  toggleCountryDropdown() {
    this.isCountryDropdownOpen = !this.isCountryDropdownOpen;
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.isCountryDropdownOpen = false;
  }

  onPhoneKeyPress(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 
                        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    
    if (allowedKeys.includes(event.key) || 
        (event.key >= '0' && event.key <= '9')) {
      return true;
    }
    
    event.preventDefault();
    return false;
  }

  goBack() {
    this.router.navigate(['/register']);
  }

  proceedToSubscription() {
    if (!this.isFormValid()) return;

    this.router.navigate(['/subscription-selection'], {
      state: {
        adminData: {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: `${this.selectedCountry.dialCode}${this.phoneNumber}`,
          email: this.email
        }
      }
    });
  }

  isFormValid(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.phoneNumber.trim() !== '' &&
      this.email.trim() !== '' &&
      this.isEmailValid()
    );
  }

  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}
