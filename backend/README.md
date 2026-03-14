# Backend (Django REST + JWT)

API REST com Django + DRF + JWT. Parte do monorepo [app-templates](../README.md).

## Execução nativa

Usa SQLite e cache local (ideal para dev). Na pasta do backend:

```bash
python -m venv venv
# Windows: venv\Scripts\activate  |  Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Deixe variáveis de banco vazias para SQLite
python manage.py migrate
# Opcional: preencha DJANGO_SUPERUSER_* no .env e rode:
python manage.py create_admin_user
python manage.py runserver
```

Acesse `http://localhost:8000`. Documentação interativa: `http://localhost:8000/api/docs/`. O mesmo comando `create_admin_user` roda no Docker (entrypoint) e localmente; em ambos os casos as credenciais vêm do `.env` (DJANGO_SUPERUSER_USERNAME, EMAIL, PASSWORD).

## Configuração

- **Nativo:** copie `.env.example` para `.env` (banco vazio = SQLite).
- **Deploy e Docker:** orquestração e orientações em [docs/deploy/](../docs/deploy/README.md) (local e docker-compose.dev.yml).

## Estrutura

```
apps/
├── accounts/   # Autenticação JWT + perfil e usuários
├── core/       # Utilitários compartilhados
└── ...         # Seus apps
```

## Endpoints e modelo de dados

- **Endpoints:** [docs/system/api-spec.md](../docs/system/api-spec.md)
- **Modelo de dados:** [docs/system/data-model.md](../docs/system/data-model.md)

Documentação interativa (Swagger): [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/) · Schema OpenAPI: [http://localhost:8000/api/schema/](http://localhost:8000/api/schema/).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `make help` | Lista comandos |
| `make run` / `python manage.py runserver` | Servidor de desenvolvimento |
| `make migrate` / `make makemigrations` | Migrações |
| `python manage.py create_admin_user` | Cria superusuário com credenciais do .env (Docker e local) |
| `make format` / `make lint` / `make test-cov` | Qualidade (black, flake8, pytest) |
| `make check` | format + lint + test-cov |

## Tecnologias

Django 6 · DRF · Simple JWT · drf-spectacular (OpenAPI) · django-cors-headers · django-filter · PostgreSQL (prod) / SQLite (dev).

## Documentação

**Deste pacote:** [TEMPLATE.md](./TEMPLATE.md) (uso como template) · [ARCHITECTURE.md](./ARCHITECTURE.md) (convenções) · [QUALITY.md](./QUALITY.md) (qualidade). **Histórico do template (incl. backend):** [../CHANGELOG.md](../CHANGELOG.md).

**Compartilhada (docs/):** [api-spec](../docs/system/api-spec.md) · [data-model](../docs/system/data-model.md) · [business-rules](../docs/system/business-rules.md) · [postman-guide](../docs/system/postman-guide.md) · [decisions](../docs/decisions/index.md) · [CONTRIBUTING](../docs/CONTRIBUTING.md).

## Recursos

[Django](https://docs.djangoproject.com/) · [DRF](https://www.django-rest-framework.org/) · [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/) · [drf-spectacular](https://drf-spectacular.readthedocs.io/)
