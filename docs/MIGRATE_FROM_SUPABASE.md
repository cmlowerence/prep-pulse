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

