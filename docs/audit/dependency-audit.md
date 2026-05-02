# Dependency Audit

## Package manager

- npm avec `package-lock.json`.

## Versions critiques

- Next.js `^16.2.4`
- React `18.3.1`
- TypeScript `5.5.3`
- Supabase JS `^2.105.1`
- `@supabase/ssr` `^0.10.2`
- Tailwind CSS `3.4.4`

## Scripts ajoutés

- `audit:deps`: `npm audit --omit=dev`
- `audit:unused`: `npx knip --production`
- `audit:secrets`: secret scan local simple
- `quality`, `quality:ci`

## État audit

`npm audit` signale encore des vulnérabilités modérées selon l’état registry courant. Ne pas lancer `npm audit fix --force` sans revue : cela peut introduire des breaking changes.

## Risques supply chain

| Risque | Niveau | Recommandation |
|---|---|---|
| Dépendances avec ranges `^` | Moyen | Garder lockfile en CI, Dependabot/Renovate. |
| Packages dev installés depuis npm | Moyen | Activer audit CI et lockfile review. |
| Absence unused deps scan continu | Bas | Exécuter `npm run audit:unused`. |

## Commandes

```bash
npm run audit:deps
npm outdated
npm run audit:unused
npm run audit:secrets
```
