import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from '../../../environments/environment';

/**
 * Serviço central de autenticação e gerenciamento de sessão.
 * Responsável pela persistência de tokens JWT e controle do estado global do usuário.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}`;

  /**
   * Sinais reativos para estado do usuário e status de autenticação.
   */
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    this.checkInitialState();
  }

  /**
   * Autentica o usuário na API e inicializa a sessão local.
   * @param credentials - Objeto com email e password (corpo esperado pelo POST /api/token/).
   * @returns Um Observable com a resposta da API contendo os tokens JWT.
   */
  login(credentials: Record<string, string>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/token/`, credentials).pipe(
      tap((response) => this.setSession(response))
    );
  }

  /**
   * Solicita um novo token de acesso (Access Token) utilizando o token de atualização (Refresh Token).
   * Este método é chamado automaticamente pelo interceptor em caso de erro 401.
   * @returns Um Observable com o novo par de tokens.
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');

    return this.http.post<AuthResponse>(`${this.apiUrl}/token/refresh/`, {
      refresh: refreshToken
    }).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.access);
        if (response.refresh) {
          localStorage.setItem('refresh_token', response.refresh);
        }
      })
    );
  }

  /**
   * Encerra a sessão ativa, removendo os tokens de armazenamento e redefinindo o estado reativo.
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  /**
   * Armazena os tokens no armazenamento local e atualiza os sinais globais.
   * @param authResult - Resposta de sucesso da API de autenticação ou renovação.
   */
  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('access_token', authResult.access);
    localStorage.setItem('refresh_token', authResult.refresh);

    if (authResult.user) {
      this.currentUser.set(authResult.user);
    }
    this.isAuthenticated.set(true);
  }

  /**
   * Verifica a existência de um token válido ao inicializar a aplicação para restaurar a sessão.
   */
  private checkInitialState(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.isAuthenticated.set(true);
    }
  }
}
