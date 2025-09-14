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
  activeMenuItem = 'dashboard';
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems = [
    {
      id: 'dashboard',
      label: 'İdarə Paneli',
      icon: 'fas fa-chart-line',
      route: '/dashboard'
    },
    {
      id: 'automation',
      label: 'Avtomatlaşdırma',
      icon: 'fas fa-robot',
      route: '/automation'
    },
    {
      id: 'chatbot',
      label: 'Chatbot Operatoru',
      icon: 'fas fa-comments',
      route: '/chatbot'
    },
    {
      id: 'account',
      label: 'Hesab',
      icon: 'fas fa-user',
      route: '/account'
    },
    {
      id: 'clinic-info',
      label: 'Klinik Məlumatları',
      icon: 'fas fa-hospital',
      route: '/clinic-info'
    },
    {
      id: 'doctors',
      label: 'Həkimlər',
      icon: 'fas fa-user-md',
      route: '/doctors'
    },
    {
      id: 'subscription',
      label: 'Abunəlik',
      icon: 'fas fa-credit-card',
      route: '/subscription'
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
