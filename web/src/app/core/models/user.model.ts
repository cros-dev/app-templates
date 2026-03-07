/**
 * Representa os dados detalhados de um usuário no sistema.
 * Mapeia os campos retornados pelos serializers do Django no backend.
 */
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  is_active: boolean;
}
