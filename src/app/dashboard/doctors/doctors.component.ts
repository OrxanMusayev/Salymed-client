import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="doctors-container">
      <div class="page-header">
        <h2 class="page-title">Həkimlər</h2>
        <p class="page-subtitle">Klinikdəki həkimləri idarə edin</p>
      </div>
      
      <div class="doctors-content">
        <div class="doctors-grid">
          <div class="doctor-card" *ngFor="let doctor of doctors">
            <div class="doctor-avatar">
              <i class="fas fa-user-md"></i>
            </div>
            <div class="doctor-info">
              <h4>{{ doctor.name }}</h4>
              <p>{{ doctor.specialty }}</p>
              <span class="status" [class]="doctor.status">{{ doctor.statusText }}</span>
            </div>
          </div>
        </div>
        
        <button class="add-doctor-btn">
          <i class="fas fa-plus"></i>
          Həkim Əlavə Et
        </button>
      </div>
    </div>
  `,
  styles: [`
    .doctors-container {
      .page-header { margin-bottom: 2rem; .page-title { font-size: 1.875rem; font-weight: 700; color: var(--gray-900); margin: 0 0 0.5rem 0; } .page-subtitle { color: var(--gray-600); margin: 0; } }
      .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
      .doctor-card { background: white; border-radius: var(--radius-xl); padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); text-align: center;
        .doctor-avatar { width: 4rem; height: 4rem; background: var(--primary-100); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: var(--primary-600); font-size: 1.5rem; }
        h4 { margin: 0 0 0.5rem 0; font-weight: 600; }
        p { margin: 0 0 1rem 0; color: var(--gray-600); }
        .status { padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600;
          &.active { background: var(--success-100); color: var(--success-700); }
          &.inactive { background: var(--gray-100); color: var(--gray-700); }
        }
      }
      .add-doctor-btn { background: var(--primary-600); color: white; border: none; padding: 1rem 2rem; border-radius: var(--radius-lg); font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; margin: 0 auto; }
    }
  `]
})
export class DoctorsComponent {
  doctors = [
    { name: 'Dr. Şəhriyar Məmmədov', specialty: 'Kardioloq', status: 'active', statusText: 'Aktiv' },
    { name: 'Dr. Nigar Əliyeva', specialty: 'Nevroloq', status: 'active', statusText: 'Aktiv' },
    { name: 'Dr. Rəşad Həsənov', specialty: 'Ortoped', status: 'inactive', statusText: 'Passiv' }
  ];
}