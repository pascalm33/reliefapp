# Stress Relief

Stress Relief est une application mobile-first qui aide un utilisateur a suivre ses signaux de stress quotidiens, faire une action courte, puis observer son soulagement.

L'application ne remplace pas un professionnel de sante. Elle sert a observer des signaux personnels et a tester des actions simples.

## Fonctionnalites

- Authentification Supabase : inscription, identification, deconnexion, reset password.
- Routes protegees sous `/app`.
- Dashboard personnalise avec Stress Signal Score du jour.
- Check-in complet sur 5 signaux : sommeil, digestion, procrastination, scroll, agressivite.
- Calcul automatique des scores metriques et du score global.
- Action recommandee selon la metrique dominante.
- Rapport du jour, rapport semaine et historique.
- Reglages utilisateur avec rappel journalier.
- Page publique de pricing.
- Consentement cookies stocke localement.
- Migrations Supabase avec RLS.
- Tests unitaires, integration, E2E, audit securite, scripts infra et workflow CI.

## Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Supabase Auth et Supabase Postgres
- Vitest
- Playwright
- GitHub Actions

## Prerequis

- Node.js 20+
- npm
- Un projet Supabase
- Playwright browsers pour les tests E2E

Installation des navigateurs Playwright :

```bash
npx playwright install chromium
```

## Installation

```bash
npm install
cp .env.example .env.local
```

Renseigner ensuite :

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Base de donnees Supabase

Les migrations sont dans :

- `supabase/migrations/001_initial_schema.sql`
- `supabase/migrations/002_rls_policies.sql`

Elles creent les tables principales :

- `profiles`
- `checkins`
- `action_sessions`

RLS est activee sur les tables utilisateur. Chaque policy limite l'acces aux donnees du `auth.uid()` courant.

Appliquer les migrations via Supabase CLI ou l'interface SQL Supabase selon l'environnement.

## Developpement local

```bash
npm run dev
```

Par defaut Next demarre sur `http://localhost:3000`. Pour utiliser le port 3001 :

```bash
npm run dev -- -p 3001
```

## Scripts principaux

```bash
npm run lint
npm run typecheck
npm run test
npm run test:coverage
npm run test:integration
npm run test:e2e
npm run build
```

Qualite globale :

```bash
npm run quality
npm run quality:ci
```

Securite et dependances :

```bash
npm run audit:deps
npm run audit:secrets
npm run audit:unused
```

Infrastructure :

```bash
npm run infra:check
npm run infra:generate
npm run infra:validate
npm run infra:plan
npm run infra:diff
```

`infra:apply` et `infra:destroy` sont volontairement bloques par defaut et doivent etre traites comme dangereux.

## Tests

Tests unitaires :

- scoring
- recommandations
- rapports
- dates

Tests integration :

- generation de rapports depuis plusieurs check-ins

Tests E2E :

- acces pages publiques
- redirection anonyme des routes protegees
- erreur d'identification propre si Supabase n'est pas configure
- consentement cookies

Lancer les E2E :

```bash
npm run test:e2e
```

## Securite

Mesures deja presentes :

- Auth geree par Supabase.
- Pas de stockage applicatif de mots de passe.
- Middleware de protection des routes `/app`.
- RLS sur les tables utilisateur.
- Audit secrets local via `scripts/check-secrets.mjs`.
- Headers de securite configures dans `next.config.mjs`.
- CI GitHub Actions avec lint, typecheck, tests, build, audit dependances, scan secrets et infra check.

Points a suivre :

- Ajouter validation runtime des inputs avec Zod ou equivalent.
- Tester les policies RLS avec Supabase local.
- Durcir la CSP pour la production.
- Ajouter des E2E authentifies avec environnement de test dedie.

Les rapports complets sont dans `docs/audit`.

## Structure

```text
app/
  (auth)/
  (protected)/app/
  auth/callback/
components/
  auth/
  cookies/
  public/
lib/
  supabase/
supabase/
  migrations/
test/
e2e/
docs/audit/
scripts/
infra/
```

## Documentation utile

- `docs/audit/test-pyramid-audit.md`
- `docs/audit/security-audit.md`
- `docs/audit/owasp-checklist.md`
- `docs/audit/dependency-audit.md`
- `docs/audit/infrastructure-audit.md`
- `docs/audit/ci-cd-recommendations.md`
- `docs/audit/action-plan.md`
- `scripts/README.md`
- `infra/README.md`

## Notes de deploiement

Configurer en production :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- URL de callback Supabase vers `/auth/callback`
- providers OAuth Google/Apple si actives
- domaines autorises dans Supabase Auth

Le projet ne contient pas de secrets reels. Ne jamais commiter de `.env.local`.

## Deploiement automatique

Le projet est une application Next.js App Router avec Supabase SSR, proxy/middleware de session et server actions. Il ne peut donc pas etre publie correctement sur GitHub Pages, qui sert uniquement des fichiers statiques. Forcer `output: "export"` casserait les routes protegees, le callback auth, les server actions et la gestion de session.

Le deploiement gratuit configure dans ce repo utilise Cloudflare Workers via OpenNext :

- workflow : `.github/workflows/deploy.yml`
- branche declencheuse : `main`
- lancement manuel possible : onglet GitHub Actions > Deploy production > Run workflow
- build/deploiement : `npm run deploy:cloudflare`
- cible gratuite : Cloudflare Workers

Avant de merger, verifier localement :

```bash
npm run lint
npm run test
npm run build
npm run build:cloudflare
```

### Configuration GitHub

Dans le repo GitHub, ajouter ces secrets :

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Ajouter ces variables de repository ou d'environnement :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Le token Cloudflare doit avoir le minimum de droits necessaires pour deployer le Worker du projet. Ne pas utiliser de token personnel large.

### Verification du deploiement

Apres un push ou merge sur `main` :

1. Ouvrir l'onglet GitHub `Actions`.
2. Selectionner `Deploy production`.
3. Verifier que les etapes `Install dependencies`, `Lint`, `Test`, puis `Build and deploy to Cloudflare Workers` sont vertes.
4. Verifier l'URL `*.workers.dev` ou le domaine configure dans Cloudflare.

### GitHub Pages

Si le projet devient un site statique sans SSR, middleware, route handlers ni server actions, GitHub Pages pourra etre utilise. Dans ce cas :

1. Configurer `output: "export"` dans `next.config.mjs`.
2. Publier le dossier `out`.
3. Dans GitHub : `Settings > Pages > Build and deployment > Source: GitHub Actions`.

Ce n'est pas active pour l'application actuelle afin d'eviter un deploiement incomplet.

### Domaine personnalise

Pour un domaine personnalise, le configurer dans Cloudflare Workers routes/domains, puis ajouter l'URL publique dans Supabase Auth :

- Site URL
- Redirect URLs incluant `/auth/callback`
