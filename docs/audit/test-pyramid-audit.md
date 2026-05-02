# Test Pyramid Audit

## 1. État actuel

Stack détectée : Next.js App Router, React, TypeScript, Tailwind CSS, Supabase Auth/Postgres, migrations SQL Supabase.

Avant cet audit, le projet contenait `lint`, `typecheck` et `build`, mais aucun test automatisé applicatif.

Tests ajoutés :

- Unitaires : scoring, recommandations, rapports, dates.
- Intégration légère : génération de rapport depuis des données déjà scopées par utilisateur.
- E2E Playwright : pages publiques, redirection route protégée, login error state, consentement cookies.

## 2. Types de tests présents

| Type | Statut | Emplacement | Commentaire |
|---|---|---|---|
| Unitaires | Présent | `test/unit` | Couvre fonctions métier critiques sans réseau. |
| Intégration | Partiel | `test/integration` | Couvre orchestration reports, pas Supabase réel. |
| E2E | Présent minimal | `e2e` | Parcours publics et cookies. Auth réelle nécessite Supabase test. |
| API/contract | Non applicable | - | Aucune API route applicative exposée hors callback auth. |
| Composants | Absent | - | À ajouter si l’UI devient plus complexe. |
| Sécurité automatisée | Partiel | `scripts/check-secrets.mjs`, `npm audit` | Secret scan simple, audit dépendances. |
| Accessibilité | Absent | - | Recommandé avec `@axe-core/playwright`. |
| Régression visuelle | Absent | - | Non prioritaire pour MVP. |

## 3. Types de tests absents

- Tests d’intégration Supabase local avec RLS réelle.
- Tests E2E authentifiés complets.
- Tests accessibilité.
- Tests de composants pour formulaires complexes.
- Tests de validation stricte des inputs avec schéma.

## 4. Couverture actuelle

Mesurable via :

```bash
npm run test:coverage
```

Objectif cible initial :

- 70% lignes sur `lib/scoring.ts`, `lib/reports.ts`, `lib/recommendations.ts`, `lib/dates.ts`.
- Couverture progressive des server actions quand la stratégie Supabase test sera stabilisée.

## 5. Zones à risque

| Zone | Risque | Pourquoi |
|---|---|---|
| Auth Supabase | Haut | Dépend de config externe et providers OAuth. |
| RLS Supabase | Haut | Protection critique non validée automatiquement. |
| Server actions | Moyen | Protégées par `requireUser`, mais peu testées. |
| Inputs check-in | Moyen | Pas de validation Zod centralisée. |
| Cookies consent | Moyen | Comportement client sensible à l’hydratation. |
| Rapports | Moyen | Calculs produit critiques. |

## 6. Recommandations

1. Ajouter Supabase local en CI pour tester RLS et isolation `user_id`.
2. Ajouter Zod pour valider tous les inputs côté client et serveur.
3. Ajouter `@axe-core/playwright` sur `/`, `/login`, `/pricing`, `/app/dashboard`.
4. Garder les E2E limités aux parcours critiques.
5. Ajouter tests server actions avec mocks Supabase ou environnement local.

## 7. Plan d’amélioration progressif

1. Quick wins : maintenir les tests unitaires ajoutés et augmenter la couverture des fonctions `lib`.
2. Court terme : Supabase local + tests RLS + E2E auth.
3. Moyen terme : accessibilité, monitoring, test data factory, visual smoke tests.
