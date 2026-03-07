import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}`;

  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    this.checkInitialState();
  }

  /**
   * Autentica o usuário na API e inicializa a sessão local.
   *
   * @param credentials - Objeto contendo credenciais de acesso (ex: username e password).
   * @returns Um Observable com a resposta da API contendo os tokens JWT.
   */
  login(credentials: Record<string, string>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/token/`, credentials).pipe(
      tap((response) => this.setSession(response))
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

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('access_token', authResult.access);
    localStorage.setItem('refresh_token', authResult.refresh);

    if (authResult.user) {
      this.currentUser.set(authResult.user);
    }
    this.isAuthenticated.set(true);
  }

  private checkInitialState(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.isAuthenticated.set(true);
    }
  }
}
