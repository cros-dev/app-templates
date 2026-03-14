# core

App de funcionalidades compartilhadas do backend.

## Conteúdo

- **Health:** view `health` em `views.py` (GET `/api/health/`); rota em `config/urls.py`.
- **Validators:** `validate_cpf`, `validate_cnpj` em `validators.py`.
- **Utils:** `format_phone`, `format_cpf`, `format_cnpj` em `utils.py`.
- **Permissions:** `IsOwnerOrReadOnly` em `permissions.py`.
- **Management commands:** `create_admin_user` (lê `DJANGO_SUPERUSER_*` do .env e cria superusuário); usado no Docker entrypoint e em execução nativa.

## Estrutura

```
core/
├── management/commands/
│   └── create_admin_user.py
├── views.py          # health
├── validators.py
├── utils.py
├── permissions.py
└── tests/
```

Endpoints do core (ex.: `/api/health/`) são registrados em `config/urls.py`.
