import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  activeMenuItem = 'dashboard-overview';
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems = [
    {
      id: 'dashboard-overview',
      label: 'Gösterge Paneli',
      icon: 'fas fa-tachometer-alt',
      route: '/dashboard'
    },
    {
      id: 'doctors',
      label: 'Doktorlar',
      icon: 'fas fa-user-md',
      route: '/doctors'
    },
    {
      id: 'overview',
      label: 'Genel Bakış',
      icon: 'fas fa-chart-bar',
      route: '/overview'
    },
    {
      id: 'account',
      label: 'Hesap',
      icon: 'fas fa-user',
      route: '/account'
    },
    {
      id: 'automation',
      label: 'Otomasyon',
      icon: 'fas fa-robot',
      route: '/automation'
    },
    {
      id: 'subscription',
      label: 'Abonelik',
      icon: 'fas fa-credit-card',
      route: '/subscription'
    },
    {
      id: 'clinic-info',
      label: 'Klinik Bilgisi',
      icon: 'fas fa-hospital',
      route: '/clinic-info'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.setActiveMenuItem(this.router.url);
    
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setActiveMenuItem(event.url);
    });
  }

  setActiveMenuItem(url: string) {
    const matchedItem = this.menuItems.find(item => url.startsWith(item.route));
    if (matchedItem) {
      this.activeMenuItem = matchedItem.id;
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit();
  }

  selectMenuItem(item: any) {
    this.activeMenuItem = item.id;
    this.router.navigate([item.route]);
  }
}
