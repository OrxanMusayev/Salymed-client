import { Component, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

interface ClinicInfo {
  name: string;
  type: string;
  licenseNumber: string;
  establishedDate: string;
  phone: string;
  email: string;
  website: string;
  emergencyPhone: string;
  address: string;
  city: string;
  postalCode: string;
  services: ClinicService[];
}

interface ClinicService {
  name: string;
  price: number;
}

interface WorkingDay {
  dayName: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  timestamp: Date;
}

@Component({
  selector: 'app-clinic-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinic-info.component.html',
  styleUrls: ['./clinic-info.component.scss']
})
export class ClinicInfoComponent implements OnDestroy {
  isEditing = false;
  isSaving = false;
  isLoading = false;

  clinicInfo: ClinicInfo = {
    name: 'Salymed Tibb Mərkəzi',
    type: 'general',
    licenseNumber: 'LIC-2024-001',
    establishedDate: '2020-01-15',
    phone: '+994 12 555 01 02',
    email: 'info@salymed.az',
    website: 'https://www.salymed.az',
    emergencyPhone: '+994 50 555 01 02',
    address: 'Nizami küç. 123, Yasamal rayonu',
    city: 'Bakı',
    postalCode: 'AZ1000',
    services: [
      { name: 'Ümumi müayinə', price: 50 },
      { name: 'Kardioloji müayinə', price: 80 },
      { name: 'Laborator analiz', price: 25 },
      { name: 'EKQ', price: 30 }
    ]
  };

  originalClinicInfo: ClinicInfo = JSON.parse(JSON.stringify(this.clinicInfo));

  workingHours: WorkingDay[] = [
    { dayName: 'Bazar ertəsi', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayName: 'Çərşənbə axşamı', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayName: 'Çərşənbə', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayName: 'Cümə axşamı', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayName: 'Cümə', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayName: 'Şənbə', isOpen: true, openTime: '10:00', closeTime: '16:00' },
    { dayName: 'Bazar', isOpen: false, openTime: '', closeTime: '' }
  ];

  // Statistics
  doctorCount = 8;
  monthlyAppointments = 245;
  clinicRating = 4.8;
  patientCount = 1520;

  recentUpdates: ActivityItem[] = [
    {
      id: '1',
      title: 'Xidmət qiymətləri yeniləndi',
      description: 'Laborator analiz qiymətləri güncəlləndi',
      icon: 'fas fa-money-bill',
      timestamp: new Date('2024-09-14T10:30:00')
    },
    {
      id: '2',
      title: 'İş saatları dəyişdirildi',
      description: 'Şənbə günü iş saatları qısaldıldı',
      icon: 'fas fa-clock',
      timestamp: new Date('2024-09-12T15:45:00')
    },
    {
      id: '3',
      title: 'Yeni xidmət əlavə edildi',
      description: 'Dermatoloji müayinə xidməti əlavə edildi',
      icon: 'fas fa-plus-circle',
      timestamp: new Date('2024-09-10T09:15:00')
    },
    {
      id: '4',
      title: 'Əlaqə məlumatları yeniləndi',
      description: 'Təcili telefon nömrəsi dəyişdirildi',
      icon: 'fas fa-phone',
      timestamp: new Date('2024-09-08T14:20:00')
    }
  ];

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
      this.originalClinicInfo = JSON.parse(JSON.stringify(this.clinicInfo));
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.clinicInfo = JSON.parse(JSON.stringify(this.originalClinicInfo));
  }

  async saveChanges() {
    if (this.isSaving) return;

    this.isSaving = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update original clinic info
      this.originalClinicInfo = JSON.parse(JSON.stringify(this.clinicInfo));
      this.isEditing = false;
      
      // Add activity
      this.recentUpdates.unshift({
        id: Date.now().toString(),
        title: 'Klinik məlumatları yeniləndi',
        description: 'Klinik məlumatları yadda saxlanıldı',
        icon: 'fas fa-edit',
        timestamp: new Date()
      });

      // Show success message (you can implement a toast service)
      console.log('Clinic info updated successfully!');
      
    } catch (error) {
      console.error('Error updating clinic info:', error);
      // Revert changes
      this.clinicInfo = JSON.parse(JSON.stringify(this.originalClinicInfo));
    } finally {
      this.isSaving = false;
    }
  }

  addService() {
    this.clinicInfo.services.push({ name: '', price: 0 });
  }

  removeService(index: number) {
    this.clinicInfo.services.splice(index, 1);
  }
}