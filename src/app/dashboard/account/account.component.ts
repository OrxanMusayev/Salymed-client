import { Component, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  joinDate: Date;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnDestroy {
  isEditing = false;
  isSaving = false;
  isLoading = false;
  isChangingPassword = false;
  isPasswordSaving = false;
  lastPasswordChange = new Date('2024-08-15');

  userProfile: UserProfile = {
    firstName: 'Orxan',
    lastName: 'Musayev',
    email: 'orxan@salymed.com',
    phone: '+994 50 123 45 67',
    role: 'admin',
    joinDate: new Date('2023-01-15')
  };

  passwordData: PasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  originalProfile: UserProfile = { ...this.userProfile };

  private clickListener?: () => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.setupClickOutside();
    }
  }

  ngOnDestroy() {
    if (this.clickListener && isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.clickListener);
    }
  }

  private setupClickOutside() {
    this.clickListener = () => {
      // Handle any outside clicks if needed
    };
    document.addEventListener('click', this.clickListener);
  }

  toggleEdit() {
    if (this.isEditing) {
      this.cancelEdit();
    } else {
      this.isEditing = true;
      this.originalProfile = { ...this.userProfile };
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.userProfile = { ...this.originalProfile };
  }

  async saveChanges() {
    if (this.isSaving) return;

    this.isSaving = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update original profile
      this.originalProfile = { ...this.userProfile };
      this.isEditing = false;

      // Show success message (you can implement a toast service)
      console.log('Profile updated successfully!');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      // Revert changes
      this.userProfile = { ...this.originalProfile };
    } finally {
      this.isSaving = false;
    }
  }

  changePassword() {
    // Köhnə method - artıq istifadə olunmur
    this.startPasswordChange();
  }

  startPasswordChange() {
    this.isChangingPassword = true;
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  cancelPasswordChange() {
    this.isChangingPassword = false;
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  async savePasswordChange() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('Yeni şifrələr uyğun gəlmir!');
      return;
    }

    if (this.passwordData.newPassword.length < 6) {
      alert('Şifrə ən azı 6 simvol olmalıdır!');
      return;
    }

    this.isPasswordSaving = true;
    
    try {
      // Simulyasiya - API çağırışı
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.lastPasswordChange = new Date();
      this.isChangingPassword = false;
      this.passwordData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
      
      alert('Şifrə uğurla dəyişdirildi!');
    } catch (error) {
      alert('Şifrə dəyişdirilməsində xəta baş verdi!');
    } finally {
      this.isPasswordSaving = false;
    }
  }

  getAvatarColor(): string {
    const colors = [
      'var(--primary)',
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#DDA0DD',
      '#98D8C8'
    ];
    const name = this.userProfile.firstName + this.userProfile.lastName;
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }
}