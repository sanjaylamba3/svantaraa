# Payload Project Structure Guide

This file is a compact, LLM-friendly map of the repository structure, naming conventions, and implementation patterns used in this Payload CMS project.

Use it when adding collections, globals, fields, or admin behavior. Follow the files that already exist. Do not introduce folders from a generic Payload template.

## What this repo is

This is a Next.js 16 App Router application powered by Payload CMS 3.

It is a marketing site for one retreat. Staff edit page content in the admin. Parents read the public site. Booking is a URL stored on a service, not a Payload workflow.

The main integration points are:

- Payload config in `src/payload.config.ts`
- Collection definitions in `src/collections/`
- Global definitions in `src/globals/`
- Frontend routes in `src/app/(frontend)/`
- Payload admin and API routes in `src/app/(payload)/`


## Core conventions

- One PascalCase file per collection or global. `Services.ts` exports `Services`. `Homepage.ts` exports `Homepage`.
- Export a `CollectionConfig` or `GlobalConfig` from that file.
- Use camelCase for helpers in `src/lib/`.
- Use kebab-case for route folders under `src/app/(frontend)/` when the route name is user-facing.
- Component folders stay lowercase and are grouped by screen area: `home/`, `layout/`, `ui/`.
- Keep access logic inline on the collection or global while only one config uses it. Move a shared rule to `src/access/` when a second config needs the same function.
- Add a `hooks/` folder beside a collection only when that collection has a hook. Do not add an empty hooks folder in advance.
- Do not add `blocks/`, `utilities/`, `fields/`, or `endpoints/` for this site.
- When extending a config array, spread the existing values first. Do not replace the array.
- Register every new collection and global in `src/payload.config.ts`.

## Path aliases

TypeScript is configured with these aliases:

- `@/*` maps to `src/*`
- `@payload-config` maps to `src/payload.config.ts`

Import generated types as `@/payload-types`. Use these aliases instead of long relative paths.

## Top-level structure

```txt
src/
  app/
    (frontend)/     Public website routes
    (payload)/      Payload admin, REST, and GraphQL
  collections/      Payload collection configs, one file each
  components/       UI grouped by screen area
    home/
    layout/
    ui/
  context/          Project overview, architecture, and standards
  globals/          Payload global configs, one file each
  lib/              Pure helpers
  migrations/       Payload SQL migrations
  env.ts            Validated environment variables
  payload.config.ts
  payload-types.ts  Generated. Do not edit by hand.
```

## Application routes

The app router is split into two route groups:

- `src/app/(frontend)/` for the public site
- `src/app/(payload)/` for Payload admin and API routes

Public routes:

- `src/app/(frontend)/page.tsx` for `/`
- `src/app/(frontend)/about/page.tsx` for `/about` when that page is added
- `src/app/(frontend)/contact/page.tsx` for `/contact` when that page is added

Admin and API routes stay under `src/app/(payload)/`. Do not add a second `app/api` tree. Payload already serves REST and GraphQL from this group.

Keep route folders and filenames aligned with the URL they represent.

## Collections

Collections live in `src/collections/` as single PascalCase files.

Current collections:

- `Users.ts` — auth-enabled staff users. `auth: true`. `admin.useAsTitle` is `email`. Payload's default auth access applies. This is not a public customer account.
- `Media.ts` — uploads. Public read. Admin group `Website & Content`. Image sizes are thumbnail, card, and hero. Files are stored with the Vercel Blob plugin.
- `Services.ts` — service cards, including the external booking URL. Public read. `admin.useAsTitle` is `title`.
- `Testimonials.ts` — staff-authored quotes. Public read. `admin.useAsTitle` is `ownerName`.
- `Faqs.ts` — homepage questions. Public read. `admin.useAsTitle` is `question`.

`Services`, `Testimonials`, and `Faqs` set `admin.defaultColumns` and an `order` field for display sequence.

When the contact form is added, add `Inquiries.ts` as another flat file in `src/collections/`. Public create, staff read. Do not turn it into a folder.

Patterns in these files:

- Export a `CollectionConfig` constant.
- Set `admin.useAsTitle` and `admin.defaultColumns` so the list view is usable.
- Use `admin.group` when the collection should sit with a labeled group in the sidebar.
- Public marketing content uses `access.read: () => true`.
- This site does not use `versions.drafts`, `livePreview`, `preview`, or `slugField`.

## Plugins

Plugin setup lives in the `plugins` array in `src/payload.config.ts`.

The only plugin is `vercelBlobStorage` from `@payloadcms/storage-vercel-blob`, enabled for the `media` collection with client uploads.

When adding another plugin, add it to that same array. Do not create `src/plugins/index.ts` for a single plugin. Preserve existing plugin options. Spread default fields if an override callback receives them.

## Access control

Access is declared on each collection and global.

Current pattern:

- Marketing collections and the Homepage global allow public read.
- `Users` keeps Payload's auth defaults.
- Writes use Payload's authenticated admin defaults unless a config overrides them.

Move a rule into `src/access/` only when two configs share it. Name the helper for the rule, for example public read or staff only. Pass that function into `access` instead of copying the function body.

Inquiry access, when that collection exists, is public create and authenticated read.

## Blocks and rich text

This site has no `src/blocks/` folder. Do not add one for homepage sections.

The editor in `src/payload.config.ts` is `lexicalEditor()` with no custom block features.

Homepage content is a `tabs` field on the Homepage global: Hero, Philosophy, Services Header, Daily Rhythm, Purpose, Booking Banner, and Footer & Contact. Add a field to the tab that owns it. About and Contact are separate globals, not new homepage tabs.

## Components

`src/components/` is organized by screen area:

- `home/` — homepage sections. Server Components that receive props.
- `layout/` — `Header`, `Footer`, and `MobileNav`.
- `ui/` — shadcn primitives such as `button` and `sheet`.

Section components do not call Payload. The page in `src/app/(frontend)/` loads data and passes props. Add `"use client"` only when the component needs state, effects, browser APIs, or event handlers.

## Utilities and helpers

`src/lib/` holds small pure helpers. `getMediaUrl` in `src/lib/media.ts` resolves a media relation or falls back to a URL string. `src/lib/utils.ts` re-exports `cn` from the `cn` package. Import `cn` from `cn` directly.

Do not put Payload queries or access rules in `src/lib/`. There is no `src/utilities/` folder.

## Migrations

There is no seed folder. Schema changes are Payload migrations in `src/migrations/`.

`push` is `false` in the Postgres adapter. After a schema change, create a migration and regenerate types. Do not rely on push in development to alter the database.

## Globals

Global configs live in `src/globals/` as single PascalCase files.

The current global is:

- `Homepage.ts` — slug `homepage`, admin group `Pages`, public read, one `tabs` field for homepage sections and the footer details shown with the homepage.

When those pages are built, add:

- `About.ts` — founder story only
- `Contact.ts` — address, phone, and hours for the contact page

Register each new global in the `globals` array in `src/payload.config.ts`. Keep each global limited to one page.

## Payload config

`src/payload.config.ts` is the root composition file.

It handles:

- Admin user collection (`users`) and the import map
- Collection registration
- Global registration
- Lexical editor
- Postgres adapter and `DATABASE_URL`
- `sharp`
- Vercel Blob storage
- TypeScript output path for `src/payload-types.ts`
- `PAYLOAD_SECRET` from `src/env.ts`

When a change affects the whole CMS, start here and then edit the owning collection or global file.

## Generated types

`src/payload-types.ts` is generated by Payload and must not be edited by hand.

Use it for typed collection documents, globals, and media relations. After a schema change, regenerate with `pnpm generate:types`.

## Editing rules for this repo

- Prefer the smallest local change that preserves the existing file-per-config shape.
- Use `@/` imports for in-repo modules.
- Spread existing field, collection, global, and plugin arrays before appending.
- Keep admin-facing fields on the collection or global that owns them.
- Keep pure helpers in `src/lib/` and page rendering in `src/components/` plus `src/app/(frontend)/`.
- Do not add a new folder unless this guide already names it.

## Good starting points for new work

- Add or modify a collection: `src/collections/`, then the `collections` array in `src/payload.config.ts`
- Add a global: `src/globals/`, then the `globals` array in `src/payload.config.ts`
- Change storage or the editor: `src/payload.config.ts`
- Add a public page: `src/app/(frontend)/` and `src/components/`
- Add a shared helper: `src/lib/`
- Add a shared access rule, once two configs need it: `src/access/`

## Practical summary for an LLM

When working in this repo, prefer these defaults:

1. Open the existing collection or global file before adding a new one.
2. Match the flat PascalCase config file that is already there.
3. Register the config in `src/payload.config.ts`.
4. Keep public reads on marketing content and leave staff auth on `Users`.
5. Use `@/` and `@payload-config` exactly as the repo already does.
6. Regenerate `payload-types.ts` after schema changes. Never hand-edit it.
