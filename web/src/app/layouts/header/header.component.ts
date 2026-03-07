import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);

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
   * Finaliza a sessão do usuário e redireciona para a tela de login.
   */
  handleLogout(): void {
    this.authService.logout();
    void this.router.navigate(['/auth/login']);
  }
}
