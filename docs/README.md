# Documentação Técnica - Monorepo

Esta pasta contém documentação técnica **compartilhada** para o monorepo (backend + web). Projetos criados a partir deste boilerplate podem adaptar a estrutura conforme [backend/TEMPLATE.md](../backend/TEMPLATE.md).

## Estrutura

```
docs/
├── product/                # Visão e backlog (placeholders)
│   ├── vision.md           # Visão geral do produto
│   ├── backlog.md          # Épicos e backlog (alto nível) - para projetos standalone
│   └── backlog-shared.md    # Cards multi-plataforma - para monorepos
├── system/                 # Documentação técnica do sistema
│   ├── api-spec.md         # Especificação de API (base)
│   ├── data-model.md       # Modelo de dados (base)
│   ├── business-rules.md   # Regras de negócio (base)
│   └── postman-guide.md    # Padrão de uso do Postman
├── governance/             # Papéis e responsabilidades
│   └── roles.md            # Papéis funcionais (negócio)
├── decisions/              # Registro de decisões (ADR)
│   └── index.md            # Índice de decisões
├── templates/              # Templates e guias
│   └── planner-card.md     # Padrão de card (Planner)
├── CONTRIBUTING.md         # Guia de contribuição e commits
└── README.md               # Este arquivo
```

## Estrutura de Backlog

### Projeto Standalone (Padrão)

Para projetos com apenas backend, use `backlog.md`:

```
docs/product/
├── vision.md
└── backlog.md          # Todos os épicos e cards
```

### Monorepo (Múltiplas Plataformas)

Para monorepos com múltiplas plataformas, separe os backlogs:

```
docs/product/
├── vision.md
├── backlog-shared.md    # Cards multi-plataforma
├── backlog-backend.md   # Cards específicos do backend
├── backlog-web.md       # Cards específicos do frontend
└── backlog-mobile.md    # Cards específicos do mobile (se aplicável)
```

**Regra:** Cards que afetam múltiplas plataformas vão em `backlog-shared.md`. Cards específicos de uma plataforma vão em `backlog-{plataforma}.md`.

## Navegação rápida (system/)

Especificação e padrões do sistema: [api-spec.md](system/api-spec.md) (endpoints) · [data-model.md](system/data-model.md) (modelo de dados) · [business-rules.md](system/business-rules.md) (regras de negócio) · [postman-guide.md](system/postman-guide.md) (Postman).

## Documentação por plataforma

Documentação técnica específica fica em cada pacote:

- **Backend:** [backend/ARCHITECTURE.md](../backend/ARCHITECTURE.md) | [backend/QUALITY.md](../backend/QUALITY.md)
- **Web:** [web/README.md](../web/README.md) | [web/ARCHITECTURE.md](../web/ARCHITECTURE.md)

## Fonte da Verdade

Separação recomendada para manter a informação organizada:

1. **Git (`docs/`)**: Documentação técnica estável e padrões.
2. **Notion** (opcional): Documentação de produto colaborativa.
3. **Planner** (opcional): Execução diária (tasks, bugs, code reviews).

---

**Status:** Estrutura de documentação base  
**Última atualização:** 2026-01-21
