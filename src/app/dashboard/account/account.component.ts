import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="account-container">
      <div class="page-header">
        <h2 class="page-title">Hesabım</h2>
        <p class="page-subtitle">Şəxsi məlumatlarınızı idarə edin</p>
      </div>
      
      <div class="account-content">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <i class="fas fa-user"></i>
            </div>
            <div class="profile-info">
              <h3>Admin User</h3>
              <p>admin@salymed.com</p>
            </div>
          </div>
          <div class="profile-actions">
            <button class="btn btn-primary">Profili Redaktə Et</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .account-container {
      .page-header {
        margin-bottom: 2rem;
        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--gray-900);
          margin: 0 0 0.5rem 0;
        }
        .page-subtitle {
          color: var(--gray-600);
          margin: 0;
        }
      }
      
      .profile-card {
        background: white;
        border-radius: var(--radius-xl);
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        
        .profile-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          
          .profile-avatar {
            width: 4rem;
            height: 4rem;
            background: var(--primary-500);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
          }
          
          .profile-info h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.5rem;
            font-weight: 600;
          }
          
          .profile-info p {
            margin: 0;
            color: var(--gray-600);
          }
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          
          &.btn-primary {
            background: var(--primary-600);
            color: white;
            
            &:hover {
              background: var(--primary-700);
              transform: translateY(-1px);
            }
          }
        }
      }
    }
  `]
})
export class AccountComponent {}