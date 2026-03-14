import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Página exibida quando a rota não existe (404).
 * Oferece link para a raiz e para o login.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {}
