# Deploy e execução

Documentação centralizada de como rodar o monorepo em desenvolvimento e as opções de orquestração. As orientações que antes estavam nos READMEs do backend e da raiz estão consolidadas aqui.

## Visão geral

| Modo | Quando usar | Onde está |
|------|-------------|-----------|
| **Execução nativa** | Desenvolvimento no host (SQLite, sem containers) | [local.md](local.md) |
| **Docker Compose** | Backend + frontend + PostgreSQL em containers (hot-reload) | [docker.md](docker.md) |

## Pré-requisitos

- **Backend (nativo):** Python 3.8+, pip. PostgreSQL só é obrigatório em produção ou se usar Docker.
- **Web (nativo):** Node.js 18+, npm.
- **Docker:** Docker e Docker Compose na máquina para o modo [docker.md](docker.md).

## Orquestração no monorepo

Toda orquestração (compose, múltiplos serviços) fica na **raiz do repositório**. O backend contém apenas o `Dockerfile` e o `docker-entrypoint.sh`; o frontend não possui Dockerfile no template (é servido pelo compose via imagem Node quando usa [docker.md](docker.md)).

## Documentos

- **[local.md](local.md)** — Rodar backend (runserver) e web (ng serve) no host; create_admin_user; .env.
- **[docker.md](docker.md)** — `docker-compose.dev.yml`: db, backend, frontend; variáveis; superusuário; como estender (Redis, workers).

---

**Status:** Documentação de deploy consolidada  
**Última atualização:** 2026-03-11
