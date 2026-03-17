import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';
import { DialogService } from '../../core/services/dialog.service';
import { LayoutService } from '../../core/services/layout.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly dialogService = inject(DialogService);
  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);

  /**
   * Serviço responsável pelo gerenciamento de tema (Light/Dark).
   */
  readonly themeService = inject(ThemeService);

  /**
   * Signal que disponibiliza os dados do usuário autenticado para o template.
   */
  user = this.authService.currentUser;

  /**
   * Alterna o estado de visibilidade da barra lateral no serviço de layout.
   */
  toggleMenu(): void {
    this.layoutService.toggleSidebar();
  }

  /**
   * Abre o diálogo de confirmação de saída; em caso de confirmação, finaliza a sessão e redireciona para o login.
   */
  handleLogout(): void {
    const ref = this.dialogService.openConfirm({
      title: 'Sair da conta?',
      message: 'Deseja realmente encerrar a sessão?',
      confirmLabel: 'Sair',
      cancelLabel: 'Cancelar',
      isDestructive: true
    });
    ref.subscribe((confirmed) => {
      if (confirmed) {
        this.authService.logout();
        void this.router.navigate(['/auth/login']);
      }
    });
  }
}
