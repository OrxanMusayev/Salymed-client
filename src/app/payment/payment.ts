import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss']
})
export class PaymentComponent {
  // Registration data
  clinicData: any = null;
  adminData: any = null;
  subscriptionData: any = null;

  // Payment form data
  selectedPaymentMethod = 'credit-card';
  
  paymentMethods: PaymentMethod[] = [
    { id: 'credit-card', name: 'Kredi Kartı', icon: 'fas fa-credit-card' },
    { id: 'bank-transfer', name: 'Banka Havalesi', icon: 'fas fa-university' },
    { id: 'digital-wallet', name: 'Dijital Cüzdan', icon: 'fas fa-wallet' }
  ];

  // Credit card form
  cardForm = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardHolderName: ''
  };

  // Invoice form
  invoiceForm = {
    companyName: '',
    taxNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Türkiye'
  };

  // Processing state
  isProcessing = false;

  constructor(private router: Router) {
    // Get data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.clinicData = navigation.extras.state['clinicData'];
      this.adminData = navigation.extras.state['adminData'];
      this.subscriptionData = navigation.extras.state['subscriptionData'];
    }

    // Initialize invoice form with clinic data
    if (this.clinicData) {
      this.invoiceForm.companyName = this.clinicData.clinicName;
      this.invoiceForm.address = this.clinicData.address;
    }
  }

  selectPaymentMethod(methodId: string) {
    this.selectedPaymentMethod = methodId;
  }

  goBack() {
    this.router.navigate(['/subscription-selection'], {
      state: { 
        clinicData: this.clinicData,
        adminData: this.adminData
      }
    });
  }

  formatCardNumber(value: string): string {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  }

  onCardNumberInput(event: any) {
    const input = event.target;
    const formattedValue = this.formatCardNumber(input.value);
    input.value = formattedValue;
    this.cardForm.cardNumber = formattedValue;
  }

  async processPayment() {
    this.isProcessing = true;

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Navigate to success page or dashboard
      this.router.navigate(['/registration-complete'], {
        state: {
          clinicData: this.clinicData,
          adminData: this.adminData,
          subscriptionData: this.subscriptionData,
          paymentData: {
            method: this.selectedPaymentMethod,
            amount: this.subscriptionData?.price,
            invoice: this.invoiceForm
          }
        }
      });
    } catch (error) {
      console.error('Payment failed:', error);
      this.isProcessing = false;
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  getCardTypeIcon(cardNumber: string): string {
    const number = cardNumber.replace(/\s/g, '');
    
    if (number.startsWith('4')) {
      return 'fab fa-cc-visa';
    } else if (number.startsWith('5') || number.startsWith('2')) {
      return 'fab fa-cc-mastercard';
    } else if (number.startsWith('3')) {
      return 'fab fa-cc-amex';
    }
    
    return 'fas fa-credit-card';
  }

  calculateTax(): number {
    if (!this.subscriptionData) return 0;
    return Math.round(this.subscriptionData.price * 0.18); // 18% KDV
  }

  calculateTotal(): number {
    if (!this.subscriptionData) return 0;
    return this.subscriptionData.price + this.calculateTax();
  }
}