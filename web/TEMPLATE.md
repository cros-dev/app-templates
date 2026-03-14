# Como Usar o Web Como Template

Guia para adaptar o frontend Angular ao criar um novo projeto a partir deste monorepo.

## Pré-requisitos

- Node.js 18+
- npm

## Configurações iniciais

### 1. URL da API

A aplicação consome a API REST via arquivos de environment. Ajuste conforme seu backend:

- **Desenvolvimento:** `src/environments/environment.development.ts`  
  - `apiUrl`: URL base da API (ex.: `http://localhost:8000/api`).
- **Produção:** `src/environments/environment.ts`  
  - `apiUrl`: URL da API em produção (ex.: `https://sua-api.com/api`).

O build de desenvolvimento usa `environment.development.ts`; o build de produção usa `environment.ts`. Não commite credenciais ou URLs sensíveis em produção nesses arquivos; use variáveis de ambiente no pipeline de build se necessário.

### 2. Nome do pacote (opcional)

Se for publicar o frontend como pacote npm ou quiser identificar o app no `package.json`:

- Edite `package.json` e altere o campo `"name"` (ex.: de `"web"` para `"meu-projeto-web"`).

Para uso apenas interno no monorepo, manter `"name": "web"` é suficiente.

### 3. Título e marca do app

- **Título na aba do navegador:** `src/index.html` — altere a tag `<title>`.
- **Nome do projeto no Angular CLI:** `angular.json` — propriedade `projects.web` (ou o nome do projeto que estiver configurado). Renomear exige ajustar referências em `angular.json` e em scripts que usem o nome do projeto.

## Estrutura relevante

- `src/app/features/` – funcionalidades (auth, dashboard, profile, etc.)
- `src/app/core/` – serviços, guards, interceptors, modelos compartilhados
- `src/app/layouts/` – header, sidebar, layout principal
- `src/styles/` – estilos globais e tema (ex.: `theme.css`)

Para convenções de código e arquitetura, veja [ARCHITECTURE.md](./ARCHITECTURE.md) (se existir) ou [README.md](./README.md).

## Integração com o backend

- Autenticação JWT: login em `/api/token/`, refresh em `/api/token/refresh/`.
- O interceptor de auth envia o token em `Authorization: Bearer <token>`.
- Garanta que o backend tenha CORS configurado para a origem do frontend (em dev, normalmente `http://localhost:4200`). Veja `backend/.env.example` (CORS_ALLOWED_ORIGINS).

## Documentação

- **Monorepo:** [README na raiz](../README.md)
- **Backend:** [backend/README.md](../backend/README.md) · [backend/TEMPLATE.md](../backend/TEMPLATE.md)
- **API e dados:** [docs/system/api-spec.md](../docs/system/api-spec.md) · [docs/system/data-model.md](../docs/system/data-model.md)
