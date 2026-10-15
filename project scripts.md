# Project Scripts Reference

## Available Scripts

| Script | Command | Purpose | When to Use |
|--------|---------|---------|-------------|
| `build` | `next build` | **Local production build** – compiles Next.js only, no DB changes. | Everyday local work: `pnpm build` to verify the app compiles. |
| `ci:build` | `payload migrate && next build` | **CI / Vercel build** – runs pending migrations against the connected DB, then builds. | **Only on Vercel** (set as Build Command) or in your CI pipeline. |
| `dev` | `next dev` | Starts dev server with hot-reload. | Daily development: `pnpm dev`. |
| `payload` | `payload` | Direct access to Payload CLI. | Schema changes: `pnpm payload migrate:create "name"` then `pnpm payload migrate` to apply locally. |
| `generate:types` / `generate:importmap` | Payload code-gen helpers | Regenerate TS types / import-map after schema edits. | After any collection/field change. |

## Typical Local Workflow After a Schema Change

```bash
pnpm payload migrate:create "add-new-field"   # creates migration file
pnpm payload migrate                          # applies it to your local DB
pnpm generate:types                           # updates payload-types.ts
pnpm build                                    # verifies everything compiles
```

## Vercel Deployment

Vercel runs `pnpm ci:build` – migrations run once per deploy against your Neon DB, then the Next.js build proceeds.

## Key Configuration

- **Postgres adapter** has `push: false` in `src/payload.config.ts` to prevent dev-mode auto-push from conflicting with migrations.
- Local and production databases should be separate.
- Never run dev mode against your production Neon database.