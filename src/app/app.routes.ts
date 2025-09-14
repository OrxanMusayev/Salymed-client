import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Clinic } from './clinic/clinic';
import { Pricing } from './pricing/pricing';
import { Contact } from './contact/contact';
import { ClinicRegistrationComponent } from './clinic-registration/clinic-registration';
import { AdminInfoComponent } from './admin-info/admin-info';
import { SubscriptionSelectionComponent } from './subscription-selection/subscription-selection';
import { PaymentComponent } from './payment/payment';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'pricing', component: Pricing },
  { path: 'contact', component: Contact },
  { path: 'login', component: Login },
  { path: 'clinic', component: Clinic },
  { path: 'register', component: ClinicRegistrationComponent },
  { path: 'admin-info', component: AdminInfoComponent },
  { path: 'subscription-selection', component: SubscriptionSelectionComponent },
  { path: 'payment', component: PaymentComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', loadComponent: () => import('./dashboard/overview/overview.component').then(m => m.OverviewComponent) }
    ]
  },
  { 
    path: 'account', 
    component: DashboardComponent,
    children: [
      { path: '', loadComponent: () => import('./dashboard/account/account.component').then(m => m.AccountComponent) }
    ]
  },
  { 
    path: 'clinic-info', 
    component: DashboardComponent,
    children: [
      { path: '', loadComponent: () => import('./dashboard/clinic-info/clinic-info.component').then(m => m.ClinicInfoComponent) }
    ]
  },
  { 
    path: 'subscription', 
    component: DashboardComponent,
    children: [
      { path: '', loadComponent: () => import('./dashboard/subscription/subscription.component').then(m => m.SubscriptionComponent) }
    ]
  },
  { 
    path: 'automation', 
    component: DashboardComponent,
    children: [
      { path: '', loadComponent: () => import('./dashboard/automation/automation.component').then(m => m.AutomationComponent) }
    ]
  },
  { 
    path: 'chatbot', 
    component: DashboardComponent,
    children: [
      { path: '', loadComponent: () => import('./dashboard/chatbot/chatbot.component').then(m => m.ChatbotComponent) }
    ]
  },
  { 
    path: 'doctors', 
    component: DashboardComponent,
    children: [
      { path: '', loadComponent: () => import('./dashboard/doctors/doctors.component').then(m => m.DoctorsComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
