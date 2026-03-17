import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';
import { ConfirmDialogData } from '../../../core/models/dialog.model';

/**
 * Diálogo de confirmação genérico (confirmar/cancelar).
 * Usa os elementos oficiais do Material (MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose).
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    A11yModule,
  ],
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  readonly data: ConfirmDialogData = inject(MAT_DIALOG_DATA);

  get title(): string {
    return this.data.title;
  }

  get message(): string {
    return this.data.message;
  }

  get confirmLabel(): string {
    return this.data.confirmLabel ?? 'Confirmar';
  }

  get cancelLabel(): string {
    return this.data.cancelLabel ?? 'Cancelar';
  }

  get isDestructive(): boolean {
    return this.data.isDestructive === true;
  }
}
