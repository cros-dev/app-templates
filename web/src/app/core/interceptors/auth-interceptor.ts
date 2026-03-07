import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Intercepta requisições HTTP para injetar o token de acesso JWT no cabeçalho Authorization.
 * Caso a API retorne erro 401, limpa os dados de sessão e redireciona para a tela de login.
 * @param req - A requisição HTTP enviada pelo cliente.
 * @param next - O próximo manipulador na cadeia de interceptores.
 * @returns Um Observable do fluxo de eventos HTTP.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  let authRequest = req;

  if (token) {
    authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        void router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
