import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Serviço global de notificações toast (snackbar).
 * Centraliza a abertura do MatSnackBar em toda a aplicação.
 * Use este serviço em vez de injetar MatSnackBar diretamente.
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
   */
  success(message: string): void {
    this.snackBar.open(message, undefined, {
      ...this.defaultConfig,
      panelClass: 'toast-success'
    });
  }

  /**
   * Exibe uma mensagem de erro.
   *
   * @param message - Texto exibido no toast.
   */
  error(message: string): void {
    this.snackBar.open(message, undefined, {
      ...this.defaultConfig,
      duration: 5000,
      panelClass: 'toast-error'
    });
  }

  /**
   * Exibe uma mensagem informativa.
   *
   * @param message - Texto exibido no toast.
   */
  info(message: string): void {
    this.snackBar.open(message, undefined, {
      ...this.defaultConfig,
      panelClass: 'toast-info'
    });
  }

  /**
   * Exibe uma mensagem de alerta.
   *
   * @param message - Texto exibido no toast.
   */
  warning(message: string): void {
    this.snackBar.open(message, undefined, {
      ...this.defaultConfig,
      panelClass: 'toast-warning'
    });
  }
}
