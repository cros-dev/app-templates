# Especificação de API (Base)

Este documento descreve a especificação de endpoints da API.

## Autenticação

- `POST /api/token/` - Login (access/refresh)
- `POST /api/token/refresh/` - Renovação do access token
- `POST /api/token/verify/` - Verificação de token

## Usuários

- `GET /api/users/profile/` - Perfil do usuário logado
- `PATCH /api/users/profile/` - Atualização do perfil logado
- `GET /api/users/{id}/` - Detalhes de usuário (admin)

---

**Status:** Documento base (adaptar por projeto)  
**Última atualização:** 2026-01-21
