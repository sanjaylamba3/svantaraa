# Build Plan

## Core Principle

Build each page as UI first and verify it in the browser before wiring it to Payload. Then connect the data step by step. Every step must be visible and testable before the next one starts.

The homepage, layout, and Payload content models already in the repo were drafted without a manual quality review. This plan does not treat that draft as finished. When a step below names a screen or a config that already has a file, the work is to review it, correct it, and verify it. Do not skip a step because the file exists.

There is no booking engine, payment flow, customer account, or email phase. A service card stores a link to the third-party booking service.

---

## Phase 1 — Foundation

### 01 Design System and Layout Shell

Review the existing Tailwind, shadcn, font, and layout draft. Correct it against `ui-rules.md` and `ui-tokens.md`, then verify the shell on a blank page before rebuilding the homepage.

**UI:**

- Design tokens from `ui-tokens.md` defined in `src/app/(frontend)/styles.css` under `@theme`
- Tailwind CSS v4 working
- shadcn/ui `Button` and `Sheet` in `components/ui`
- Playfair Display and Outfit loaded with `next/font`. No third font family
- Header — logo, Services, About Us, Contact, Reserve
- Footer — logo, short bio, address, phone, hours
- Page shell — fixed header, `main`, footer, shared by every public page
- Mobile navigation using the existing sheet menu

**Logic:**

- None. Links may point at homepage anchors and at `/about` and `/contact` before those pages exist.

---

### 02 Homepage — Full UI

Rebuild the homepage and verify it visually before any Payload read is trusted.

Use the section defaults in the components as the content for this step. Do not treat the current homepage as signed off.

**UI:**

- Hero — badge, headline, description, primary and secondary actions, image
- Philosophy — quote, description, three pillars
- Services — section heading and service cards with image, description, price, and a booking link
- Daily rhythm — heading and schedule
- Purpose — impact story and metrics. This is not the About page
- Testimonials
- FAQs, including the expandable list inside `FaqSection`
- Booking banner — invitation to the services section and the phone line
- Header and footer from step 01

**Logic:**

- Services and Reserve scroll to the services section
- A service card’s booking control opens its URL
- About Us goes to `/about`
- Contact goes to `/contact`
- No Payload fetch is required to judge this step

---

## Phase 2 — Homepage Content

### 03 Payload Content for the Homepage

Review the existing Homepage global, Services, Testimonials, FAQs, and Media configs. Change them only where the verified homepage needs a field that is missing or a field the page does not use.

**Logic:**

- Homepage global — one tab per homepage section, admin group `Pages`, public read
- Services — title, description, price, features, image, and the external booking URL, with `order` for display
- Testimonials — staff-authored quotes, with `order`
- FAQs — question, answer, category, with `order`
- Media — alt text, thumbnail, card, and hero sizes, stored with Vercel Blob
- Public read on marketing content. Writes stay with authenticated staff
- Schema changes go through a migration. `push` stays off
- Regenerate `payload-types.ts`. Do not hand-edit it

---

### 04 Homepage — Real Data

Wire the verified homepage to the Payload Local API.

**Logic:**

- The homepage Server Component reads the Homepage global and the services, testimonials, and FAQs collections
- Sections receive that data as props. Components do not call Payload
- A failed read logs the error and renders that section’s defaults
- `revalidate` stays at 60 seconds unless a measured reason changes it
- Images use `getMediaUrl` and fall back to the CMS fallback URL
- Confirm in the admin that an edited headline, service, testimonial, FAQ, and booking link show on the page

---

## Phase 3 — About

### 05 About Page — Full UI

Build `/about` with sample founder-story content and verify it before adding a global.

**UI:**

- Same header and footer as the homepage
- Founder story only. Do not repeat hero, services, daily rhythm, testimonials, or FAQs
- A way back to the homepage and to Contact

**Logic:**

- None. Sample copy lives in the page until step 06.

---

### 06 About Page — Real Data

**Logic:**

- `About` global in `src/globals/`, registered in `payload.config.ts`
- Public read
- `/about` reads the global through the Local API
- A failed read shows the sample story, not a stack trace
- The current page is identifiable in the header

---

## Phase 4 — Contact

### 07 Contact Page — Full UI

Build `/contact` with sample details and a working-looking form. Verify the layout before saving inquiries.

**UI:**

- Address, phone, and hours
- Form fields: name, email, phone, message
- Labels, required markers, and inline validation messages
- Submit uses `Button`. Add `Input` and `Textarea` under `components/ui` and register them in `ui-registry.md`
- Success and failure copy rendered in the form
- Same header and footer

**Logic:**

- None. Submit can be disabled or show a sample success state until step 08.

---

### 08 Contact Page — Real Data

**Logic:**

- `Contact` global for address, phone, and hours
- `Inquiries` collection: name, email, phone, message. Public create. Staff read
- Server Action in `src/actions/` writes the inquiry through the Local API
- Validation keeps the parent’s input when it fails
- The submit button stays disabled while the request is in flight and does not shift the layout
- Success copy says the message was received. It does not say a booking is confirmed
- A staff user can read the inquiry in the Payload admin

---

## Phase 5 — Harden

### 09 Errors, Empty Sections, and Access

Check the three public pages after the data is wired.

**Logic:**

- Custom 404 page that links home
- Friendly error page for an unexpected failure. No stack trace
- A section with no services, testimonials, or FAQs shows one sentence of empty copy
- Photos keep their size while loading
- Header, sheet menu, form, and booking links work from the keyboard and show focus
- Booking remains an external link. This step does not add payments, accounts, or email

---

## Feature Count

| Phase | Features |
| ----- | -------- |
| Phase 1 — Foundation | 2 |
| Phase 2 — Homepage Content | 2 |
| Phase 3 — About | 2 |
| Phase 4 — Contact | 2 |
| Phase 5 — Harden | 1 |
| **Total** | **9** |
