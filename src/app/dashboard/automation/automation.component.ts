import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="automation-container">
      <div class="page-header">
        <h2 class="page-title">Görüşlərin Avtomatikləşdirilməsi</h2>
        <p class="page-subtitle">Avtomatik görüş sistemini konfiqurasiya edin</p>
      </div>
      
      <div class="automation-content">
        <div class="feature-card">
          <h3><i class="fas fa-robot"></i> Avtomatik Təsdiq</h3>
          <p>Görüşləri avtomatik təsdiq etmə</p>
          <label class="switch">
            <input type="checkbox" checked>
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .automation-container {
      .page-header { margin-bottom: 2rem; .page-title { font-size: 1.875rem; font-weight: 700; color: var(--gray-900); margin: 0 0 0.5rem 0; } .page-subtitle { color: var(--gray-600); margin: 0; } }
      .feature-card { background: white; border-radius: var(--radius-xl); padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); display: flex; justify-content: space-between; align-items: center;
        h3 { display: flex; align-items: center; gap: 0.5rem; margin: 0; }
      }
      .switch { position: relative; display: inline-block; width: 60px; height: 34px;
        input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px;
          &:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
        }
        input:checked + .slider { background-color: var(--primary-600); }
        input:checked + .slider:before { transform: translateX(26px); }
      }
    }
  `]
})
export class AutomationComponent {}