# app-templates

Boilerplate monorepo com **backend** (Django REST + JWT) e **web** (Angular), pronto para ser usado como base em novos projetos.

## Estrutura

```
app-templates/
├── backend/          # API REST – Django, DRF, JWT
├── web/              # Frontend – Angular
├── docs/             # Documentação compartilhada (produto, sistema, decisões)
└── README.md         # Este arquivo
```

## Pré-requisitos

- **Backend:** Python 3.8+, pip (PostgreSQL apenas para produção ou Docker local)
- **Web:** Node.js 18+, npm

## Início rápido

### 1. Usar como template

- **GitHub:** use o botão **"Use this template"** no repositório.
- **Cópia local:** clone o repositório, opcionalmente remova `.git` e inicie um novo (`git init`).

### 2. Ao criar um projeto a partir do template

Siga esta checklist para deixar o novo projeto consistente:

| Onde | O que fazer |
|------|-------------|
| **Backend** | Copiar `backend/.env.example` → `backend/.env`; ajustar `SECRET_KEY`, `ALLOWED_HOSTS` e, se for usar PostgreSQL/Redis, preencher as variáveis correspondentes. Ver [backend/TEMPLATE.md](backend/TEMPLATE.md). |
| **Web** | Ajustar a URL da API em `web/src/environments/environment.development.ts` (dev) e `web/src/environments/environment.ts` (prod). Ver [web/TEMPLATE.md](web/TEMPLATE.md). |
| **Docs** | Preencher `docs/product/vision.md` (público, escopo do MVP, etc.) conforme o novo produto. |
| **Opcional** | Renomear o repositório; trocar título em `web/src/index.html`; ajustar `web/package.json` name e CORS no backend (`.env`) se a origem do front for diferente de `http://localhost:4200`. |

### 3. Rodar o projeto

- **Execução nativa (backend + web no host):** [docs/deploy/local.md](docs/deploy/local.md) — runserver, ng serve, create_admin_user, .env.
- **Docker Compose (tudo em containers com hot-reload):** [docs/deploy/docker.md](docs/deploy/docker.md) — `docker compose -f docker-compose.dev.yml up -d --build` na raiz.

Resumo rápido nativo: `cd backend && pip install -r requirements.txt && cp .env.example .env && python manage.py migrate && python manage.py create_admin_user && python manage.py runserver` (API em :8000). Em outro terminal: `cd web && npm install && ng serve` (app em :4200).

### 4. Onde está cada coisa

- **Deploy e execução:** [docs/deploy/](docs/deploy/README.md) (local e Docker).
- **Configuração:** `backend/.env.example` e [backend/TEMPLATE.md](backend/TEMPLATE.md) (backend); [web/TEMPLATE.md](web/TEMPLATE.md) (frontend).
- **Documentação compartilhada:** [docs/README.md](docs/README.md) (estrutura de product/, system/, decisões). Especificação da API e modelo de dados: [docs/system/api-spec.md](docs/system/api-spec.md), [docs/system/data-model.md](docs/system/data-model.md). Auditoria: [docs/system/audit-logging.md](docs/system/audit-logging.md).
- **Swagger (API):** com o backend rodando, [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/).

## Documentação

| Onde | Papel |
|------|--------|
| [backend/README.md](backend/README.md) | Como rodar o backend, scripts, links para especificação |
| [backend/TEMPLATE.md](backend/TEMPLATE.md) | Adaptar o template (env, apps, monorepo) |
| [backend/ARCHITECTURE.md](backend/ARCHITECTURE.md) | Arquitetura e convenções do backend |
| [backend/QUALITY.md](backend/QUALITY.md) | Qualidade de código (black, flake8, pytest) |
| [web/README.md](web/README.md) | Como rodar o frontend, integração com a API |
| [web/ARCHITECTURE.md](web/ARCHITECTURE.md) | Arquitetura e convenções do frontend |
| [web/TEMPLATE.md](web/TEMPLATE.md) | Adaptar o front (environment, nome, título) |
| [docs/README.md](docs/README.md) | Índice da doc compartilhada (system, product, decisões) |
| [docs/deploy/](docs/deploy/README.md) | Deploy e execução (local e Docker) |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Padrão de commits e contribuição |

## Stack

- **Backend:** Django 6, Django REST Framework, Simple JWT, drf-spectacular (OpenAPI/Swagger), django-cors-headers, PostgreSQL (prod) ou SQLite (dev).
- **Web:** Angular 21, Angular Material (conforme projeto).

## CI

O repositório usa GitHub Actions (`.github/workflows/ci.yml`): CI roda em push e em pull requests para as branches `master` e `dev`. **Backend:** Python 3.12, `black --check`, `flake8`, `pytest` (working-directory: `backend`). **Web:** Node 20, `npm ci`, `ng build` (working-directory: `web`). Para novos workflows (ex.: release, deploy), crie `.yml` em `.github/workflows/` e documente em [docs/deploy/](docs/deploy/README.md) ou no README conforme o caso.

## Licença

Conforme definido no repositório.
