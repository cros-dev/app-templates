/**
 * Dados exibidos no diálogo de confirmação genérico.
 * Usado pelo DialogService e pelo ConfirmDialogComponent.
 */
export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}
