# core

App de funcionalidades compartilhadas do backend.

## Conteúdo

- **Health:** view `health` em `views.py` (GET `/api/health/`); rota em `config/urls.py`.
- **Validators:** `validate_cpf`, `validate_cnpj` em `validators.py`.
- **Utils:** `format_phone`, `format_cpf`, `format_cnpj` em `utils.py`.
- **Permissions:** `IsOwnerOrReadOnly` em `permissions.py`.
- **Models:** `BaseModel` em `models.py` (abstrato: UUID `id`, `created_at`, `updated_at`, `is_active` para soft delete). Models de domínio novos herdam dele; o `User` padrão do Django não.
- **Auditoria:** constantes em `events.py` (USER_LOGIN, USER_LOGOUT, PROFILE_UPDATED, etc.); helper `log_event()` em `audit.py`. Logs vão para o logger `audit`; não persistem em banco. Carimbos em banco (`created_at` / `updated_at`) vêm do `BaseModel` quando aplicável. Ver [docs/system/audit-logging.md](../../../docs/system/audit-logging.md).
- **Management commands:** `create_admin_user` (lê `DJANGO_SUPERUSER_*` do .env e cria superusuário); usado no Docker entrypoint e em execução nativa.

## Estrutura

```
core/
├── management/commands/
│   └── create_admin_user.py
├── models.py         # BaseModel (abstrato)
├── views.py          # health
├── validators.py
├── utils.py
├── permissions.py
├── events.py         # constantes de eventos de auditoria (auth)
├── audit.py          # log_event(), get_audit_logger()
└── tests/
```

Endpoints do core (ex.: `/api/health/`) são registrados em `config/urls.py`.
