## Modelo de Dados (Base)

Este documento descreve o modelo de dados em alto nível.

### Usuário

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| id | UUID/Int | Sim | Identificador |
| username | String | Sim | Nome de usuário |
| email | String | Não | Email |
| is_active | Boolean | Sim | Status |
| created_at | DateTime | Sim | Criação |

---

**Status:** Documento base (adaptar por projeto)  
**Última atualização:** 2026-01-21
