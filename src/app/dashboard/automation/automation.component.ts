import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss']
})
export class AutomationComponent implements OnInit {
  // Clinic WhatsApp Setup
  clinicPhone = '+994 12 555 01 02';
  useExistingNumber = true;
  newWhatsAppNumber = '';
  selectedCountryCode = '+994';
  whatsappStatus = 'not-connected';
  
  // Doctor Management
  doctors = [
    {
      id: 1,
      name: 'Dr. Əli Məmmədov',
      specialty: 'Kardioloq',
      phone: '',
      whatsappConnected: false,
      status: 'not-connected'
    },
    {
      id: 2,
      name: 'Dr. Sevinc Həsənova',
      specialty: 'Dermatoloq',
      phone: '+994 50 123 45 67',
      whatsappConnected: true,
      status: 'connected'
    }
  ];
  searchDoctors = '';
  
  // Automation Features
  automationFeatures = {
    appointmentConfirmations: true,
    appointmentReminders24h: true,
    appointmentReminders1h: false,
    reschedulingRequests: true,
    noshowFollowups: false,
    welcomeMessages: true,
    availabilityUpdates: false
  };
  
  // Website Integration
  websiteIntegrationEnabled = false;
  apiKey = 'sal_api_123456789';
  showDocumentation = false;
  
  // Settings
  businessHours = {
    start: '09:00',
    end: '18:00'
  };
  selectedLanguage = 'az';
  
  countryCodes = [
    { code: '+994', country: 'Azerbaijan' },
    { code: '+90', country: 'Turkey' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' }
  ];
  
  languages = [
    { code: 'az', name: 'Azərbaycan dili' },
    { code: 'en', name: 'English' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'ru', name: 'Русский' }
  ];

  ngOnInit() {
    // Initialize component
  }

  toggleNumberType() {
    this.useExistingNumber = !this.useExistingNumber;
    if (this.useExistingNumber) {
      this.newWhatsAppNumber = '';
    }
  }

  verifyWhatsApp() {
    this.whatsappStatus = 'verifying';
    setTimeout(() => {
      this.whatsappStatus = 'connected';
    }, 3000);
  }

  get filteredDoctors() {
    return this.doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(this.searchDoctors.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(this.searchDoctors.toLowerCase())
    );
  }

  getDoctorInitials(name: string): string {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      // İlk iki sözdən baş hərfləri al (məs: "Dr. Əli" -> "DƏ")
      return nameParts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('');
    }
    return name.charAt(0).toUpperCase();
  }

  toggleDoctorWhatsApp(doctor: any) {
    if (!doctor.phone) {
      alert('Əvvəl telefon nömrəsi daxil edin');
      return;
    }
    doctor.whatsappConnected = !doctor.whatsappConnected;
    doctor.status = doctor.whatsappConnected ? 'connected' : 'not-connected';
  }

  testDoctorMessage(doctor: any) {
    alert('Test mesaj göndərildi: ' + doctor.name);
  }

  addAllDoctors() {
    this.doctors.forEach(doctor => {
      if (doctor.phone && !doctor.whatsappConnected) {
        doctor.whatsappConnected = true;
        doctor.status = 'connected';
      }
    });
  }

  toggleWebsiteIntegration() {
    this.websiteIntegrationEnabled = !this.websiteIntegrationEnabled;
  }

  copyApiKey() {
    navigator.clipboard.writeText(this.apiKey);
    alert('API key kopyalandı!');
  }

  copyIntegrationCode() {
    const code = '<script src="https://api.salymed.az/booking.js"></script>';
    navigator.clipboard.writeText(code);
    alert('İnteqrasiya kodu kopyalandı!');
  }

  downloadDocumentation() {
    alert('Sənədlər yüklənir...');
  }

  testIntegration() {
    alert('İnteqrasiya test edilir...');
  }

  startAutomation() {
    const requirements = [
      this.whatsappStatus === 'connected',
      this.doctors.some(d => d.whatsappConnected),
      Object.values(this.automationFeatures).some(Boolean)
    ];
    
    if (requirements.every(Boolean)) {
      alert('Avtomatlaşdırma başladı!');
    } else {
      alert('Bütün tələbləri yerinə yetirin!');
    }
  }

  saveConfiguration() {
    alert('Konfiqurasiya saxlanıldı!');
  }
}
