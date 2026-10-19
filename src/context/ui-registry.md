# UI Registry

Living document.

This file tracks the reusable UI components used in this project.

Before creating a new component:

1. Check if a similar component already exists.
2. Reuse or extend existing components whenever possible.
3. Follow the rules defined in `ui-rules.md`.
4. Use the design tokens from `ui-tokens.md`.
5. Update this registry whenever a reusable component is added or significantly changed.

Do not record Tailwind classes, colors, typography, border radius, or spacing here. Those belong in `ui-tokens.md` and `ui-rules.md`.

---

# Shared Components

Primitives that may be used on any public page.

| Component | Location | Purpose | Status |
|-----------|----------|---------|--------|
| Button | `components/ui/button.tsx` | Primary and secondary actions | Implemented |
| Sheet | `components/ui/sheet.tsx` | Mobile navigation drawer | Implemented |
| Input | `components/ui` | Single-line contact field | Planned |
| Textarea | `components/ui` | Message field on the contact form | Planned |

---

# Layout Components

| Component | Location | Purpose | Status |
|-----------|----------|---------|--------|
| Header | `components/layout/Header.tsx` | Public navigation and Reserve | Implemented |
| Footer | `components/layout/Footer.tsx` | Address, phone, hours, and closing links | Implemented |
| MobileNav | `components/layout/MobileNav.tsx` | Sheet menu for small screens | Implemented |

There is no separate navbar, breadcrumb, or page-header component. Each homepage section includes its own heading.

---

# Customer Website

## Homepage

| Component | Location | Purpose | Status |
|-----------|----------|---------|--------|
| HeroSection | `components/home/HeroSection.tsx` | Opening headline, image, and actions | Implemented |
| PhilosophySection | `components/home/PhilosophySection.tsx` | Sanctuary philosophy and pillars | Implemented |
| ExperienceSection | `components/home/ExperienceSection.tsx` | Service cards with price and booking link | Implemented |
| DailyRhythmSection | `components/home/DailyRhythmSection.tsx` | Daily schedule at the sanctuary | Implemented |
| PurposeSection | `components/home/PurposeSection.tsx` | Purpose statement, mission link, and sanctuary photos | Implemented |
| TestimonialsSection | `components/home/TestimonialsSection.tsx` | One parent quote at a time, with photo | Implemented |
| InstagramSection | `components/home/InstagramSection.tsx` | Scroll-driven photo row. Photos and the Instagram link come from the Homepage global | Implemented |
| FaqSection | `components/home/FaqSection.tsx` | Expandable questions and answers | Implemented |
| BookingBanner | `components/home/BookingBanner.tsx` | Closing invitation to the services section or the phone line | Implemented |

Service cards stay inside `ExperienceSection` until a second screen needs the same card.

## About

| Component | Purpose | Status |
|-----------|---------|--------|
| About page | Founder story, separate from the homepage sections | Planned |

The about page uses the existing `Header` and `Footer`.

## Contact

| Component | Purpose | Status |
|-----------|---------|--------|
| Contact page | Address, phone, hours, and the inquiry form | Planned |

---

# Payload Admin

Payload provides the admin for collections, globals, uploads, and auth.

No custom admin components are registered. 

---

# Reusable Patterns

## Cards

Service cards are part of `ExperienceSection`. Do not extract a shared card until another page renders the same card.

## Forms

The contact form is the only public form. It shares:

- Labels on every field
- Required-field marking
- The parent's input kept after a validation error
- A short error or success message in the form
- `Button` for submit

## Empty states

When a section has no records, that section shows one sentence of empty copy. Do not add a shared empty-state component for a single line.

## Overlays

`MobileNav` is the only public overlay. It uses `Sheet`. Do not stack another dialog on it.

---

# Naming Conventions

Feature components are grouped by screen area. One PascalCase component per file.

```
components/

  home/
    HeroSection.tsx
    ExperienceSection.tsx

  layout/
    Header.tsx
    Footer.tsx
    MobileNav.tsx

  ui/
    button.tsx
    sheet.tsx
```

Primitives belong in `components/ui/`. Feature UI belongs in `components/home/` or `components/layout/`.

---

# Updating This File

Whenever a reusable component is created:

- Add its name.
- Add its location.
- Add a short description.
- Set its status to Implemented or Planned.

---

# Invariants

- Reuse a component listed here before creating another.
- Do not duplicate a component that already covers the same job.
- Keep each component to a single responsibility.
- Pages fetch Payload data. These components render props.
- Shared primitives belong in `components/ui`.
- Feature UI belongs with its feature.
- Only custom Payload admin components would be listed here. There are none.
- Update this registry when a reusable component is added or its role changes.
