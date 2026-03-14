# accounts

App de autenticação e gerenciamento de usuários do backend.

## Conteúdo

- **Autenticação JWT:** views customizadas para login (email + password), refresh, verify e blacklist (logout); documentação OpenAPI via `@extend_schema_view`.
- **Perfil e usuários:** `UserProfileView` (GET/PUT/PATCH `/api/accounts/profile/`), `UserDetailView` (GET `/api/accounts/<id>/`); serializers `UserSerializer`, `UserProfileSerializer`, `CustomTokenObtainPairSerializer`.
- **Admin:** configuração do Django Admin para o modelo User.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/token/` | Login (email, password) |
| POST | `/api/token/refresh/` | Renovar access token |
| POST | `/api/token/verify/` | Verificar token |
| POST | `/api/token/blacklist/` | Logout (invalidar refresh token) |
| GET / PUT / PATCH | `/api/accounts/profile/` | Perfil do usuário autenticado |
| GET | `/api/accounts/<id>/` | Detalhes de um usuário por ID |

Rotas JWT estão em `config/urls.py`; rotas de contas em `apps.accounts.urls`.
