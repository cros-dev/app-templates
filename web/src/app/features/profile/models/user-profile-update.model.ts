/**
 * Define os campos permitidos para atualização de perfil
 * conforme o UserProfileSerializer do Django.
 */
export interface UserProfileUpdate {
  first_name: string;
  last_name: string;
  email: string;
}
