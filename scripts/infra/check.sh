#!/usr/bin/env sh
set -eu

echo "Checking infra files..."
test -f infra/environments/dev.json
test -f supabase/migrations/001_initial_schema.sql
test -f supabase/migrations/002_rls_policies.sql

if command -v supabase >/dev/null 2>&1; then
  supabase migration list || true
else
  echo "Supabase CLI not installed; skipping CLI-specific checks."
fi

echo "Infra check completed."
