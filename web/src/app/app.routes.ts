import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

/**
 * Definição central de rotas da aplicação.
 * Organiza a navegação entre áreas públicas e protegidas, utilizando
 * carregamento tardio (Lazy Loading) para otimização de performance.
 */
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.routes')
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
