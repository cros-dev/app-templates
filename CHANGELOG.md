# Changelog

Alterações notáveis do template (monorepo). Histórico único para backend, web e docs.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Unreleased]

## [1.8.0] - 2026-03-29

### Adicionado

- **Backend:** `apps.core.models.BaseModel` (abstrato): `id` UUID, `created_at`, `updated_at`, `is_active`.
- **Docs:** `BaseModel` e auditoria em dados referenciados em [docs/system/data-model.md](docs/system/data-model.md), [backend/ARCHITECTURE.md](backend/ARCHITECTURE.md), [backend/apps/core/README.md](backend/apps/core/README.md), [docs/decisions/index.md](docs/decisions/index.md) e [docs/README.md](docs/README.md); [docs/system/audit-logging.md](docs/system/audit-logging.md) já descreve o padrão.

## [1.7.0] - 2026-03-18

### Corrigido

- **Backend**: Removido `SessionAuthentication` do DRF (`DEFAULT_AUTHENTICATION_CLASSES`). Evita erro de CSRF em endpoints públicos (signup, etc.) quando acessados via SPA. API agora aceita apenas JWT; Django Admin continua funcionando normalmente (sessão própria).

## [1.6.0] - 2026-03-17

### Adicionado

- **DialogService** global no frontend (`core/services/dialog.service.ts`): centraliza abertura de modais via `MatDialog`; método `openConfirm()` para diálogos de confirmação.
- **ConfirmDialogComponent** em `shared/components/confirm-dialog/`: usa elementos oficiais do Material (`mat-dialog-title`, `mat-dialog-content`, `mat-dialog-actions`, `mat-dialog-close`).
- Overrides do dialog no `theme.css` (`.mat-mdc-dialog-surface`, título, conteúdo, botões) para respeitar tokens e dark mode.
- Confirmação ao clicar em "Sair do Sistema" no header (usa `DialogService.openConfirm`).
- Overrides do snackbar no `theme.css` (`.mat-mdc-snack-bar-container`, `.toast-success`, `.toast-error`, `.toast-info`, `.toast-warning`) para respeitar tokens, dark mode e cores por tipo.

### Alterado

- **ToastService** refatorado: usa `snackBar.open()` conforme documentação oficial; novos métodos `info()` e `warning()`; cores distintas por tipo via `panelClass`.
- ARCHITECTURE.md (web): `DialogService` e `ToastService` listados nos serviços singleton do `/core`; orientações de uso na seção 8 (Componentes de Terceiros).

## [1.5.0] - 2026-03-12

### Adicionado

- Endpoint `GET /api/health/` no backend para health/readiness (load balancer, Kubernetes).
- Endpoint `POST /api/token/blacklist/` no backend para logout (invalidar refresh token).
- Página 404 no frontend (rota inexistente; tema claro/escuro, responsiva; apenas botão “Ir para o início”).
- Comando de management `create_admin_user` no backend (lê DJANGO_SUPERUSER_* do .env; usado no Docker entrypoint e em runserver local).
- CI (GitHub Actions): jobs para backend (black, flake8, pytest) e web (npm ci, ng build).
- Docker Compose na raiz (`docker-compose.dev.yml`): único compose com db (PostgreSQL), backend (runserver) e frontend (ng serve) e volumes para hot-reload.
- **docs/deploy/**: documentação centralizada de deploy e execução (local e Docker); orientações antes nos READMEs consolidadas em [docs/deploy/README.md](docs/deploy/README.md), [local.md](docs/deploy/local.md) e [docker.md](docs/deploy/docker.md).
- CHANGELOG único na raiz (backend/CHANGELOG.md removido; histórico do backend incorporado).

### Alterado

- Logout no frontend passa a chamar o endpoint de blacklist antes de limpar tokens localmente.
- Backend: entrypoint passou a chamar apenas `create_admin_user` (lógica centralizada); comando lê credenciais do .env (Docker e runserver).
- Documentação do usuário admin: `.env.example` (comentário), backend README e início rápido do README raiz.
- README raiz: seção “Rodar o projeto” com links para docs/deploy; referência a `create_admin_user`.
- Especificação da API (`docs/system/api-spec.md`): adicionados `GET /api/health/` e `POST /api/token/blacklist/`.
- Orquestração: único compose é `docker-compose.dev.yml` (removido `docker-compose.yml`).
- README raiz, backend/README, backend/ARCHITECTURE e docs/README passam a referenciar [docs/deploy/](docs/deploy/README.md) para deploy e execução.

## [1.4.0] - 2026-03-12

- **Login exclusivamente por email:** endpoint `POST /api/token/` aceita apenas **email** e **password**. Serializer `CustomTokenObtainPairSerializer` resolve usuário por email (case-insensitive). Testes em `test_auth.py` atualizados.
- Documentação OpenAPI e api-spec/postman-guide/ARCHITECTURE atualizadas para email + password.

## [1.3.0] - 2026-03-11

- OpenAPI/Swagger (drf-spectacular): `/api/docs/`, `/api/schema/`. Views JWT e Contas com `@extend_schema_view`. Tags: Autenticação, Contas. README e ARCHITECTURE referenciando api-spec e data-model; endpoints de contas em `/api/accounts/`.

## [1.2.0] - 2026-03-11

- Removidos `docker-compose.yml` e `docker-compose.local.yml` do backend; orquestração na raiz. README, ARCHITECTURE e Makefile atualizados.

## [1.1.0] - 2026-01-26

- Docker (docker-entrypoint, Dockerfile com Gunicorn, docker-compose local/prod — depois removidos em 1.2.0). Settings: PostgreSQL/Redis dinâmicos, WhiteNoise, SECURE_SSL_REDIRECT. .env.example reorganizado. README, ARCHITECTURE, docs/CONTRIBUTING, postman-guide, decisions, planner-card atualizados. Removido campo `roles` do UserProfileSerializer.

## [1.0.2] - 2026-01-21

- Remoção de `__pycache__` em testes e pastas vazias `media/` e `static/`.

## [1.0.1] - 2026-01-21

- Placeholders em api-spec, data-model e business-rules. Remoção de artefatos locais do template (db, coverage, venv, caches).

## [1.0.0] - 2026-01-21

- Estrutura de docs, guias de contribuição e Postman, ADR e templates de planejamento.
