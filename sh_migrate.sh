#!/usr/bin/env bash
set -euo pipefail

ROOT="$PWD"
TSNOW=$(date +%Y%m%d%H%M%S)
echo "🔁 Preparing file-system changes for migration: Supabase → Vercel/Postgres/Blob/Auth (safe mode)"
echo "Project root: $ROOT"
echo

backup_file() {
  local f="$1"
  if [ -f "$f" ]; then
    local dir
    dir=$(dirname "$f")
    mkdir -p "$dir/.bak"
    local bk="${dir}/.bak/$(basename "$f").bak.${TSNOW}"
    cp -p "$f" "$bk"
    echo "  [backup] $f -> $bk"
  fi
}

create_if_missing() {
  local path="$1"
  local content="$2"
  if [ -f "$path" ]; then
    echo "  [exists] $path (left unchanged)"
  else
    mkdir -p "$(dirname "$path")"
    echo "$content" > "$path"
    echo "  [created] $path"
  fi
}

append_env_if_missing() {
  local key="$1"
  local samplefile=".env.local.sample"
  if ! grep -q "^${key}=" "$samplefile" 2>/dev/null; then
    echo "$2" >> "$samplefile"
    echo "  [env] Appended ${key} to ${samplefile}"
  else
    echo "  [env] ${key} already present in ${samplefile}"
  fi
}

# 1) Back up existing supabase client files (if present)
echo "1) Backing up existing Supabase client files if present..."
backup_file "src/lib/supabaseClient.ts"
backup_file "src/lib/supabaseAdmin.ts"
echo

# 2) Create new placeholder lib files for Vercel Postgres, Auth, Blob storage
echo "2) Creating new placeholder lib files (if missing)..."

create_if_missing "src/lib/db.ts" "/* Placeholder DB helper for Vercel Postgres.
   Replace with real DB client (pg/prisma/@vercel/postgres) when ready.
   Environment: DATABASE_URL in .env.local */
export const dbPlaceholder = true;
"

create_if_missing "src/lib/auth.ts" "/* Placeholder Auth helper for Vercel/Clerk/NextAuth.
   Replace this with Clerk or NextAuth server helpers.
   Do NOT put secret keys here; use env vars.
*/
export const authPlaceholder = true;
"

create_if_missing "src/lib/storage.ts" "/* Placeholder storage helper for Vercel Blob.
   Replace with actual Vercel Blob SDK or fetch wrapper when implementing.
   Use VERCEL_BLOB_TOKEN env var for server-only uploads.
*/
export const storagePlaceholder = true;
"

create_if_missing "src/lib/vercel-blob.ts" "/* Placeholder Vercel Blob helper (upload/download helpers).
   Implement using official Vercel Blob endpoints/SDK later.
*/
export const vercelBlobPlaceholder = true;
"

echo

# 3) Update .env.local.sample with new keys (append only missing)
echo "3) Updating .env.local.sample with Vercel/Postgres/Clerk env vars (append only if missing)..."
if [ ! -f ".env.local.sample" ]; then
  echo "# Creating .env.local.sample (base)..." > .env.local.sample
  echo "# Add your environment variables here (do NOT commit secrets)" >> .env.local.sample
  echo "" >> .env.local.sample
fi

append_env_if_missing "DATABASE_URL" "DATABASE_URL=postgres://<user>:<pass>@<host>:5432/<db>"
append_env_if_missing "VERCEL_BLOB_TOKEN" "VERCEL_BLOB_TOKEN="
append_env_if_missing "CLERK_FRONTEND_API" "CLERK_FRONTEND_API="
append_env_if_missing "CLERK_API_KEY" "CLERK_API_KEY="
append_env_if_missing "NEXT_PUBLIC_APP_URL" "NEXT_PUBLIC_APP_URL=http://localhost:3000"
append_env_if_missing "USE_GEMINI_MOCK" "USE_GEMINI_MOCK=true"
echo

# 4) Add migration docs note
echo "4) Creating docs/MIGRATE_FROM_SUPABASE.md (if missing)..."
if [ -f "docs/MIGRATE_FROM_SUPABASE.md" ]; then
  echo "  [exists] docs/MIGRATE_FROM_SUPABASE.md"
else
  mkdir -p docs
  cat > docs/MIGRATE_FROM_SUPABASE.md <<'MD'
# Migration Notes: Supabase -> Vercel Stack

This repository was migrated to use Vercel Postgres (DB), Vercel Blob (file storage),
and Clerk/NextAuth (authentication) instead of Supabase.

## Summary of changes
- Supabase client files were backed up to: src/lib/.bak/
  - src/lib/supabaseClient.ts -> src/lib/.bak/supabaseClient.ts.bak.<timestamp>
  - src/lib/supabaseAdmin.ts  -> src/lib/.bak/supabaseAdmin.ts.bak.<timestamp>

- New placeholder helper files were added (implementations required):
  - src/lib/db.ts          (Vercel Postgres / prisma / pg helpers)
  - src/lib/auth.ts        (Clerk or NextAuth server helpers)
  - src/lib/storage.ts     (Vercel Blob helpers)
  - src/lib/vercel-blob.ts (helper wrappers for Vercel Blob API)

## Next steps
1. Implement db.ts using @vercel/postgres or Prisma connected to DATABASE_URL.
2. Implement auth.ts with Clerk or NextAuth (update app layout and protected routes).
3. Implement storage.ts/vercel-blob.ts to upload/download files using VERCEL_BLOB_TOKEN.
4. Replace Supabase-specific usage across app components and server routes:
   - Replace auth session checks (supabase) with Clerk or NextAuth.
   - Replace storage calls (supabase storage) with Vercel Blob helpers.
   - Replace DB queries (supabase.from(...)) with SQL/Prisma queries to Postgres.
5. Update .env.local and Vercel environment variables.
6. Run tests and seed the DB using updated scripts.

MD
  echo "  [created] docs/MIGRATE_FROM_SUPABASE.md"
fi
echo

# 5) Suggest renaming references (non-destructive) - report only
echo "5) Scanning common files for 'supabase' references (read-only check)..."
grep -RIn --exclude-dir=node_modules --exclude-dir=.git "supabase" 2>/dev/null || true
echo "  [note] If grep output above lists files, update those files to use the new helpers (db.ts/auth.ts/storage.ts)."
echo

# 6) Summarize actions
echo "✅ Migration prep finished. Summary:"
echo "  - Backups created for existing supabase client files (if they existed) in src/lib/.bak/"
echo "  - New placeholders created (if not present):"
echo "      src/lib/db.ts, src/lib/auth.ts, src/lib/storage.ts, src/lib/vercel-blob.ts"
echo "  - .env.local.sample appended with: DATABASE_URL, VERCEL_BLOB_TOKEN, CLERK_FRONTEND_API, CLERK_API_KEY"
echo "  - docs/MIGRATE_FROM_SUPABASE.md created (if not present)"
echo
echo "Next recommended steps:"
echo "  1) Open docs/MIGRATE_FROM_SUPABASE.md and implement the placeholders."
echo "  2) Search codebase for 'supabase' and migrate each usage to new helpers."
echo "  3) Update environment variables in development and Vercel dashboard."
echo
echo "Run 'git status' to review all changes, then commit when ready."
