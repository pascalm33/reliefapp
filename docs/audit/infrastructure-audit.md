# Infrastructure Audit

## État actuel

- Pas de Terraform, CDKTF, Pulumi, Docker ou docker-compose détecté.
- Supabase migrations présentes.
- Pas de GitHub Actions avant cet audit.
- `.env.example` existe avec Supabase URL/anon key.
- Next.js configuré pour headers sécurité.

## Environnements détectés/proposés

- `dev`
- `staging`
- `prod`

Structure créée :

```text
infra/
  environments/dev.json
  modules/
scripts/infra/
```

## Variables nécessaires

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `APP_URL`
- `NODE_ENV`
- `SUPABASE_SERVICE_ROLE_KEY` uniquement si opérations admin serveur futures.

## Risques

| Risque | Niveau | Recommandation |
|---|---|---|
| Pas d’IaC complète | Moyen | Définir Vercel/Supabase via IaC ou runbook versionné. |
| Supabase RLS non validée automatiquement | Haut | Ajouter Supabase CLI local en CI. |
| Secrets non centralisés | Moyen | Utiliser GitHub/Vercel/Supabase secrets, jamais repo. |
| Pas de preview env documentée | Moyen | Ajouter env preview pour E2E auth. |

## Scripts créés

- `infra:check`
- `infra:generate`
- `infra:validate`
- `infra:plan`
- `infra:diff`
- `infra:apply` désactivé par défaut
- `infra:destroy` désactivé par défaut

## Supabase

À ajouter quand Supabase CLI est disponible :

```bash
supabase db lint
supabase migration list
supabase db diff
supabase db push
supabase gen types typescript --local > types/supabase.generated.ts
```
