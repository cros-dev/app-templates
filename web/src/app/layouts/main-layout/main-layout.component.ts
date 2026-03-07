import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LayoutService } from '../../core/services/layout.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  private readonly layoutService = inject(LayoutService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);

  isSidebarOpen = this.layoutService.isSidebarOpen;

  /**
   * Inicializa a observação de quebras de layout para comportamento responsivo.
   */
  ngOnInit(): void {
    this.initResponsiveObserver();
  }

  /**
   * Alterna o estado de visibilidade da barra lateral no serviço de layout.
   */
  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  /**
   * Monitora o tamanho da tela e fecha a barra lateral automaticamente em dispositivos móveis.
   */
  private initResponsiveObserver(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        if (state.matches) {
          this.layoutService.setSidebarState(false);
        }
      });
  }
}
