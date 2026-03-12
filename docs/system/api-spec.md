# Especificação de API (Base)

Este documento descreve a especificação de endpoints da API.

## Autenticação

- `POST /api/token/` - Login (access/refresh). Corpo: `email` e `password` (obrigatórios).
- `POST /api/token/refresh/` - Renovação do access token
- `POST /api/token/verify/` - Verificação de token

## Contas (usuários e perfil)

- `GET /api/accounts/profile/` - Perfil do usuário autenticado
- `PUT/PATCH /api/accounts/profile/` - Atualização do perfil
- `GET /api/accounts/{id}/` - Detalhes de um usuário por ID

---

**Status:** Documento base (adaptar por projeto)  
**Última atualização:** 2026-01-21
