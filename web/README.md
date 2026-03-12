# Web (Angular)

Frontend do boilerplate monorepo. Aplicação Angular que consome a API REST do backend (`/api/`).

## Estrutura

O projeto segue a estrutura padrão do Angular CLI. Principais pastas:

- `src/app/features/` – Módulos por funcionalidade (auth, dashboard, profile, etc.)
- `src/app/core/` – Serviços, guards, interceptors e modelos compartilhados
- `src/app/layouts/` – Layouts (header, sidebar, main-layout)
- `src/environments/` – Configurações por ambiente (API base URL, etc.)

## Pré-requisitos

- Node.js 18+
- npm

## Desenvolvimento

```bash
npm install
ng serve
```

Acesse `http://localhost:4200/`. O backend deve estar rodando em `http://localhost:8000` (ou configure a URL da API em `src/environments/`).

## Comandos úteis

| Comando     | Descrição                    |
|------------|------------------------------|
| `ng serve` | Servidor de desenvolvimento  |
| `ng build` | Build de produção (`dist/`)  |
| `ng test`  | Testes unitários (Vitest)     |
| `ng e2e`   | Testes end-to-end (se configurado) |

Para mais comandos: `ng help` ou [Angular CLI](https://angular.dev/tools/cli).

## Integração com a API

- A autenticação usa JWT (login em `/api/token/`, refresh em `/api/token/refresh/`).
- O interceptor de auth envia o token no header `Authorization: Bearer <token>`.
- A URL base da API é configurada em `src/environments/environment*.ts`.

## Documentação

- **Monorepo:** [README na raiz](../README.md)
- **Backend:** [backend/README.md](../backend/README.md) · Swagger: `http://localhost:8000/api/docs/` (com backend rodando)
- **Especificação da API:** [docs/system/api-spec.md](../docs/system/api-spec.md) · [docs/system/data-model.md](../docs/system/data-model.md)
- **Docs compartilhadas:** [docs/README.md](../docs/README.md)

## Stack

- Angular 21
- Angular Material (conforme projeto)
- Vitest para testes unitários
