import { Injectable, signal } from '@angular/core';

/**
 * Gerencia o estado global da interface do usuário.
 * Controla elementos estruturais como a visibilidade da barra lateral
 * e adaptações de layout responsivo.
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isSidebarOpen = signal<boolean>(true);

  /**
   * Alterna o estado de exibição da barra lateral.
   */
  toggleSidebar(): void {
    this.isSidebarOpen.update((state) => !state);
  }

  /**
   * Define um estado específico para a visibilidade da barra lateral.
   *
   * @param isOpen - Novo estado de visibilidade desejado.
   */
  setSidebarState(isOpen: boolean): void {
    this.isSidebarOpen.set(isOpen);
  }
}
