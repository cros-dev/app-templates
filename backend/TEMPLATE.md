# Como Usar Como Template

## Pré-requisitos

- Python 3.8+
- PostgreSQL (apenas para produção)
- pip

## Uso

### Copiar e Renomear

1. Copie o projeto
2. Configure as variáveis de ambiente (veja `.env.example`)
3. Execute `pip install -r requirements.txt`
4. Execute `python manage.py migrate`
5. Configure conforme necessário (veja [ARCHITECTURE.md](./ARCHITECTURE.md))

### Com Git

1. Clone o repositório
2. Remova `.git` e inicie novo repositório (opcional)
3. Siga os passos acima

### GitHub Template

Use o botão "Use this template" no GitHub.

## Configurações Iniciais

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

- **SECRET_KEY**: Gere uma chave segura
- **DEBUG**: `true` para desenvolvimento, `false` para produção
- **ALLOWED_HOSTS**: Hosts permitidos
- **POSTGRES_***: Configurações do PostgreSQL (obrigatórias em produção)

Veja `.env.example` para todas as variáveis disponíveis.

### Banco de Dados

- **Desenvolvimento**: SQLite (automático quando `DEBUG=true`)
- **Produção**: PostgreSQL (obrigatório quando `DEBUG=false`)

### Criar Novo App

```bash
python manage.py startapp nome_do_app
mv nome_do_app apps/
```

Atualize `config/settings.py`:

```python
INSTALLED_APPS = [
    # ...
    "apps.nome_do_app",
]
```

Atualize `apps/nome_do_app/apps.py`:

```python
class NomeDoAppConfig(AppConfig):
    name = 'apps.nome_do_app'
```

Veja [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes das adaptações necessárias.

## Estrutura Incluída

- Apps base (`apps.accounts`, `apps.core`)
- Autenticação JWT configurada
- Validators, utils e permissions genéricos
- Filtros via `django-filter` (opcional)
- Testes organizados em `tests/`
- Docker configurado
- Makefile com comandos úteis
- Ferramentas de qualidade de código (veja `QUALITY.md`)
- Docs base (`docs/README.md`, `docs/CONTRIBUTING.md`, `docs/system/api-spec.md`, `docs/system/data-model.md`, `docs/system/business-rules.md`, `docs/system/postman-guide.md`, `docs/decisions/index.md`)
- Estrutura de backlog: `backlog.md` (standalone) ou `backlog-shared.md` + `backlog-{plataforma}.md` (monorepo)

## Próximos Passos

1. Configure as variáveis de ambiente
2. Execute as migrações
3. Crie um superusuário
4. Adicione seus apps específicos em `apps/`
5. Configure CORS para suas origens

## Estrutura de Documentação

### Projeto Standalone (Padrão)

Por padrão, o template mantém `docs/` dentro do diretório do backend. Isso é ideal para projetos que contêm apenas o backend Django.

```
seu-projeto/
├── backend/
│   ├── apps/
│   ├── config/
│   ├── docs/          # Documentação do backend
│   ├── README.md
│   └── ...
```

### Monorepo (Múltiplas Plataformas)

Se você estiver criando um monorepo com múltiplas plataformas (backend, frontend, mobile, etc.), é recomendado mover `docs/` para a raiz do projeto para documentação compartilhada:

```
seu-monorepo/
├── backend/           # Backend Django
├── frontend/          # Frontend React/Vue/etc
├── mobile/           # App Mobile
└── docs/             # Documentação compartilhada (movido daqui)
    ├── product/
    ├── system/
    ├── governance/
    └── ...
```

**Ao mover `docs/` para a raiz, atualize os links relativos nos seguintes arquivos:**
- `README.md`: Links para `docs/` (de `./docs/` para `../docs/`)
- `ARCHITECTURE.md`: Links para `docs/` (de `./docs/` para `../docs/`)
- `TEMPLATE.md`: Links para `docs/` (de `./docs/` para `../docs/`)

**Exemplo de atualização:**
```markdown
# Antes (docs dentro do backend)
- [docs/README.md](./docs/README.md)

# Depois (docs na raiz do monorepo)
- [docs/README.md](../docs/README.md)
```

## Notas

- Migrations são ignoradas no Git (exceto `__init__.py`)
- O template usa JWT com blacklist de tokens
- Por padrão, todas as views requerem autenticação
