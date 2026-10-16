# Architecture

## Technology Stack

| Layer | Technology | Purpose |
|--------|------------|---------|
| Framework | Next.js 16 (App Router) | Customer website and Payload admin in one app |
| CMS | Payload CMS 3 | Admin panel, content model, access control |
| Database | PostgreSQL | Primary database |
| Authentication | Payload Auth | Staff sign-in for the admin |
| Database layer | `@payloadcms/db-postgres` | Persistence and migrations |
| Storage | Vercel Blob (`@payloadcms/storage-vercel-blob`) | Uploaded images and media |
| Rich text | Lexical (`@payloadcms/richtext-lexical`) | Admin rich text editing |
| Images | `sharp` | Upload resizing |
| Styling | Tailwind CSS + shadcn/ui | Customer website UI |
| Language | TypeScript (strict) | Entire codebase |
| Env | `@t3-oss/env-nextjs` | Validated server and public environment variables |

Booking, payments, and email are handled outside this application. A service card stores a link to the third-party booking service. Contact inquiries are saved in PostgreSQL for staff to read.

---

## High-Level Architecture

```
Customer Website (Next.js)
        │
        ▼
Payload Local API
        │
        ▼
PostgreSQL
        │
        ▼
Payload Admin Dashboard

Service card booking link
        │
        ▼
Third-party booking service
```

The customer website and the Payload admin run in the same Next.js application. They share one Payload config and one PostgreSQL database.

Public pages read globals and collections through the Payload Local API. The contact form writes an inquiry through that same API. Uploaded media is stored in Vercel Blob. Choosing a service opens the third-party booking URL in the card. This app does not call that service.

---

## Folder Structure

```text
/
├── src/
│   ├── app/
│   │   ├── (frontend)/     → Customer website
│   │   └── (payload)/      → Payload admin and HTTP API
│   ├── collections/        → Services, testimonials, FAQs, media, users, inquiries
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   └── ui/
│   ├── context/            → Project overview, architecture, and standards
│   ├── globals/            → Homepage, About, Contact
│   ├── lib/                → Pure helpers
│   ├── migrations/         → Payload SQL migrations
│   ├── env.ts
│   ├── payload.config.ts
│   └── payload-types.ts
```

Customer routes live under `app/(frontend)`: `/`, `/about`, and `/contact`. Payload admin and API routes live under `app/(payload)`.

---

## System Boundaries

| Folder | Responsibility |
|---------|----------------|
| `app/(frontend)` | Public pages only. Read content and submit inquiries. |
| `app/(payload)` | Payload admin, REST API, and GraphQL |
| `collections/` | Content and inquiry entities, fields, and access |
| `globals/` | Singleton page content for Homepage, About, and Contact |
| `components/` | Presentation only |
| `lib/` | Pure helpers, including media URL resolution |
| `migrations/` | Database schema history. `push` stays off. |
| `payload.config.ts` | Collections, globals, database, editor, and storage plugin |

Shared access rules belong in `src/access/` once more than one collection uses the same rule. Collection lifecycle hooks belong in `src/hooks/` when a collection needs them. Until then, access stays on the collection config.

---

## Core Domain Model

### Page Content

- Homepage global: hero, philosophy, services header, daily rhythm, purpose, booking banner, footer and contact details shown on the homepage
- About global: founder story, separate from the homepage
- Contact global: address, phone, and hours for the contact page
- Media: images used by pages and services

### Services

- Service title, description, price, and features
- External booking URL on each service
- Display order

### Supporting Content

- Testimonials, written by staff
- FAQs, grouped for the homepage

### Operations

- Inquiries from the contact form: name, email, phone, and message
- Staff users for the admin

There are no guest accounts, bookings, payments, or availability records.

---

## Data Flow

### Public Page

```
Parent
      ↓
Next.js page in app/(frontend)
      ↓
Payload Local API
      ↓
Global or collection
      ↓
PostgreSQL
      ↓
Section components
```

The homepage reads the Homepage global plus the services, testimonials, and FAQs collections. About reads the About global. Contact reads the Contact global.

### Booking Handoff

```
Parent
      ↓
Service card
      ↓
External booking URL
      ↓
Third-party booking service
```

The card renders the URL stored on the service. Dates, payment, and confirmation happen on that service. This application does not check availability, lock inventory, or store the result.

### Contact Inquiry

```
Parent
      ↓
Contact form
      ↓
Payload Local API
      ↓
Inquiries collection
      ↓
PostgreSQL
      ↓
Staff read the inquiry in the admin
```

### Staff Editing

```
Payload Admin
      ↓
Globals, collections, and media
      ↓
PostgreSQL and Vercel Blob
      ↓
Next public page read
```

---

## Authentication

### Parents

The public site has no accounts. Parents read pages and submit the contact form without signing in. Booking sign-in, if any, belongs to the third-party service.

### Staff

- Sign in through Payload Auth on the `users` collection.
- Use the admin to edit page content, services, testimonials, FAQs, media, and inquiries.
- Access is the Payload default for authenticated users until a shared access module is needed.

Public marketing content allows unauthenticated read. Inquiry creates are allowed from the contact form. Inquiry reads stay limited to authenticated staff.

---

## File Storage

Payload upload on the `media` collection stores files in Vercel Blob.

Used for:

- Homepage and about images
- Service images
- Testimonial or founder photos when those fields use media

`sharp` generates thumbnail, card, and hero sizes. Public pages resolve a media document to a URL through `lib/media.ts`, and fall back to a CMS-provided image URL when no upload is set.

---

## Security Principles

- Payload access control is the gate for every collection and global.
- Marketing content is publicly readable. Admin writes require an authenticated staff user.
- Anyone may create an inquiry. Only staff may read inquiries.
- Secrets (`DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`) stay server-side and are validated in `env.ts`.
- The third-party booking URL is a link only. This app does not receive payment data or booking records.
- Schema changes go through migrations.

---

## Architectural Principles

- Page copy and images come from Payload globals and collections, not from hardcoded section content.
- UI components render props. They do not query Payload or decide access.
- Server pages and route handlers talk to Payload through the Local API.
- Reusable helpers stay pure and live in `lib/`.
- A service’s booking URL is the only integration with the booking service.
- About content is its own global. It is not a second rendering of homepage sections.
- Contact inquiries are an append-only collection for staff. They are not customer accounts.
