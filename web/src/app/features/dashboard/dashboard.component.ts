import { Component, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private readonly toast = inject(ToastService);

  showSuccess(): void {
    this.toast.success('Operação realizada com sucesso!');
  }

  showError(): void {
    this.toast.error('Ocorreu um erro ao processar a solicitação.');
  }

  showInfo(): void {
    this.toast.info('Nova atualização disponível.');
  }

  showWarning(): void {
    this.toast.warning('Sua sessão expira em 5 minutos.');
  }
}
