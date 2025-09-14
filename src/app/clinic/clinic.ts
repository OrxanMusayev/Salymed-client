import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ClinicData {
  id?: number;
  name: string;
  description?: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  ownerId?: number;
}

@Component({
  selector: 'app-clinic',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './clinic.html',
  styleUrls: ['./clinic.scss']
})
export class Clinic implements OnInit {
  clinics: ClinicData[] = [];
  filteredClinics: ClinicData[] = [];
  searchTerm = '';
  statusFilter = '';
  isLoading = false;
  isDeleting = false;
  isSaving = false;
  
  // Modal states
  showModal = false;
  isEditMode = false;
  currentClinic: Partial<ClinicData> = {};

  ngOnInit() {
    this.loadClinics();
  }

  loadClinics() {
    this.isLoading = true;
    
    // Simulate API call with mock data
    setTimeout(() => {
      this.clinics = [
        {
          id: 1,
          name: 'Merkez Klinik',
          description: 'Ana merkez klinik şubemiz. Tüm sağlık hizmetleri burada verilmektedir.',
          address: 'Atatürk Bulvarı No:123 Merkez/Ankara',
          phoneNumber: '(312) 123-4567',
          email: 'merkez@salymed.com',
          website: 'https://www.salymed.com',
          city: 'Ankara',
          state: 'Ankara',
          zipCode: '06000',
          isActive: true,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-03-10T14:20:00Z'
        },
        {
          id: 2,
          name: 'Bahçelievler Şubesi',
          description: 'Bahçelievler bölgesindeki modern klinik şubemiz.',
          address: 'Bahçelievler Mahallesi Eskişehir Yolu No:45',
          phoneNumber: '(312) 987-6543',
          email: 'bahcelievler@salymed.com',
          city: 'Ankara',
          state: 'Ankara',
          isActive: true,
          createdAt: '2024-02-20T09:15:00Z'
        },
        {
          id: 3,
          name: 'Çankaya Klinik',
          description: 'Çankaya ilçesindeki uzman doktor kliniği.',
          address: 'Çankaya Caddesi No:78 Çankaya/Ankara',
          phoneNumber: '(312) 555-0123',
          email: 'cankaya@salymed.com',
          city: 'Ankara',
          isActive: false,
          createdAt: '2023-12-05T16:45:00Z'
        }
      ];
      
      this.filteredClinics = [...this.clinics];
      this.isLoading = false;
    }, 1000);
  }

  refreshClinics() {
    this.loadClinics();
  }

  filterClinics() {
    this.filteredClinics = this.clinics.filter(clinic => {
      const matchesSearch = clinic.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           clinic.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           (clinic.city && clinic.city.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesStatus = !this.statusFilter || 
                           (this.statusFilter === 'active' && clinic.isActive) ||
                           (this.statusFilter === 'inactive' && !clinic.isActive);
      
      return matchesSearch && matchesStatus;
    });
  }

  openAddClinicModal() {
    this.isEditMode = false;
    this.currentClinic = {
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
      website: '',
      city: '',
      state: '',
      zipCode: '',
      description: '',
      isActive: true
    };
    this.showModal = true;
  }

  editClinic(clinic: ClinicData) {
    this.isEditMode = true;
    this.currentClinic = { ...clinic };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentClinic = {};
    this.isEditMode = false;
  }

  saveClinic() {
    this.isSaving = true;
    
    // Simulate API call
    setTimeout(() => {
      if (this.isEditMode) {
        // Update existing clinic
        const index = this.clinics.findIndex(c => c.id === this.currentClinic.id);
        if (index !== -1) {
          this.clinics[index] = {
            ...this.clinics[index],
            ...this.currentClinic,
            updatedAt: new Date().toISOString()
          } as ClinicData;
        }
      } else {
        // Add new clinic
        const newClinic: ClinicData = {
          ...this.currentClinic,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          isActive: true
        } as ClinicData;
        
        this.clinics.push(newClinic);
      }
      
      this.filterClinics();
      this.closeModal();
      this.isSaving = false;
    }, 1500);
  }

  deleteClinic(clinic: ClinicData) {
    if (confirm(`"${clinic.name}" kliniğini silmek istediğinizden emin misiniz?`)) {
      this.isDeleting = true;
      
      // Simulate API call
      setTimeout(() => {
        this.clinics = this.clinics.filter(c => c.id !== clinic.id);
        this.filterClinics();
        this.isDeleting = false;
      }, 1000);
    }
  }

  viewClinicDetails(clinic: ClinicData) {
    // Navigate to clinic details page or show details modal
    console.log('View clinic details:', clinic);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
