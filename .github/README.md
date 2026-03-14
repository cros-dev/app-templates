# GitHub

Configuração e automação do repositório no GitHub.

## workflows/

- **ci.yml** — CI no push e em pull requests para as branches `master` e `dev`:
  - **backend:** Python 3.12, `black --check`, `flake8`, `pytest` (working-directory: `backend`).
  - **web:** Node 20, `npm ci`, `ng build` (working-directory: `web`).

Para adicionar novos workflows (ex.: release, deploy), crie arquivos `.yml` em `workflows/` e documente-os aqui.
