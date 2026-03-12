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

### 2. Backend

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Ajuste .env (deixe variáveis de banco vazias para SQLite em dev)
python manage.py migrate
python manage.py runserver
```

API em `http://localhost:8000`.

### 3. Web

```bash
cd web
npm install
ng serve
```

App em `http://localhost:4200`.

### 4. Onde está cada coisa

- **Configuração:** `backend/.env.example` e [backend/TEMPLATE.md](backend/TEMPLATE.md) (uso como template, env, novos apps).
- **Documentação compartilhada:** [docs/README.md](docs/README.md) (estrutura de product/, system/, decisões). Especificação da API e modelo de dados: [docs/system/api-spec.md](docs/system/api-spec.md), [docs/system/data-model.md](docs/system/data-model.md).
- **Swagger (API):** com o backend rodando, [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/).

## Documentação

| Onde | Papel |
|------|--------|
| [backend/README.md](backend/README.md) | Como rodar o backend, scripts, links para especificação |
| [backend/TEMPLATE.md](backend/TEMPLATE.md) | Adaptar o template (env, apps, monorepo) |
| [backend/ARCHITECTURE.md](backend/ARCHITECTURE.md) | Arquitetura e convenções do backend |
| [backend/QUALITY.md](backend/QUALITY.md) | Qualidade de código (black, flake8, pytest) |
| [web/README.md](web/README.md) | Como rodar o frontend, integração com a API |
| [docs/README.md](docs/README.md) | Índice da doc compartilhada (system, product, decisões) |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Padrão de commits e contribuição |

## Stack

- **Backend:** Django 6, Django REST Framework, Simple JWT, drf-spectacular (OpenAPI/Swagger), django-cors-headers, PostgreSQL (prod) ou SQLite (dev).
- **Web:** Angular 21, Angular Material (conforme projeto).

## Licença

Conforme definido no repositório.
