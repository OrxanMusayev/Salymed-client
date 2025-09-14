import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="subscription-container">
      <div class="page-header">
        <h2 class="page-title">Abunəliyim</h2>
        <p class="page-subtitle">Abunəlik planınızı idarə edin</p>
      </div>
      
      <div class="subscription-content">
        <div class="plan-card active">
          <h3><i class="fas fa-crown"></i> Premium Plan</h3>
          <p>Aktiv plan - ₼50/ay</p>
          <button class="btn btn-secondary">Planı Dəyiş</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .subscription-container {
      .page-header { margin-bottom: 2rem; .page-title { font-size: 1.875rem; font-weight: 700; color: var(--gray-900); margin: 0 0 0.5rem 0; } .page-subtitle { color: var(--gray-600); margin: 0; } }
      .plan-card { background: white; border-radius: var(--radius-xl); padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border-left: 4px solid var(--success-500);
        h3 { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; color: var(--success-600); }
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: var(--radius-lg); font-weight: 600; cursor: pointer; }
        .btn-secondary { background: var(--gray-600); color: white; }
      }
    }
  `]
})
export class SubscriptionComponent {}