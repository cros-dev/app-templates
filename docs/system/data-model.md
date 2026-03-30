## Modelo de Dados (Base)

Este documento descreve o modelo de dados em alto nível.

### Usuário (`django.contrib.auth.models.User`)

O template usa o **User padrão do Django** (sem `AUTH_USER_MODEL` customizado). Ele **não** herda de `BaseModel`.

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| id | Integer (AutoField) | Sim | Chave primária |
| username | String | Sim | Nome de usuário |
| email | String | Não | Email |
| is_active | Boolean | Sim | Usuário ativo |
| date_joined | DateTime | Sim | Data/hora de cadastro (campo padrão do Django) |

### Entidades de domínio — `BaseModel` (`apps.core.models`)

Para **novos models** de negócio, o padrão do template é herdar de **`BaseModel`** (model abstrato): UUID como `id`, carimbo de criação/atualização e suporte a soft delete. Detalhes e relação com auditoria por eventos: [audit-logging.md](audit-logging.md).

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| id | UUID (v4) | Sim | Chave primária, gerada pelo backend |
| created_at | DateTime | Sim | Preenchido na criação |
| updated_at | DateTime | Sim | Atualizado a cada `save` |
| is_active | Boolean | Sim | Padrão `True`; uso típico em soft delete |

---

**Status:** Documento base (adaptar por projeto)  
**Última atualização:** 2026-03-29
