# Registro de Decisões Técnicas (ADR)

Este diretório contém o registro de decisões de arquitetura e produto do projeto criado a partir do template.

As decisões listadas abaixo são **exemplos incluídos no template**. Ao criar um novo projeto, você pode mantê-las, alterá-las ou substituir por ADRs próprias; o importante é que o time documente as escolhas que impactam o produto ou a arquitetura.

## Decisões Aceitas (exemplos do template)

1. **Backend como fonte única da verdade**
   * **Motivo:** Evitar inconsistência e fraude. Garantir que regras críticas sejam sempre validadas no servidor.
   * **Impacto:** Frontend mais simples, consistência garantida, segurança aumentada.

2. **UUID gerado pelo backend**
   * **Motivo:** Garantir unicidade e evitar conflitos em sincronização offline ou distribuída.
   * **Impacto:** UUIDs sempre únicos, evita problemas de sincronização.
   * **No template:** entidades de domínio que herdam de `apps.core.models.BaseModel` usam UUID v4 como chave primária (o `User` padrão do Django continua com id inteiro até eventual customização).

3. **Timestamp do backend para operações críticas**
   * **Motivo:** Evitar fraudes por manipulação de data/hora no cliente.
   * **Impacto:** Timestamps confiáveis, impossível fraudar horário de operações críticas.
   * **No template:** `created_at` e `updated_at` em models que herdam `BaseModel` são preenchidos pelo Django no servidor (não pelo cliente).

4. **Sincronização offline com transação atômica**
   * **Motivo:** Garantir que sincronização em lote seja consistente (tudo ou nada).
   * **Impacto:** Consistência de dados, evita estados parciais.

5. **Separação de responsabilidades (Notion/Planner/Docs)**
   * **Motivo:** Organizar informação de forma profissional, desacoplando planejamento de execução.
   * **Impacto:** Notion (produto), Planner (execução), Git/docs (conhecimento técnico).

---

**Status:** Exemplos do template (adaptar ao projeto)  
**Última atualização:** 2026-03-29
