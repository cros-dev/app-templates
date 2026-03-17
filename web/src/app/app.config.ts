import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { ThemeService } from './core/services/theme.service';

/**
 * Garante que o tema (localStorage) seja aplicado antes da primeira renderização,
 * inclusive em rotas sem layout (ex.: /auth/login).
 */
function initTheme(): void {
  inject(ThemeService);
}

/**
 * Configuração global da aplicação Angular.
 * Centraliza os provedores de roteamento, tratamento de erros global e
 * comunicação HTTP com interceptores de segurança para o backend Django.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(initTheme),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(MatDialogModule, MatSnackBarModule)
  ]
};
