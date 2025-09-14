import { Component, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  maxDoctors: number;
  recommended?: boolean;
}

interface UsageStats {
  doctors: number;
  appointments: number;
  reports: number;
  storage: number;
}

interface BillingInvoice {
  id: string;
  date: Date;
  planName: string;
  amount: number;
  status: 'paid' | 'failed' | 'pending';
}

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
}

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnDestroy {
  currentPlan: SubscriptionPlan = {
    id: 'premium',
    name: 'Premium Plan',
    price: 135,
    description: 'Böyük klinikler üçün tam xüsusiyyətli plan',
    features: [
      'Sınırsız həkim qeydiyyatı',
      'Təkmil randevu sistemi',
      'AI asistan dəstəyi',
      'Xüsusi hesabatlar',
      '24/7 dəstək xidməti',
      'API inteqrasiyası',
      'Çoxdilli dəstək',
      'Bulud saxlama'
    ],
    maxDoctors: 999
  };

  availablePlans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Baza Plan',
      price: 29,
      description: 'Kiçik klinikler üçün ideal',
      features: [
        '5 həkim',
        'Əsas randevu sistemi',
        'Sadə hesabatlar',
        'E-poçt dəstəyi'
      ],
      maxDoctors: 5
    },
    {
      id: 'professional',
      name: 'Professional Plan',
      price: 79,
      description: 'Orta ölçülü klinikler üçün',
      features: [
        '20 həkim',
        'Qabaqcıl randevu sistemi',
        'Detallı hesabatlar',
        'Telefon dəstəyi',
        'Məlumat analizi'
      ],
      maxDoctors: 20,
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 135,
      description: 'Böyük klinikler üçün tam xüsusiyyətli plan',
      features: [
        'Sınırsız həkim qeydiyyatı',
        'Təkmil randevu sistemi',
        'AI asistan dəstəyi',
        'Xüsusi hesabatlar',
        '24/7 dəstək xidməti',
        'API inteqrasiyası',
        'Çoxdilli dəstək',
        'Bulud saxlama'
      ],
      maxDoctors: 999
    }
  ];

  usageStats: UsageStats = {
    doctors: 12,
    appointments: 1247,
    reports: 89,
    storage: 75
  };

  billingHistory: BillingInvoice[] = [
    {
      id: 'inv-001',
      date: new Date('2024-01-15'),
      planName: 'Premium Plan',
      amount: 135,
      status: 'paid'
    },
    {
      id: 'inv-002',
      date: new Date('2023-12-15'),
      planName: 'Premium Plan',
      amount: 135,
      status: 'paid'
    },
    {
      id: 'inv-003',
      date: new Date('2023-11-15'),
      planName: 'Professional Plan',
      amount: 79,
      status: 'paid'
    }
  ];

  showAllPlans = false;
  showPaymentModal = false;
  paymentMode: 'existing' | 'new' = 'existing';
  nextPaymentDate = new Date('2024-02-15');
  
  paymentForm: PaymentForm = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  };

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  upgradePlan(): void {
    this.showAllPlans = true;
  }

  changePlan(): void {
    this.showAllPlans = true;
  }

  openPaymentModal(): void {
    this.paymentMode = 'existing';
    this.showPaymentModal = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  savePaymentMethod(): void {
    console.log('Ödəmə metodu saxlanır:', this.paymentForm);
    this.closePaymentModal();
  }

  selectPlan(plan: SubscriptionPlan): void {
    if (plan.id !== this.currentPlan.id) {
      console.log('Plan seçildi:', plan.name);
    }
  }

  downloadInvoices(): void {
    console.log('Bütün fatkuralar yüklənir...');
  }

  downloadInvoice(invoiceId: string): void {
    console.log('Faktura yüklənir:', invoiceId);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'paid': return 'Ödənilib';
      case 'failed': return 'Uğursuz';
      case 'pending': return 'Gözləyir';
      default: return 'Naməlum';
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }
}
