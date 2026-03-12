import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { ThemeService } from './core/services/theme.service';

/**
 * Garante que o tema (localStorage) seja aplicado antes da primeira renderização,
 * inclusive em rotas sem layout (ex.: /auth/login).
 */
function initTheme(): () => void {
  return () => {
    inject(ThemeService);
  };
}

/**
 * Configuração global da aplicação Angular.
 * Centraliza os provedores de roteamento, tratamento de erros global e
 * comunicação HTTP com interceptores de segurança para o backend Django.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: APP_INITIALIZER, useFactory: initTheme, multi: true },
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimationsAsync()
  ]
};
