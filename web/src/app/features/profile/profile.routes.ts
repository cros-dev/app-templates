import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

/**
 * Definição de rotas internas da funcionalidade de Perfil.
 * Implementa uma estrutura de navegação secundária baseada em abas verticais,
 * onde o ProfileComponent atua como o container principal (Shell).
 */
export default [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'public',
        title: 'Perfil Público | DjangoAdmin',
        loadComponent: () =>
          import('./pages/public-profile/public-profile.component').then(
            (m) => m.PublicProfileComponent
          ),
      },
      {
        path: '',
        redirectTo: 'public',
        pathMatch: 'full',
      },
    ],
  },
] as Routes;
