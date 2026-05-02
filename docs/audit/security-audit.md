# Security Audit

Approche : OWASP Top 10, ASVS léger, bonnes pratiques Next.js/Supabase.

| ID | Risque | Niveau | Zone | Description | Impact | Recommandation | Effort | Priorité |
|---|---|---|---|---|---|---|---|---|
| SEC-001 | RLS non testée automatiquement | Haut | Supabase | Les policies RLS existent mais ne sont pas validées en CI contre une base Supabase locale. | Accès inter-utilisateur possible si policy cassée non détectée. | Ajouter Supabase local + tests isolation `user_id`. | M | P1 |
| SEC-002 | Validation inputs insuffisante | Haut | Server actions | Les check-ins/actions sont typés TS mais pas validés runtime. | Données incohérentes, contournement client. | Ajouter Zod côté server actions. | M | P1 |
| SEC-003 | Rate limiting absent | Moyen | Auth | Login/register/forgot-password dépendent de Supabase, pas de contrôle applicatif complémentaire. | Bruteforce, abuse. | Configurer protections Supabase + WAF/Vercel rate limit si besoin. | M | P2 |
| SEC-004 | OAuth dépend de config externe | Moyen | Auth | Google/Apple peuvent échouer si providers non activés. | UX cassée, erreurs auth. | Documenter config providers et tests smoke. | S | P2 |
| SEC-005 | CSP permissive en dev | Moyen | Headers | CSP inclut `unsafe-inline` et `unsafe-eval` pour compat Next/dev. | XSS blast radius plus élevé. | Durcir CSP prod avec nonce si possible. | L | P2 |
| SEC-006 | Secret scanning basique | Moyen | Repo | Script regex ajouté, mais pas scanner spécialisé. | Secrets peuvent passer. | Ajouter Gitleaks/TruffleHog en CI. | S | P1 |
| SEC-007 | Logs non structurés | Bas | Runtime | Logs minimalistes, pas de stratégie monitoring. | Diagnostic incident limité. | Ajouter observabilité et éviter PII. | M | P3 |
| SEC-008 | CSRF non analysée en profondeur | Moyen | Server actions | Mutations server actions utilisent cookies de session Supabase. | Risque à évaluer selon mécanismes Next/Supabase. | Ajouter threat model CSRF et vérifications Origin si nécessaire. | M | P2 |
| SEC-009 | Dépendances avec advisories npm | Moyen | Supply chain | `npm audit` rapporte 2 vulnérabilités modérées selon état actuel. | Risque supply chain / vuln framework. | Surveiller versions Next/PostCSS et appliquer patchs sûrs. | S | P1 |
| SEC-010 | Absence d’a11y automatisée | Bas | UX/Security-adjacent | Pas de test axe. | Régressions d’accès et conformité. | Ajouter `@axe-core/playwright`. | S | P3 |

## Observations positives

- Pas de mot de passe stocké applicativement.
- Supabase Auth utilisé.
- Routes `/app/*` protégées via proxy middleware.
- Server actions critiques appellent `requireUser()`.
- Migrations RLS présentes pour `profiles`, `checkins`, `action_sessions`.
- Aucun `dangerouslySetInnerHTML` détecté.
- `.env*.local` ignoré.

## Recommandations prioritaires

1. Tester RLS avec Supabase local.
2. Ajouter validation runtime Zod.
3. Ajouter secret scanning spécialisé en CI.
4. Documenter OAuth Google/Apple et redirects autorisés.
5. Durcir CSP pour production.
