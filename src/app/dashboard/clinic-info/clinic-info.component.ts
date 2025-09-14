import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clinic-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="clinic-info-container">
      <div class="page-header">
        <h2 class="page-title">Klinik Məlumatları</h2>
        <p class="page-subtitle">Klinik məlumatlarınızı idarə edin</p>
      </div>
      
      <div class="clinic-content">
        <div class="info-card">
          <h3><i class="fas fa-hospital"></i> Klinik Məlumatları</h3>
          <p>Klinik adı, ünvan və əlaqə məlumatları</p>
          <button class="btn btn-primary">Redaktə Et</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .clinic-info-container {
      .page-header {
        margin-bottom: 2rem;
        .page-title { font-size: 1.875rem; font-weight: 700; color: var(--gray-900); margin: 0 0 0.5rem 0; }
        .page-subtitle { color: var(--gray-600); margin: 0; }
      }
      .info-card {
        background: white; border-radius: var(--radius-xl); padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        h3 { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: var(--radius-lg); font-weight: 600; cursor: pointer; background: var(--primary-600); color: white; }
      }
    }
  `]
})
export class ClinicInfoComponent {}