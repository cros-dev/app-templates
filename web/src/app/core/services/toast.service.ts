import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Serviço global de notificações toast (snackbar).
 * Centraliza configuração e uso do MatSnackBar em toda a aplicação.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  private readonly defaultConfig = {
    horizontalPosition: 'end' as const,
    verticalPosition: 'top' as const,
    duration: 4000
  };

  /**
   * Exibe uma mensagem de sucesso.
   *
   * @param message - Texto exibido no toast.
   * @param action - Rótulo do botão de ação (default: 'Fechar').
   */
  success(message: string, action = 'Fechar'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig
    });
  }

  /**
   * Exibe uma mensagem de erro.
   *
   * @param message - Texto exibido no toast.
   * @param action - Rótulo do botão de ação (default: 'Fechar').
   */
  error(message: string, action = 'Fechar'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration: 5000
    });
  }
}
