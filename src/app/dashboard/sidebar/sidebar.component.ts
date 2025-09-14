import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<boolean>();

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-chart-line',
      route: '/dashboard/overview',
      isActive: true
    },
    {
      id: 'account',
      label: 'Hesabım',
      icon: 'fas fa-user',
      route: '/dashboard/account'
    },
    {
      id: 'clinic-info',
      label: 'Klinik Məlumatları',
      icon: 'fas fa-hospital',
      route: '/dashboard/clinic-info'
    },
    {
      id: 'subscription',
      label: 'Abunəliyim',
      icon: 'fas fa-credit-card',
      route: '/dashboard/subscription'
    },
    {
      id: 'automation',
      label: 'Görüşlərin Avtomatlaşdırılması',
      icon: 'fas fa-robot',
      route: '/dashboard/automation'
    },
    {
      id: 'doctors',
      label: 'Həkimlər',
      icon: 'fas fa-user-md',
      route: '/dashboard/doctors'
    }
  ];

  toggleSidebarState() {
    this.collapsed = !this.collapsed;
    this.toggleSidebar.emit(this.collapsed);
  }

  selectMenuItem(item: MenuItem) {
    this.menuItems.forEach(menuItem => menuItem.isActive = false);
    item.isActive = true;
  }
}