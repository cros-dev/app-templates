# Logs de Auditoria

Este documento descreve o padrão de **auditoria** no backend: quem fez o quê, quando e de onde. Não substitui o logging geral da aplicação (erros, debug, monitoramento).

## Auditoria vs logging geral

| | **Logging geral** | **Auditoria** |
|---|-------------------|----------------|
| Objetivo | Depuração, monitoramento, diagnóstico | Rastreabilidade, compliance, segurança |
| Exemplos | Erros, stack traces, "request recebida" | user_login, user_logout, order_created |
| Identidade | Opcional | Importante (user_id, IP, etc.) |

Os logs de auditoria vão para o logger nomeado **`audit`** (configurado em `config/settings.py`). Por padrão saem no console; **não persistem em banco**. Para auditoria persistida (tabela, SIEM), use um model ou serviço externo.

## Onde está no código

- **core/events.py** — Constantes de eventos transversais (auth): `USER_LOGIN`, `USER_LOGOUT`, `PASSWORD_CHANGE`, `USER_CREATED`.
- **core/audit.py** — Helper `log_event(event_type, request=None, **extra)`; preenche `user_id` e `ip` quando `request` é informado.
- **accounts/views.py** — Uso: login com sucesso, logout (blacklist) e atualização de perfil disparam `log_event` com os eventos acima.

## Como usar

### Eventos de auth e perfil (já implementados)

O template já registra:

- **user_login** — Após login com sucesso (POST `/api/token/` retorna 200). Inclui email no `extra`.
- **user_logout** — Após blacklist do refresh token (POST `/api/token/blacklist/` retorna 200/204). Inclui `user_id` e `ip` quando o request está autenticado.
- **profile_updated** — Após atualização de perfil com sucesso (PUT/PATCH `/api/accounts/profile/` retorna 200). Inclui `user_id` e `ip`.

### Adicionar outros eventos de auth

Use as constantes de `core.events` e chame `log_event` no ponto certo (ex.: troca de senha, criação de usuário):

```python
from apps.core.audit import log_event
from apps.core.events import PASSWORD_CHANGE

# No view/serializer após troca de senha bem-sucedida:
log_event(PASSWORD_CHANGE, request=request)
```

### Eventos de negócio

Cada app de domínio define seus próprios nomes de evento (ex.: `order_created`, `payment_processed`, `invoice_generated`) e chama o mesmo helper:

```python
from apps.core.audit import log_event

log_event(
    "order_created",
    request=request,
    order_id=order.id,
    amount=order.total,
)
```

Mantenha nomes em **snake_case** e um conjunto estável de chaves em `extra` para facilitar consultas e alertas.

## Formato do registro

O helper grava algo como:

- **event** — Tipo do evento (string).
- **user_id** — ID do usuário autenticado (quando há `request` e usuário logado).
- **ip** — `REMOTE_ADDR` do request (quando há `request`).
- Demais campos passados em `**extra` (ex.: email, order_id).

Tudo vai no `extra` do `logger.info()`, então o formato exato depende do handler (console, JSON, etc.). Para produção, considere um handler que serialize `extra` em JSON.

## Persistência em banco

O template **não** grava auditoria em tabela. Se o projeto precisar:

1. Crie um model (ex.: `AuditLog`) e chame `AuditLog.objects.create(...)` nos mesmos pontos em que hoje chama `log_event`, ou
2. Use um handler de logging que escreva em banco/fila (ex.: Celery + worker que persiste), ou
3. Use um app como django-auditlog/django-simple-history conforme a necessidade.

---

**Status:** Padrão de auditoria no boilerplate  
**Última atualização:** 2026-03-14
