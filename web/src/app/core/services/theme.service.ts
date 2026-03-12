import { Injectable, signal, effect } from '@angular/core';

/**
 * Gerencia a alternância de temas (Claro/Escuro) da aplicação.
 * Persiste a preferência no localStorage e sincroniza com a classe 'dark' no DOM.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';

  /**
   * Signal que rastreia se o modo escuro está ativo.
   */
  darkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    /** Aplica tema imediatamente para evitar flash (rotas sem layout, ex.: login). */
    this.applyTheme(this.darkMode());
    /**
     * Efeito que reage a mudanças no Signal darkMode para atualizar o DOM e o armazenamento.
     */
    effect(() => {
      this.applyTheme(this.darkMode());
    });
  }

  /**
   * Alterna o estado do tema entre claro e escuro.
   */
  toggleTheme(): void {
    this.darkMode.update(active => !active);
  }

  /**
   * Determina o tema inicial com base no histórico do usuário ou preferência do sistema.
   *
   * @returns Booleano indicando se o modo escuro deve iniciar ativo.
   */
  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Aplica ou remove a classe 'dark' do elemento raiz do documento (html).
   *
   * @param isDark - Estado atual do tema escuro.
   */
  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem(this.THEME_KEY, 'dark');
      return;
    }
    html.classList.remove('dark');
    localStorage.setItem(this.THEME_KEY, 'light');
  }
}
