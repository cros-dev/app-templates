/**
 * Estrutura de um item de navegação da barra lateral.
 * Se disabled for true, o item é exibido mas não navega (placeholder).
 */
export interface MenuItem {
  label: string;
  route: string;
  iconPath: string;
  disabled?: boolean;
}

/**
 * Grupo de itens no menu. Entre um grupo e o próximo é renderizado um divider.
 */
export type MenuGroup = MenuItem[];
