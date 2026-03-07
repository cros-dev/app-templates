import { User } from './user.model';

/**
 * Contrato da resposta de autenticação emitida pela API.
 * Inclui os tokens de acesso e renovação (JWT), além dos dados opcionais do usuário.
 */
export interface AuthResponse {
  access: string;
  refresh: string;
  user?: User;
}
