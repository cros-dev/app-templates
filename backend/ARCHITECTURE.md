# Arquitetura do Template

Este documento descreve o que é genérico (pronto para uso) e o que precisa ser adaptado.

## Genérico - Pronto para Uso

Estes componentes podem ser usados sem modificações:

### Apps Base

**apps.accounts**
- Serializers genéricos para User do Django (`UserSerializer`, `UserProfileSerializer`)
- Views para perfil e detalhes de usuário
- Endpoints: `/api/users/profile/` e `/api/users/<id>/`
- Configuração do Django Admin para User

**apps.core**
- Validators genéricos (`validate_cpf`, `validate_cnpj`)
- Funções utilitárias (`format_phone`, `format_cpf`, `format_cnpj`)
- Permissão customizada (`IsOwnerOrReadOnly`)

**Filtros**
- Suporte a filtros com `django-filter` para endpoints de listagem

### Autenticação JWT

**Endpoints JWT**
- `POST /api/token/` - Obter token (login)
- `POST /api/token/refresh/` - Renovar access token
- `POST /api/token/verify/` - Verificar token

**Configuração**
- JWT com blacklist de tokens habilitado
- Rotação de refresh tokens
- Tempo de vida configurável via variáveis de ambiente

### Configurações

**settings.py**
- Carrega automaticamente o arquivo **`.env`**. Em ambientes Docker, as variáveis injetadas pelo Compose têm prioridade.
- **Banco de Dados**: Prioriza PostgreSQL se as variáveis estiverem definidas; caso contrário, usa SQLite em modo DEBUG.
- **Segurança**: HTTPS forçado em produção via `SECURE_SSL_REDIRECT` (configurável via env var).
- **Cache**: Usa Redis dinamicamente se `REDIS_URL` estiver definido, senão LocMemCache.
- **WhiteNoise**: Middleware configurado para servir arquivos estáticos em produção.
- CORS configurado (permissivo em dev, restritivo em prod)
- Logging configurado
- I18N configurável

**Ambientes**
- **Execução Nativa**: Uso de **`.env`** (SQLite/Cache Local) via `python manage.py runserver`.
- **Execução Docker Local**: Uso de **`.env.local`** (Postgres/Redis) via `docker-compose.local.yml`.
- **Deploy (Homol/Prod)**: Uso de **`.env`** (Postgres Externo/Nginx) via `docker-compose.yml`.

**Docker**
- `Dockerfile` configurado com Gunicorn
- `docker-compose.yml` para produção e homologação (PostgreSQL externo, Redis incluído, bind mounts customizáveis para static/media)
- `docker-compose.local.yml` para desenvolvimento local (PostgreSQL e Redis incluídos)
- `docker-entrypoint.sh` com timeout, migrate, collectstatic e criação de superusuário

**Makefile**
- Comandos úteis para desenvolvimento e Docker
- Comandos separados para desenvolvimento local (`-local`) e produção

**Qualidade de código**
- Configurações de `black`, `flake8`, `pytest` e `coverage`
- Referência em `QUALITY.md`

### Testes

- Estrutura organizada em `tests/` dentro de cada app
- Testes básicos para serializers, views e autenticação
- Testes para validators, utils e permissions

### Documentação

- Estrutura consolidada em [`docs/README.md`](./docs/README.md)
- Guia de contribuição em [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md)
- ADRs em [`docs/decisions/index.md`](./docs/decisions/index.md)

## Precisa Adaptar

### 1. Variáveis de Ambiente

Arquivos: **`.env`** (produção ou nativo) ou **`.env.local`** (Docker local)

**Obrigatórias:**
- `SECRET_KEY`: Gere uma chave segura
- `DEBUG`: `true` ou `false`
- `ALLOWED_HOSTS`: Hosts permitidos

**PostgreSQL (obrigatórias quando variáveis estiverem definidas):**
- `POSTGRES_DB`: Nome do banco
- `POSTGRES_USER`: Usuário do PostgreSQL
- `POSTGRES_PASSWORD`: Senha do PostgreSQL
- `POSTGRES_HOST`: Host do PostgreSQL (`db` no Docker local, host/IP externo em produção)
- `POSTGRES_PORT`: Porta do PostgreSQL (padrão: `5432`)

**Opcionais:**
- `SECURE_SSL_REDIRECT`: Força HTTPS (padrão: `True` em produção)
- `JWT_ACCESS_MINUTES`: Tempo de vida do access token (padrão: 5)
- `JWT_REFRESH_DAYS`: Tempo de vida do refresh token (padrão: 1)
- `CORS_ALLOWED_ORIGINS`: Origens permitidas para CORS
- `LANGUAGE_CODE`: Código do idioma (padrão: `pt-br`)
- `TIME_ZONE`: Timezone (padrão: `UTC`)
- `REDIS_URL`: URL do Redis (`redis://redis:6379/1` no Docker, `redis://127.0.0.1:6379/1` fora)
- `GUNICORN_WORKERS`: Número de workers do Gunicorn (padrão: `2`)
- `STATIC_ROOT_HOST`: Caminho absoluto no host para arquivos estáticos (produção)
- `MEDIA_ROOT_HOST`: Caminho absoluto no host para arquivos de mídia (produção)
- `DJANGO_SUPERUSER_*`: Variáveis para criação automática de superusuário (apenas desenvolvimento)

### 2. Filtros (Opcional)

Dependência: `django-filter`

Para usar filtros em views, adicione `DjangoFilterBackend` e defina `filterset_fields`:

```python
from django_filters.rest_framework import DjangoFilterBackend

class ExampleViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "created_at"]
```

### 3. CORS

Arquivo: `config/settings.py`

Em produção, configure `CORS_ALLOWED_ORIGINS` no `.env` com as origens permitidas.

### 4. Models e Apps

Pasta: `apps/`

Crie seus apps específicos em `apps/` seguindo o padrão:

```bash
python manage.py startapp meu_app
mv meu_app apps/
```

Atualize `config/settings.py` e `apps/meu_app/apps.py`.

### 5. Customização do User (Opcional)

Se precisar de campos adicionais no User, crie um modelo customizado:

```python
# apps/accounts/models.py
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Seus campos customizados
    pass
```

Atualize `config/settings.py`:

```python
AUTH_USER_MODEL = 'accounts.User'
```

**Nota:** Faça isso antes de executar as primeiras migrações.

### 6. Validators (Opcional)

Arquivo: `apps/core/validators.py`

O validator de CPF implementa dígitos verificadores. O validator de CNPJ é básico; para validação completa, considere usar biblioteca externa.

## Checklist de Adaptação

- [ ] Configurar `SECRET_KEY` no `.env`
- [ ] Configurar `DEBUG` e `ALLOWED_HOSTS`
- [ ] Configurar PostgreSQL (se produção)
- [ ] Configurar `CORS_ALLOWED_ORIGINS` (se produção)
- [ ] Configurar caminhos de volume (`STATIC_ROOT_HOST`, `MEDIA_ROOT_HOST`) para produção
- [ ] Configurar Redis para cache em produção (opcional)
- [ ] (Opcional) Customizar modelo User
- [ ] Criar apps específicos do projeto
- [ ] (Opcional) Ajustar validators se necessário
- [ ] Renomear projeto se necessário

## Estrutura de Apps

```
apps/
├── accounts/          # App de autenticação (genérico)
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── tests/
├── core/              # Funcionalidades compartilhadas (genérico)
│   ├── validators.py
│   ├── utils.py
│   ├── permissions.py
│   └── tests/
└── seu_app/           # Seus apps específicos
    └── ...
```

## Notas Importantes

- **Migrations**: São ignoradas no Git (exceto `__init__.py`) para manter o template genérico
- **Autenticação**: Por padrão, todas as views requerem autenticação JWT
- **Paginação**: Padrão de 20 itens por página
- **Cache**: LocMemCache por padrão, Redis dinâmico se `REDIS_URL` estiver definido
- **Docker**: Use `docker-compose.local.yml` para ambiente local e `docker-compose.yml` para deploy (Homol/Prod)
