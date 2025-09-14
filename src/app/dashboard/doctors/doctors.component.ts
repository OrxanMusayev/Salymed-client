import { Component, HostListener, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnDestroy {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/doctors'; // Backend API URL
  doctors: any[] = [
    { 
      id: '1',
      firstName: 'Şəhriyar', 
      lastName: 'Məmmədov', 
      specialty: 'Kardioloq', 
      email: 'sehriyar@clinic.az',
      phone: '+994 50 123 45 67',
      yearsExperience: 12, 
      age: 43,
      gender: 'Erkek',
      workingHours: '09:00-17:00',
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8
    },
    { 
      id: '2',
      firstName: 'Nigar', 
      lastName: 'Əliyeva', 
      specialty: 'Nevroloq', 
      email: 'nigar@clinic.az',
      phone: '+994 50 234 56 78',
      yearsExperience: 8, 
      age: 37,
      gender: 'Kadın',
      workingHours: '10:00-18:00',
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1594824804732-5aa9c565744d?w=150&h=150&fit=crop&crop=face',
      rating: 4.6
    },
    { 
      id: '3',
      firstName: 'Rəşad', 
      lastName: 'Həsənov', 
      specialty: 'Ortoped', 
      email: 'reshad@clinic.az',
      phone: '+994 50 345 67 89',
      yearsExperience: 16, 
      age: 45,
      gender: 'Erkek',
      workingHours: '08:00-16:00',
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      rating: 4.9
    },
    { 
      id: '4',
      firstName: 'Leyla', 
      lastName: 'Qasımova', 
      specialty: 'Dermatoloq', 
      email: 'leyla@clinic.az',
      phone: '+994 50 456 78 90',
      yearsExperience: 5, 
      age: 32,
      gender: 'Kadın',
      workingHours: '09:00-17:00',
      isActive: false,
      avatarUrl: '',
      rating: 4.3
    }
  ];

  searchTerm: string = '';
  filterSpecialty: string = 'all';
  filterExperience: string = 'all';
  filterRating: string = 'all';
  specialties: string[] = ['Kardioloq', 'Nevroloq', 'Ortoped', 'Dermatoloq', 'Pediatr', 'Ginekolog'];
  experienceRanges = [
    { value: 'all', label: 'Tümü' },
    { value: '1-5', label: '1-5 il' },
    { value: '6-10', label: '6-10 il' },
    { value: '11-20', label: '11-20 il' },
    { value: '20+', label: '20+ il' }
  ];
  ratingRanges = [
    { value: 'all', label: 'Tümü' },
    { value: '4.5+', label: '★★★★★ \u00A0\u00A0\u00A0\u00A0 4.5+' },
    { value: '4.0+', label: '★★★★☆ \u00A0\u00A0\u00A0\u00A0 4.0+' },
    { value: '3.5+', label: '★★★☆☆ \u00A0\u00A0\u00A0\u00A0 3.5+' },
    { value: '3.0+', label: '★★★☆☆ \u00A0\u00A0\u00A0\u00A0 3.0+' },
    { value: '2.0+', label: '★★☆☆☆ \u00A0\u00A0\u00A0\u00A0 2.0+' },
    { value: '1.0+', label: '★☆☆☆☆ \u00A0\u00A0\u00A0\u00A0 1.0+' }
  ];
  filteredDoctors: any[] = [];
  isLoading = false;
  showAddModal = false;
  showEditModal = false;
  isSaving = false;
  selectedDoctor: any = null;
  selectedPhotoFile: string | null = null;
  selectedEditPhotoFile: string | null = null;
  activeDropdown: string | null = null;
  showDeleteModal = false;
  doctorToDelete: any = null;
  
  newDoctor: any = {
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    specialty: '', 
    yearsExperience: undefined, 
    workingHours: '', 
    age: undefined, 
    gender: '', 
    isActive: true,
    avatarUrl: ''
  };

  constructor() {
    // Don't load doctors in constructor, initialize with existing data
    this.applyFilters();
  }

  loadDoctors() {
    // For now, just use the existing mock data without loading state
    this.isLoading = false;
    this.applyFilters();
    console.log('Using existing mock data');

    // Uncomment below for real API implementation when backend is ready:
    /*
    this.isLoading = true;
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
        this.isLoading = false;
        this.applyFilters();
      }
    });
    */
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showAddModal) {
      this.closeAddModal();
    } else if (this.showEditModal) {
      this.closeEditModal();
    } else if (this.showDeleteModal) {
      this.closeDeleteModal();
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.activeDropdown = null;
  }

  applyFilters() {
    const searchLower = this.searchTerm.trim().toLowerCase();
    this.filteredDoctors = this.doctors.filter(doctor => {
      if (this.filterSpecialty !== 'all' && doctor.specialty !== this.filterSpecialty) {
        return false;
      }
      
      // Experience filter
      if (this.filterExperience !== 'all') {
        const experience = doctor.yearsExperience || 0;
        switch (this.filterExperience) {
          case '1-5':
            if (experience < 1 || experience > 5) return false;
            break;
          case '6-10':
            if (experience < 6 || experience > 10) return false;
            break;
          case '11-20':
            if (experience < 11 || experience > 20) return false;
            break;
          case '20+':
            if (experience < 20) return false;
            break;
        }
      }

      // Rating filter
      if (this.filterRating !== 'all') {
        const rating = doctor.rating || 0;
        switch (this.filterRating) {
          case '4.5+':
            if (rating < 4.5) return false;
            break;
          case '4.0+':
            if (rating < 4.0) return false;
            break;
          case '3.5+':
            if (rating < 3.5) return false;
            break;
          case '3.0+':
            if (rating < 3.0) return false;
            break;
          case '2.0+':
            if (rating < 2.0) return false;
            break;
          case '1.0+':
            if (rating < 1.0) return false;
            break;
        }
      }
      
      if (searchLower) {
        const fullText = (doctor.firstName + ' ' + doctor.lastName + ' ' + doctor.specialty + ' ' + doctor.email).toLowerCase();
        return fullText.includes(searchLower);
      }
      
      return true;
    });
  }

  openAddModal() {
    this.showAddModal = true;
    this.resetNewDoctorForm();
    document.body.classList.add('modal-open');
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetNewDoctorForm();
    document.body.classList.remove('modal-open');
  }

  openEditModal(doctor: any) {
    this.selectedDoctor = { ...doctor };
    this.showEditModal = true;
    document.body.classList.add('modal-open');
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedDoctor = null;
    this.selectedEditPhotoFile = null;
    this.activeDropdown = null;
    document.body.classList.remove('modal-open');
  }

  toggleDropdown(doctorId: string, event: Event) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === doctorId ? null : doctorId;
  }

  deleteDoctor(doctor: any, event: Event) {
    event.stopPropagation();
    this.doctorToDelete = doctor;
    this.showDeleteModal = true;
    this.activeDropdown = null;
    document.body.classList.add('modal-open');
  }

  confirmDelete() {
    if (!this.doctorToDelete) return;
    
    this.isSaving = true;
    
    // Mock implementation - immediate delete
    const index = this.doctors.findIndex(d => d.id === this.doctorToDelete.id);
    if (index > -1) {
      this.doctors.splice(index, 1);
      this.filteredDoctors = this.filteredDoctors.filter(d => d.id !== this.doctorToDelete.id);
    }
    
    // Reset states and close modal
    this.isSaving = false;
    this.closeDeleteModal();
    
    console.log('Doctor deleted successfully! (Mock)');

    // Uncomment below for real API implementation when backend is ready:
    /*
    this.http.delete(`${this.apiUrl}/${this.doctorToDelete.id}`).subscribe({
      next: () => {
        const index = this.doctors.findIndex(d => d.id === this.doctorToDelete.id);
        if (index > -1) {
          this.doctors.splice(index, 1);
          this.filteredDoctors = this.filteredDoctors.filter(d => d.id !== this.doctorToDelete.id);
        }
        
        this.isSaving = false;
        this.closeDeleteModal();
        console.log('Doctor deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting doctor:', error);
        this.isSaving = false;
        
        if (error.status === 404) {
          const index = this.doctors.findIndex(d => d.id === this.doctorToDelete.id);
          if (index > -1) {
            this.doctors.splice(index, 1);
            this.filteredDoctors = this.filteredDoctors.filter(d => d.id !== this.doctorToDelete.id);
          }
          this.closeDeleteModal();
        } else {
          alert('Silme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
          this.closeDeleteModal();
        }
      }
    });
    */
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.doctorToDelete = null;
    document.body.classList.remove('modal-open');
  }

  openEditFromDropdown(doctor: any, event: Event) {
    event.stopPropagation();
    this.openEditModal(doctor);
    this.activeDropdown = null;
  }

  resetNewDoctorForm() {
    this.newDoctor = {
      firstName: '', 
      lastName: '', 
      email: '', 
      phone: '', 
      specialty: '', 
      yearsExperience: undefined, 
      workingHours: '', 
      age: undefined, 
      gender: '', 
      isActive: true,
      avatarUrl: ''
    };
    this.selectedPhotoFile = null;
  }

  saveDoctor() {
    if (!this.isFormValid()) return;
    
    this.isSaving = true;
    
    const doctorData = {
      firstName: this.newDoctor.firstName,
      lastName: this.newDoctor.lastName,
      email: this.newDoctor.email,
      phone: this.newDoctor.phone,
      specialty: this.newDoctor.specialty,
      yearsExperience: this.newDoctor.yearsExperience,
      workingHours: this.newDoctor.workingHours,
      age: this.newDoctor.age,
      gender: this.newDoctor.gender,
      isActive: this.newDoctor.isActive,
      avatarUrl: this.selectedPhotoFile || '',
      createdAt: new Date().toISOString()
    };
    
    // Mock implementation - immediate save
    const newDoctor = { id: Date.now().toString(), ...doctorData };
    this.doctors.unshift(newDoctor);
    this.applyFilters();
    
    // Reset states and close modal
    this.isSaving = false;
    this.closeAddModal();
    
    console.log('Doctor created successfully! (Mock)');

    // Uncomment below for real API implementation when backend is ready:
    /*
    this.http.post(this.apiUrl, doctorData).subscribe({
      next: (response: any) => {
        const newDoctor = { id: response.id || Date.now().toString(), ...doctorData };
        this.doctors.unshift(newDoctor);
        this.applyFilters();
        
        this.isSaving = false;
        this.closeAddModal();
        console.log('Doctor created successfully!');
      },
      error: (error) => {
        console.error('Error creating doctor:', error);
        this.isSaving = false;
        
        if (error.status === 400) {
          alert('Geçersiz veri. Lütfen bilgileri kontrol edin.');
        } else {
          alert('Kaydetme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        }
      }
    });
    */
  }

  updateDoctor() {
    if (!this.selectedDoctor) return;
    
    this.isSaving = true;
    
    // Prepare the doctor data - preserve all existing fields and only update the edited ones
    const originalDoctor = this.doctors.find(d => d.id === this.selectedDoctor.id);
    const doctorData = {
      ...originalDoctor, // Keep all original data including rating, createdAt, etc.
      firstName: this.selectedDoctor.firstName,
      lastName: this.selectedDoctor.lastName,
      email: this.selectedDoctor.email,
      phone: this.selectedDoctor.phone,
      specialty: this.selectedDoctor.specialty,
      yearsExperience: this.selectedDoctor.yearsExperience,
      workingHours: this.selectedDoctor.workingHours,
      age: this.selectedDoctor.age,
      gender: this.selectedDoctor.gender,
      isActive: this.selectedDoctor.isActive,
      avatarUrl: this.selectedEditPhotoFile || this.selectedDoctor.avatarUrl,
      updatedAt: new Date().toISOString()
    };

    // Mock implementation - immediate update
    const index = this.doctors.findIndex(d => d.id === this.selectedDoctor.id);
    if (index !== -1) {
      this.doctors[index] = doctorData;
      this.applyFilters();
    }
    
    // Reset states and close modal
    this.isSaving = false;
    this.closeEditModal();
    
    console.log('Doctor updated successfully! (Mock)');

    // Uncomment below for real API implementation when backend is ready:
    /*
    this.http.put(`${this.apiUrl}/${this.selectedDoctor.id}`, doctorData).subscribe({
      next: (response: any) => {
        const index = this.doctors.findIndex(d => d.id === this.selectedDoctor.id);
        if (index !== -1) {
          this.doctors[index] = doctorData; // Use doctorData directly (already contains all original data)
          this.applyFilters();
        }
        
        this.isSaving = false;
        this.closeEditModal();
        console.log('Doctor updated successfully!');
      },
      error: (error) => {
        console.error('Error updating doctor:', error);
        this.isSaving = false;
        
        if (error.status === 404) {
          alert('Doktor bulunamadı.');
        } else if (error.status === 400) {
          alert('Geçersiz veri. Lütfen bilgileri kontrol edin.');
        } else {
          alert('Güncelleme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        }
      }
    });
    */
  }

  toggleDoctorStatus(doctor: any) {
    doctor.isActive = !doctor.isActive;
    this.applyFilters();
  }

  isFormValid(): boolean {
    return !!(this.newDoctor.firstName && 
              this.newDoctor.lastName && 
              this.newDoctor.email && 
              this.newDoctor.phone && 
              this.newDoctor.specialty);
  }

  isEditFormValid(): boolean {
    return !!(this.selectedDoctor?.firstName && 
              this.selectedDoctor?.lastName && 
              this.selectedDoctor?.email && 
              this.selectedDoctor?.phone && 
              this.selectedDoctor?.specialty);
  }

  getInitials(doctor: any): string {
    const first = doctor.firstName?.charAt(0) || '';
    const last = doctor.lastName?.charAt(0) || '';
    return (first + last).toUpperCase();
  }

  getAvatarColor(doctor: any): string {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c', 
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
      '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
    ];
    
    const name = (doctor.firstName + doctor.lastName).toLowerCase();
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  }

  // Photo upload methods
  onPhotoSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handlePhotoFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handlePhotoFile(files[0]);
    }
  }

  handlePhotoFile(file: File) {
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir resim dosyası seçin.');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5MB\'den büyük olamaz.');
      return;
    }

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedPhotoFile = e.target.result;
      this.newDoctor.avatarUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.selectedPhotoFile = null;
    this.newDoctor.avatarUrl = '';
  }

  onEditPhotoSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleEditPhotoFile(file);
    }
  }

  onEditDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleEditPhotoFile(files[0]);
    }
  }

  private handleEditPhotoFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5MB\'dan büyük olamaz.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedEditPhotoFile = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeEditPhoto() {
    this.selectedEditPhotoFile = null;
    this.selectedDoctor.avatarUrl = '';
  }

  ngOnDestroy() {
    // Clean up any open modals and restore body scroll
    document.body.classList.remove('modal-open');
  }
}
