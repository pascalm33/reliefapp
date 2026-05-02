# Infrastructure

No Terraform, CDKTF, Pulumi or Docker stack is currently configured.

Current infrastructure is:

- Next.js application, expected to deploy on Vercel or equivalent Node hosting.
- Supabase Auth and Postgres.
- Supabase migrations in `supabase/migrations`.

Required environments:

- `dev`
- `staging`
- `prod`

Required variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `APP_URL`
- `NODE_ENV`
- `SUPABASE_SERVICE_ROLE_KEY` only if server-side admin operations are introduced.

Generate example env file:

```bash
npm run infra:generate -- dev
```

Validation:

```bash
npm run infra:check
```
