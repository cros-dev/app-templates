import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';

/**
 * Componente de layout (Shell) para a funcionalidade de Perfil.
 * Provê a estrutura de navegação lateral e o outlet para as páginas de configuração.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfileSidebarComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
}
