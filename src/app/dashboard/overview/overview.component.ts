import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  stats = [
    {
      title: 'Bugünkü Görüşlər',
      value: '12',
      icon: 'fas fa-calendar-day',
      color: 'primary',
      change: '+5%'
    },
    {
      title: 'Bu Həftə Həkimlər',
      value: '8',
      icon: 'fas fa-user-md',
      color: 'success',
      change: '+2'
    },
    {
      title: 'Aktiv Xəstələr',
      value: '156',
      icon: 'fas fa-users',
      color: 'info',
      change: '+12%'
    },
    {
      title: 'Bu Ay Gəlir',
      value: '₼2,450',
      icon: 'fas fa-chart-line',
      color: 'warning',
      change: '+18%'
    }
  ];

  recentAppointments = [
    {
      patient: 'Aynur Həsənova',
      doctor: 'Dr. Şəhriyar Məmmədov',
      time: '09:30',
      status: 'confirmed'
    },
    {
      patient: 'Rəşad Quliyev',
      doctor: 'Dr. Nigar Əliyeva',
      time: '10:00',
      status: 'pending'
    },
    {
      patient: 'Günel Əhmədova',
      doctor: 'Dr. Şəhriyar Məmmədov',
      time: '11:15',
      status: 'confirmed'
    }
  ];
}