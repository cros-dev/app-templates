import { Routes } from '@angular/router';

/**
 * Definição de rotas da funcionalidade de autenticação (login, registro).
 */
export default [
  {
    path: 'login',
    title: 'Entrar | App',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    title: 'Criar conta | App',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    title: 'Esqueci a senha | App',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
] as Routes;
