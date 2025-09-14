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
      change: '+15%'
    },
    {
      title: 'Aktiv Həkimlər',
      value: '8',
      icon: 'fas fa-user-md',
      color: 'success',
      change: '+2'
    },
    {
      title: 'Ümumi Xəstələr',
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

  // Chart data for analytics section
  chartData = [45, 52, 38, 65, 73, 62, 58, 69, 84, 76, 82, 91, 87, 95, 78, 85, 92, 88, 96, 89, 94, 87, 93, 98, 85, 91, 89, 95, 92, 88];
  chartLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  
  // Chart helper methods
  getMaxValue(data: number[]): number {
    return Math.max(...data);
  }

  getMaxChartValue(): number {
    return Math.max(...this.chartData);
  }

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

  // Calendar properties
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth();
  
  weekDays = ['B.E', 'Ç.A', 'Ç', 'C.A', 'C', 'Ş', 'B'];
  
  monthNames = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ];

  calendarDays: any[] = [];

  constructor() {
    this.generateCalendar();
  }

  // Calendar methods
  getCurrentMonthName(): string {
    return this.monthNames[this.currentMonth];
  }

  previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    
    // Get the first day of the week (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    startDate.setDate(startDate.getDate() - firstDayOfWeek);

    this.calendarDays = [];
    
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === this.currentMonth;
      const isToday = this.isToday(date);
      const hasAppointment = this.hasAppointmentOnDate(date);
      const appointmentCount = this.getAppointmentCount(date);

      this.calendarDays.push({
        date: date.getDate(),
        fullDate: new Date(date),
        isCurrentMonth,
        isToday,
        hasAppointment,
        appointmentCount
      });
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  hasAppointmentOnDate(date: Date): boolean {
    // Həftə içi günlər üçün təqribən 30% ehtimal
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return false; // Həftə sonu yoxdur
    
    // Bu ay və növbəti ay üçün təqribən görüş olsun
    const today = new Date();
    if (date.getMonth() === today.getMonth() || date.getMonth() === today.getMonth() + 1) {
      return Math.random() > 0.7;
    }
    return false;
  }

  getAppointmentCount(date: Date): number {
    if (!this.hasAppointmentOnDate(date)) return 0;
    // 1-5 arası görüş sayı
    return Math.floor(Math.random() * 5) + 1;
  }

  selectDay(day: any): void {
    console.log('Selected day:', day);
    // Add day selection logic here
  }
}