import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Valida se o usuário possui uma sessão ativa antes de permitir o acesso à rota.
 * Caso o usuário não esteja autenticado, a navegação é interrompida e redirecionada para o login.
 * * @returns Booleano indicando se a rota pode ou não ser ativada.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  void router.navigate(['/auth/login']);
  return false;
};
