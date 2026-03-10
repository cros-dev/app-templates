import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';

/**
 * Componente responsável pelo formulário de edição do perfil público.
 * Gerencia a lógica de validação, estados de carregamento e a
 * comunicação direta com a API de contas do Django.
 */
@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ProfileService],
  templateUrl: './public-profile.component.html'
})
export class PublicProfileComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);

  /**
   * Serviço de autenticação exposto para acesso aos sinais de usuário global.
   */
  public readonly authService = inject(AuthService);

  profileForm!: FormGroup;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<boolean>(false);

  /**
   * Inicializa o ciclo de vida do componente.
   * Coordena a criação do formulário e a verificação de integridade dos dados locais.
   */
  ngOnInit(): void {
    const user = this.authService.currentUser();
    this.initForm(user);

    if (!user) {
      this.loadProfile();
    }
  }

  /**
   * Constrói a estrutura do formulário reativo com base nos dados do usuário.
   *
   * @param user - Objeto de usuário contendo os dados iniciais para o formulário.
   */
  private initForm(user: User | null): void {
    this.profileForm = this.fb.group({
      first_name: [user?.first_name || '', [Validators.required]],
      last_name: [user?.last_name || '', [Validators.required]],
      email: [user?.email || '', [Validators.required, Validators.email]],
      username: [{ value: user?.username || '', disabled: true }]
    });
  }

  /**
   * Realiza a busca dos dados de perfil via API para sincronização do estado global.
   * Utilizado principalmente em eventos de atualização de página (refresh).
   */
  private loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (userData) => {
        this.profileForm.patchValue(userData);
        this.authService.currentUser.set(userData);
      },
      error: () => this.errorMessage.set('Falha ao sincronizar dados com o servidor.')
    });
  }

  /**
   * Processa a submissão dos dados do formulário para o backend.
   * Valida o estado do formulário e gerencia os sinais de feedback da interface.
   */
  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(false);

    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set(true);
        setTimeout(() => this.successMessage.set(false), 3000);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Erro ao atualizar o perfil. Verifique a conexão com o servidor.');
      }
    });
  }
}
