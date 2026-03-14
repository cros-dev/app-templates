# Execução nativa (desenvolvimento no host)

Rodar backend e frontend diretamente na máquina, sem Docker. Ideal para desenvolvimento diário com SQLite e cache local.

## Backend

Na pasta do backend:

```bash
cd backend
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

- **API:** `http://localhost:8000`
- **Swagger:** `http://localhost:8000/api/docs/`
- **Banco:** SQLite (arquivo no backend) quando as variáveis PostgreSQL não estão definidas no `.env`.
- **Superusuário:** O comando `create_admin_user` lê `DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_EMAIL` e `DJANGO_SUPERUSER_PASSWORD` do `.env` e cria o usuário se ainda não existir. O mesmo comando é usado no Docker (entrypoint).

## Web

Na pasta do web:

```bash
cd web
npm install
ng serve
```

- **App:** `http://localhost:4200`
- **API:** O frontend usa a URL configurada em `web/src/environments/environment.development.ts` (por padrão `http://localhost:8000/api`). Garanta que o backend esteja rodando e que o CORS no backend permita `http://localhost:4200` (ver `backend/.env.example`, `CORS_ALLOWED_ORIGINS`).

## Configuração

- **Backend:** Copie `backend/.env.example` para `backend/.env`. Para execução nativa com SQLite, deixe as variáveis de PostgreSQL vazias. Consulte [backend/TEMPLATE.md](../../backend/TEMPLATE.md) e [backend/ARCHITECTURE.md](../../backend/ARCHITECTURE.md) para variáveis e convenções.
- **Web:** Ajuste a URL da API em `web/src/environments/` conforme [web/TEMPLATE.md](../../web/TEMPLATE.md) ao criar um projeto a partir do template.

## Scripts úteis (backend)

| Comando | Descrição |
|---------|-----------|
| `make run` / `python manage.py runserver` | Servidor de desenvolvimento |
| `make migrate` / `make makemigrations` | Migrações |
| `python manage.py create_admin_user` | Cria superusuário com credenciais do .env |
| `make check` | format + lint + test-cov |
