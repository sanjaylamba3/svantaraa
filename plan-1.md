# Homepage audit plan

Audit only. Do not treat any step below as done until it has been checked in the browser. Do not mark a feature complete in `progress-tracker.md` from this file.

The context files are the spec. They agree with each other: three public pages, Payload-owned copy, Playfair Display and Outfit, the brand tokens in `styles.css`, and no in-app booking. `progress-tracker.md` is right that nothing is signed off.

The homepage draft in `src/app/(frontend)/page.tsx` and `src/components/home/` was written before those rules. It fetches Payload and renders the right sections, and it breaks the token, navigation, image, and type rules.

---

## What the context files got right

- `project-overview.md` — pages, nav names, third-party booking, contact inquiries, and what is out of scope.
- `architecture.md` — `(frontend)` / `(payload)`, Local API, `lib/`, flat collection files, no booking records.
- `code-standards.md` — Server Components by default, no `any`, comments only for why, no new packages.
- `payload-structure.md` — matches the files that exist, and names About, Contact, and Inquiries as later files.
- `ui-tokens.md` and `ui-rules.md` — ivory, espresso, forest, champagne; no `emerald` / `amber` / `neutral`; buttons are pills; cards are `rounded-2xl`.
- `ui-registry.md` — lists the components that exist.
- `build-plan.md` — Feature 01 is the shell, Feature 02 is the homepage UI, Feature 04 wires trusted data. This audit follows that order.

No context file needs a rewrite before the code fixes. One later decision, not a blocker: the homepage global already stores footer address, phone, and hours, and the Contact global will store them again for `/contact`. When Feature 08 is built, pick one source for the footer.

---

## What the homepage gets wrong

### Navigation does not match the spec

`project-overview.md` and `ui-rules.md` say the header is Services, About Us, and Contact. About Us opens `/about`. Contact opens `/contact`. Reserve scrolls to the services section.

In `Header.tsx`:

- Services and Reserve go to `#reserve-concierge`. That id exists on the services section. This part is fine.
- About Us goes to `#daily-rhythm`. That is the schedule section, not the founder story.
- Contact is a `tel:` link, not `/contact`.

`MobileNav.tsx` is a different menu: Services & Chalets, Daily Rhythm, Rescue Mission, Resident FAQs, and the phone number. Desktop and mobile do not list the same destinations.

The footer Explore column uses real section ids (`#reserve-concierge`, `#social-impact`, `#daily-rhythm`, `#testimonials`, `#faq-section`). The legal links at the bottom point at `#`.

`/about` and `/contact` do not exist yet. Do not add those pages in this pass. Until they exist, the labels must match where the link actually goes.

### Colors ignore the tokens

`ui-tokens.md` forbids `emerald`, `amber`, `neutral`, and raw white fills. These files still use them:

- `HeroSection.tsx`
- `PhilosophySection.tsx`
- `ExperienceSection.tsx`
- `DailyRhythmSection.tsx`
- `PurposeSection.tsx`
- `TestimonialsSection.tsx`
- `FaqSection.tsx`
- `BookingBanner.tsx`
- `Footer.tsx`

Hero, purpose, booking banner, and footer are painted as near-black slabs (`bg-neutral-950`, `bg-neutral-900`) with gold text. The token for that role is `espresso`, and the gold is `champagne`. Forest replaces emerald. Champagne on ivory is 2.46:1, so it stays on icons and the focus ring, not on body copy sitting on the canvas.

Primary buttons are restyled with `bg-white text-neutral-950`, which skips `bg-primary`. On a dark hero, an ivory button is the dark-mode primary idea. Use `bg-ivory text-espresso` or the semantic pair, not the Tailwind palette.

### Images

`ui-rules.md` says photos use `next/image` with a known size.

- The hero is a CSS `background-image`. The unsplash URL is interpolated into a style string.
- Service cards use a raw `<img>`.
- `next.config.ts` already allows `images.unsplash.com` and the Vercel blob host, so `next/image` can use those URLs.

### Types, comments, and empty data

- `ExperienceSection.tsx` and `FaqSection.tsx` use `any` for mapped items. `code-standards.md` forbids `any`.
- `page.tsx` and the sections comment what the code is doing (`{/* 1. Hero Section */}`). Comments are only for why.
- Copy defaults live in three places: `Homepage.ts` field defaults, the component parameter defaults, and the migration. They can drift.
- An empty services, testimonials, or FAQ result does not show the one-line empty state from `ui-rules.md`. The section swaps in invented cards and named quotes. Sample copy is fine while Feature 02 is still a visual pass. Feature 04 should show an empty line when the collection is actually empty, and keep sample people out of a live CMS response.

### Other gaps to fix with the shell, not new features

- FAQ headings (`overline`, `heading`, `description`) and testimonial headings are not fields on the Homepage global, and `page.tsx` does not pass them. They only exist as component defaults.
- FAQ buttons do not set `aria-expanded`. The open answer is removed from the DOM, so the button state is invisible to assistive tech.
- The layout renders `Footer` with no props, so the homepage global’s address, phone, and hours never reach the footer. Header phone is a hardcoded default. Leave the CMS wire for Feature 04. In this pass, stop the footer from disagreeing with the header’s phone number by using one shared default.
- Hover `scale-105` on buttons is stronger motion than `ui-rules.md` allows.
- Service card booking links default to `#reserve-concierge`, which is the section the visitor is already in. The real target is the service’s external URL. A missing URL should not look like a booking button.

---

## Fix order

Do these in order. Stop after each step and look at the page on a phone width and a desktop width. Do not start About, Contact, or new Payload fields until Feature 02 looks right.

### Step 1 — Header and mobile nav say what they do

Files: `src/components/layout/Header.tsx`, `src/components/layout/MobileNav.tsx`.

- Desktop and the sheet list the same links.
- Services and Reserve still scroll to `#reserve-concierge`.
- Remove the About Us label from the daily-rhythm link. Either drop that item until `/about` exists, or label it with the section it opens.
- Remove Contact as a label on the phone link. Keep the phone number visible, labeled as a phone number.
- Mark Home as the current page (`aria-current="page"` on the logo link is enough while `/` is the only page).
- Do not add `/about` or `/contact` routes.

### Step 2 — Recolor the shell and every homepage section

Files: the eight files under `src/components/home/`, plus `src/components/layout/Footer.tsx`.

- Replace `emerald-*` with `forest` (or `text-forest` / `bg-success`).
- Replace `amber-*` highlights with `champagne`. Do not set long text to champagne on an ivory background.
- Replace `neutral-950` / `neutral-900` slabs with `bg-espresso` and `text-ivory`.
- Replace `neutral-200` through `neutral-400` on those slabs with `text-ivory` and `text-mist`.
- Replace borders with `border-bone` on light surfaces and `border-border` (which is already bone in light mode, `border-dark` in dark mode).
- Primary actions use `Button` without a white/neutral override. One primary button in each group. The second action is a text or outline link.
- Cards stay `bg-card`, `border-border`, `rounded-2xl`.
- Drop `hover:scale-105`. A color change is enough.
- Footer legal links: remove them or leave them out until those pages exist. Do not keep `href="#"`.

### Step 3 — Photos through `next/image`

Files: `HeroSection.tsx`, `ExperienceSection.tsx`, and any other section that uses `<img>` or a CSS background for a content photo (`DailyRhythmSection.tsx`, `PurposeSection.tsx`).

- Give each photo width and height, or a filled parent with `sizes`.
- Alt text comes from the media `alt` when an upload exists, and from the section heading when only the fallback URL is used.
- Keep the hero crop. Do not build the URL with string interpolation inside `style`.

### Step 4 — Types and comments

Files: `ExperienceSection.tsx`, `FaqSection.tsx`, `page.tsx`, and any section whose map callback is untyped.

- Type the fallback service and FAQ objects so the map callback is not `any`. A narrow local type is enough. Do not invent a new shared card component.
- Delete comments that only name the section.
- FAQ toggle sets `aria-expanded`. Keep the answer associated with that button.

### Step 5 — One default per field, and an honest empty state

Files: `page.tsx` and the section components. Do not change Payload fields in this step.

- If the page passes `undefined`, the component default is what renders. Delete duplicate fallback strings that disagree with `Homepage.ts`.
- If a collection returns an empty list, render one sentence in that section. Do not substitute the named sample testimonials or the sample services once this step is done.
- Sample copy may remain in the component only for the case when the Payload read throws. That matches the existing `try/catch` in `page.tsx`.

### Step 6 — Check, then stop

On `/`:

- Header and sheet list the same destinations, and each label matches the target.
- No `emerald`, `amber`, or `neutral` class remains under `src/components/home` or `Footer.tsx`.
- Reserve and a service card with a real URL leave the page. A card with no URL does not pretend to book.
- Keyboard: tab through the header, sheet, FAQ, and buttons. Focus is visible. FAQ announces open and closed.
- Empty collections show a sentence, not fake parents.

Then update `progress-tracker.md`: Feature 01 and Feature 02 only if both actually passed this check. Leave Features 03 and 04 unchecked. The footer still will not read the homepage global until Feature 04.
