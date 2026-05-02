# Scripts

## Safe commands

- `npm run test`: run unit and integration tests.
- `npm run test:coverage`: generate coverage in `coverage/`.
- `npm run test:e2e`: run Playwright E2E tests.
- `npm run audit:deps`: run `npm audit --omit=dev`.
- `npm run audit:secrets`: scan the repo for obvious committed secrets.
- `npm run infra:check`: validate current infra files and Supabase migration presence.
- `npm run infra:generate`: generate `.env.local.example` from `infra/environments/dev.json`.

## CI-oriented commands

- `npm run quality`: local quality gate.
- `npm run quality:ci`: CI quality gate.

## Dangerous commands

- `npm run infra:apply`: intentionally disabled until a real IaC stack exists.
- `npm run infra:destroy`: intentionally disabled and returns non-zero.

Never put real secrets in generated env examples or logs.
