# Supabase Environments

This project separates configuration for development and production.

## Development

The current Supabase project is configured as development:

```text
https://kioycqthyfvsurpciyhp.supabase.co
```

Project ref:

```text
kioycqthyfvsurpciyhp
```

Generate the development example env file:

```bash
npm run infra:generate -- dev
```

This creates:

```text
.env.dev.example
```

## Production

Create a separate Supabase project for production in the Supabase dashboard, then replace the placeholders in:

```text
infra/environments/production.json
```

Generate the production example env file:

```bash
npm run infra:generate -- production
```

This creates:

```text
.env.production.example
```

## Database schema

Apply the same migrations to each Supabase project:

```text
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_rls_policies.sql
```

Do not share a production database with development data. Use separate Supabase projects for proper isolation.
