import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/user.model';
import { UserProfileUpdate } from '../models/user-profile-update.model';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Serviço responsável pelas operações de API da funcionalidade de Perfil.
 * Comunica-se com o endpoint /accounts/profile/ do Django.
 */
@Injectable()
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly apiUrl = `${environment.apiUrl}/accounts/profile/`;

  /**
   * Obtém os dados do perfil do usuário autenticado.
   * @returns Observable com os dados completos do usuário.
   */
  getProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }

  /**
   * Atualiza os dados do perfil no servidor.
   * Em caso de sucesso, atualiza o Signal global de usuário no AuthService.
   *
   * @param data - Objeto contendo os campos a serem atualizados.
   * @returns Observable com os dados do usuário atualizados.
   */
  updateProfile(data: UserProfileUpdate): Observable<User> {
    return this.http.patch<User>(this.apiUrl, data).pipe(
      tap((updatedUser) => {
        this.authService.currentUser.set(updatedUser);      })
    );
  }
}
