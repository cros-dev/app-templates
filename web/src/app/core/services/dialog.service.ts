import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { ConfirmDialogData } from '../models/dialog.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

/**
 * Serviço global de diálogos (modais).
 * Centraliza a abertura do MatDialog em toda a aplicação.
 * Use este serviço em vez de injetar MatDialog diretamente.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  /**
   * Abre um diálogo genérico com o componente informado.
   *
   * @param component - Componente a ser exibido no diálogo (standalone ou declarado).
   * @param config - Configuração opcional (dados, largura, disableClose, etc.).
   * @returns Referência do diálogo; use afterClosed() para obter o resultado.
   */
  open<T, D = unknown, R = unknown>(
    component: unknown,
    config?: MatDialogConfig<D>
  ): MatDialogRef<T, R> {
    return this.dialog.open<T, D, R>(component as never, config ?? {});
  }

  /**
   * Abre o diálogo de confirmação (ConfirmDialogComponent) com título e mensagem.
   * Útil para ações que exigem confirmação do usuário (ex.: exclusão, sair sem salvar).
   *
   * @param data - Título, mensagem e rótulos opcionais dos botões.
   * @returns Observable que emite true ao confirmar e false ao cancelar ou fechar.
   */
  openConfirm(data: ConfirmDialogData): Observable<boolean> {
    const ref = this.open<ConfirmDialogComponent, ConfirmDialogData, boolean>(
      ConfirmDialogComponent,
      {
        data,
        restoreFocus: false,
        ariaLabel: data.title
      }
    );
    return ref.afterClosed().pipe(map((result) => result === true));
  }
}