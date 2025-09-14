import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {
  // Dashboard İstatistikleri
  dashboardStats = {
    totalAppointments: 0,
    autoScheduledAppointments: 0,
    manualAppointments: 0,
    totalPatients: 0,
    todayAppointments: 0,
    weeklyAppointments: 0,
    monthlyRevenue: 0,
    activeDoctors: 0
  };

  // Son randevular
  recentAppointments = [
    {
      id: 'APT-001',
      patientName: 'Ahmet Yılmaz',
      doctorName: 'Dr. Mehmet Kaya',
      date: '2025-09-15',
      time: '10:30',
      type: 'auto', // auto veya manual
      status: 'confirmed'
    },
    {
      id: 'APT-002',
      patientName: 'Ayşe Demir',
      doctorName: 'Dr. Fatma Öz',
      date: '2025-09-15',
      time: '14:00',
      type: 'manual',
      status: 'pending'
    },
    {
      id: 'APT-003',
      patientName: 'Mustafa Şahin',
      doctorName: 'Dr. Ahmet Yıldız',
      date: '2025-09-16',
      time: '09:15',
      type: 'auto',
      status: 'confirmed'
    },
    {
      id: 'APT-004',
      patientName: 'Zeynep Kara',
      doctorName: 'Dr. Mehmet Kaya',
      date: '2025-09-16',
      time: '11:45',
      type: 'auto',
      status: 'confirmed'
    },
    {
      id: 'APT-005',
      patientName: 'Ali Can',
      doctorName: 'Dr. Fatma Öz',
      date: '2025-09-17',
      time: '13:30',
      type: 'manual',
      status: 'confirmed'
    }
  ];

  // Haftalık randevu trendi
  weeklyTrend = [
    { day: 'Pzt', appointments: 12, autoAppointments: 8 },
    { day: 'Sal', appointments: 15, autoAppointments: 10 },
    { day: 'Çar', appointments: 18, autoAppointments: 12 },
    { day: 'Per', appointments: 14, autoAppointments: 9 },
    { day: 'Cum', appointments: 20, autoAppointments: 15 },
    { day: 'Cmt', appointments: 8, autoAppointments: 5 },
    { day: 'Paz', appointments: 6, autoAppointments: 3 }
  ];

  loading = false;

  constructor() {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;

    // Demo veriler - gerçek API çağrısı yapılacak
    setTimeout(() => {
      this.dashboardStats = {
        totalAppointments: 247,
        autoScheduledAppointments: 156, // %63 otomatik randevu
        manualAppointments: 91,
        totalPatients: 189,
        todayAppointments: 8,
        weeklyAppointments: 93,
        monthlyRevenue: 45250, // ₺
        activeDoctors: 5
      };

      this.loading = false;
    }, 1000);
  }

  getAutoAppointmentPercentage(): number {
    if (this.dashboardStats.totalAppointments === 0) return 0;
    return Math.round((this.dashboardStats.autoScheduledAppointments / this.dashboardStats.totalAppointments) * 100);
  }

  getAppointmentTypeText(type: string): string {
    return type === 'auto' ? 'Otomatik' : 'Manuel';
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'confirmed': return 'Onaylandı';
      case 'pending': return 'Bekliyor';
      case 'cancelled': return 'İptal';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  refreshData() {
    this.loadDashboardData();
  }
}