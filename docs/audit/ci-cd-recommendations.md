# CI/CD Recommendations

## Pipeline recommandée

1. Checkout
2. Setup Node
3. Install dependencies with `npm ci`
4. Lint
5. Typecheck
6. Unit tests
7. Coverage
8. Integration tests
9. Build
10. Dependency audit
11. Secret scanning
12. Infrastructure validation
13. E2E on preview environment when Supabase test auth is configured

## Règles

- Pas de déploiement production automatique depuis cette pipeline qualité.
- Ne jamais logger de secrets.
- Bloquer les PR si lint/typecheck/tests/build échouent.
- Ajouter branch protection sur `main`.
- Ajouter Dependabot/Renovate pour upgrades.

## E2E

Les E2E actuels couvrent les parcours publics et cookies. Les parcours authentifiés complets doivent utiliser un Supabase de test ou des comptes seedés.
