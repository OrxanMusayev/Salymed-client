import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-selection.html',
  styleUrls: ['./subscription-selection.scss']
})
export class SubscriptionSelectionComponent {
  selectedPlan: string | null = null;

  constructor(private router: Router) {}

  selectPlan(planId: string) {
    this.selectedPlan = planId;
    // Otomatik olarak ödeme sayfasına yönlendir
    setTimeout(() => {
      this.proceedToPayment();
    }, 300); // Kısa bir gecikme ile görsel geri bildirim sağla
  }

  getSelectedPlanName(): string {
    switch(this.selectedPlan) {
      case 'basic': return 'Başlangıç';
      case 'standard': return 'Standart';  
      case 'premium': return 'Premium';
      default: return '';
    }
  }

  getSelectedPlanPrice(): number {
    switch(this.selectedPlan) {
      case 'basic': return 45;
      case 'standard': return 85;
      case 'premium': return 135;
      default: return 0;
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/clinic-registration']);
  }

  proceedToPayment() {
    if (!this.selectedPlan) return;

    this.router.navigate(['/payment'], {
      state: { 
        selectedPlan: this.selectedPlan
      }
    });
  }
}
