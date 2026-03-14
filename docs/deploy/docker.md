# Docker Compose (desenvolvimento com hot-reload)

Orquestração local do monorepo com **db** (PostgreSQL), **backend** (runserver) e **frontend** (ng serve). Código montado em volumes para hot-reload. O único compose do template é o `docker-compose.dev.yml` na raiz.

## Uso

Na raiz do repositório:

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

- **API:** `http://localhost:8000`
- **App:** `http://localhost:4200`
- **DB:** PostgreSQL 16 no serviço `db`; volume `postgres_data_dev` persiste os dados.

## Serviços

| Serviço | Descrição |
|---------|-----------|
| **db** | PostgreSQL 16 Alpine. Variáveis: `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` (defaults no compose). Healthcheck antes do backend subir. |
| **backend** | Build a partir de `./backend` (Dockerfile). Comando: `python manage.py runserver 0.0.0.0:8000`. Volume `./backend:/app` para hot-reload. Depende do `db` (healthy). |
| **frontend** | Imagem Node 20 Alpine. Comando: `npm ci && npm run start -- --host 0.0.0.0`. Volume `./web:/app` e volume anônimo para `node_modules`. Porta 4200. Depende do backend. |

## Variáveis de ambiente

Valores padrão estão definidos no `docker-compose.dev.yml`. Para sobrescrever, crie um arquivo **`.env` na raiz** do repositório. Exemplos:

- `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` (usados pelo serviço `db` e pelo `backend`)
- `CORS_ALLOWED_ORIGINS` (ex.: `http://localhost:4200`)
- `DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_EMAIL`, `DJANGO_SUPERUSER_PASSWORD` — para criar o superusuário na primeira execução (o entrypoint do backend roda `create_admin_user`)

## Superusuário no primeiro uso

O `docker-entrypoint.sh` do backend executa migrações, collectstatic e em seguida `python manage.py create_admin_user`. Se as três variáveis `DJANGO_SUPERUSER_*` estiverem definidas no ambiente (por exemplo via `.env` na raiz), o usuário será criado na primeira subida. Consulte [backend/.env.example](../../backend/.env.example) e [local.md](local.md) (comando create_admin_user).

## Rede e volumes

- **Rede:** `app-dev` (bridge), interna ao compose.
- **Volumes:** `postgres_data_dev` para dados do PostgreSQL. Volumes de código são bind mounts (`./backend`, `./web`).

## Estender o compose

O template não inclui Redis nem workers (ex.: Celery). Para adicionar:

1. Inclua o serviço (ex.: `redis`, `celery_worker`) no `docker-compose.dev.yml`.
2. Use a mesma rede `app-dev` e exponha variáveis de ambiente necessárias (ex.: `REDIS_URL`, `CELERY_BROKER_URL`).
3. Defina `depends_on` adequados (ex.: worker depende de backend e redis).
4. Mantenha o padrão de nomes de container e volumes (ex.: `app_redis_dev`, volume nomeado se precisar persistir dados).

## Frontend em produção (nginx)

O template inclui [web/nginx.conf](../../web/nginx.conf) para servir o build estático do Angular com roteamento SPA (`try_files $uri $uri/ /index.html`). Ao montar um Dockerfile de produção para o frontend, use uma imagem nginx, copie o conteúdo de `dist/web/browser/` para `/usr/share/nginx/html` e use esse `nginx.conf` como config.

## Referências

- **Backend (Dockerfile e entrypoint):** [backend/Dockerfile](../../backend/Dockerfile), [backend/docker-entrypoint.sh](../../backend/docker-entrypoint.sh)
- **Variáveis do backend:** [backend/ARCHITECTURE.md](../../backend/ARCHITECTURE.md) (seção “Precisa adaptar”)
- **Web (build e nginx):** [web/README.md](../../web/README.md) (seção "Produção (nginx)")
