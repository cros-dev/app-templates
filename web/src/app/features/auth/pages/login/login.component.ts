import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

/**
 * Página de login. Autentica por email e senha, redireciona para returnUrl ou raiz.
 * Em erro da API, exibe toast com a mensagem retornada ou genérica.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  /** Indica se a requisição de login está em andamento (desabilita botão e exibe loading). */
  readonly isLoading = signal<boolean>(false);

  /** Formulário reativo com email e password (validação: obrigatório, email válido). */
  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  /**
   * Submete as credenciais à API. Em sucesso redireciona para returnUrl ou `/`.
   * Em erro exibe toast com mensagem da API ou genérica.
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] as string | undefined;
        void this.router.navigateByUrl(returnUrl ?? '/');
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        const message =
          err?.error?.detail ??
          err?.error?.message ??
          'Email ou senha incorretos. Verifique e tente novamente.';
        this.toast.error(message);
      }
    });
  }
}
