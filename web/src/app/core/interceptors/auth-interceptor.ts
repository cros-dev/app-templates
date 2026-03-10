import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Flag indicativa de que um processo de renovação de token está em andamento.
 * Utilizada para evitar múltiplas chamadas simultâneas ao endpoint de refresh.
 */
let isRefreshing = false;

/**
 * Sujeito que armazena e emite o novo token de acesso para as requisições
 * que estão aguardando em fila de espera durante o processo de renovação.
 */
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

/**
 * Interceptor funcional responsável por injetar o token JWT nas requisições
 * de saída e gerenciar a renovação automática (Silent Refresh) em caso de erro 401.
 * * @param req - A instância da requisição HTTP original.
 * @param req
 * @param next - O próximo manipulador na cadeia de interceptores.
 * @returns Um Observable do fluxo de eventos HTTP.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  let authRequest = req;

  if (token) {
    authRequest = addTokenHeader(req, token);
  }

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      /**
       * Verifica se o erro é de falta de autorização (401) e garante que
       * a requisição não originou dos endpoints de autenticação ou renovação.
       */
      if (error.status === 401 && !req.url.includes('api/token/')) {
        return handle401Error(req, next, authService, router);
      }

      return throwError(() => error);
    })
  );
};

/**
 * Clona a requisição original e injeta o cabeçalho Authorization com o token Bearer.
 * * @param request - A requisição original que deve ser clonada.
 * @param request
 * @param token - O token de acesso JWT válido.
 * @returns Uma nova instância de HttpRequest com os cabeçalhos atualizados.
 */
const addTokenHeader = (request: HttpRequest<unknown>, token: string) => {
  return request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
};

/**
 * Coordena o fluxo de recuperação de sessão quando um erro 401 é detectado.
 * Implementa um mecanismo de fila para requisições concorrentes.
 * * @param req - A requisição original que falhou.
 * @param req
 * @param next - O manipulador para repetir a requisição após a renovação.
 * @param authService - Instância do serviço de autenticação para chamada de refresh.
 * @param router - Instância do roteador para redirecionamento em caso de falha crítica.
 * @returns Um Observable que emitirá a requisição repetida ou um erro de logout.
 */
const handle401Error = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router
) => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.access);

        /** * Repete a requisição que disparou o erro original utilizando o novo token.
         */
        return next(addTokenHeader(req, response.access));
      }),
      catchError((refreshError) => {
        isRefreshing = false;
        authService.logout();
        void router.navigate(['/auth/login']);
        return throwError(() => refreshError);
      })
    );
  }

  /**
   * Caso uma renovação já esteja em curso, as demais requisições aguardam
   * até que o refreshTokenSubject emita o novo token.
   */
  return refreshTokenSubject.pipe(
    filter((token) => token !== null),
    take(1),
    switchMap((token) => next(addTokenHeader(req, token!)))
  );
};
