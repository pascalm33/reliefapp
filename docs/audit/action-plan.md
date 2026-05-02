# Action Plan

| Priorité | Sujet | Action | Impact | Effort | Fichier concerné | Commande de validation |
|---|---|---|---|---|---|---|
| Quick wins | Tests métier | Maintenir tests scoring/reports/recommendations. | Haut | S | `test/unit/*` | `npm run test` |
| Quick wins | Headers sécurité | Revoir CSP pour production. | Moyen | S | `next.config.mjs` | `npm run build` |
| Quick wins | Secrets | Activer secret scan en CI. | Haut | S | `.github/workflows/quality.yml` | `npm run audit:secrets` |
| Quick wins | Inputs | Ajouter Zod sur check-in/action/profile. | Haut | M | `app/(protected)/app/actions.ts` | `npm run test` |
| Court terme | RLS | Tester policies avec Supabase local. | Haut | M | `supabase/migrations/*` | `npm run test:integration` |
| Court terme | E2E auth | Tester login/logout/check-in/report avec env test. | Haut | M | `e2e/*` | `npm run test:e2e` |
| Court terme | Audit dépendances | Automatiser upgrades et audit. | Moyen | S | `package.json` | `npm run audit:deps` |
| Court terme | Infra validation | Ajouter Supabase CLI checks. | Moyen | M | `scripts/infra/check.sh` | `npm run infra:check` |
| Moyen terme | Monitoring | Ajouter logs structurés et alerting auth/security. | Moyen | M | Runtime hosting | N/A |
| Moyen terme | Threat model | Documenter auth, RLS, OAuth, cookies. | Haut | M | `docs/audit/security-audit.md` | Revue sécurité |
| Moyen terme | ASVS | Revue ASVS complète niveau 1. | Moyen | L | `docs/audit/owasp-checklist.md` | Revue sécurité |
