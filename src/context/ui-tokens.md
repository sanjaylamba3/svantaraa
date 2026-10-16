# UI Tokens

Design tokens for Svantaraa.

This file defines the project's design system tokens for colors, typography, spacing, border radius, shadows, and common component styles.

These tokens should be used throughout the application instead of hardcoded values.

---

# How to Use

This project uses **Tailwind CSS v4**.

All design tokens are defined in `src/app/(frontend)/styles.css`. Raw brand colors live in `:root`. Semantic shadcn variables point at those colors. `@theme inline` exposes both as Tailwind classes.

Never hardcode colors or use raw Tailwind palette classes inside components.

```tsx
// Correct — semantic tokens
className="bg-primary text-primary-foreground"

// Correct — brand raw tokens (when semantic doesn't fit)
className="bg-forest text-ivory"

// Correct — border token
className="border-border"

// Avoid — raw Tailwind palette
className="bg-emerald-800"
className="text-amber-300"

// Avoid — hardcoded hex/oklch
className="bg-[#1A1918]"
```

The homepage sections still contain older palette classes. Replace those when that page is rebuilt. Do not add new ones.

---

# Brand Palette — Raw Tokens

These raw color tokens are always available and do not change between light and dark mode. They come from the written palette in `src/starter/DESIGN.md`: ivory canvas, charcoal, forest green, and champagne gold. The Material-style color list in that file is not part of this theme.

| Token | Value (oklch) | Source | Usage |
|-------|--------------|--------|-------|
| `ivory` | `97.98% 0.0045 78.3` | `#FAF8F5` | Page canvas |
| `white` | `100% 0 0` | `#FFFFFF` | Cards and popovers |
| `sand` | `95.85% 0.0098 87.47` | `#F4F1EA` | Subdued surfaces and badge fills |
| `espresso` | `21.42% 0.0025 67.69` | `#1A1918` | Text and primary buttons |
| `forest` | `38.48% 0.0425 165.11` | `#2D4B3E` | Botanical accent and success |
| `champagne` | `70.77% 0.1231 86.78` | `#C29B38` | Prestige accent and focus ring |
| `champagne-soft` | `75% 0.0861 65.3` | `#D4A373` | Lighter gold highlight |
| `bone` | `91.12% 0.0133 82.4` | `#E6E1D8` | Hairline border |
| `stone` | `39.61% 0.0113 78.19` | `#4A4640` | Muted text on light surfaces. 8.31:1 on sand |
| `cocoa` | `22.28% 0.0025 67.7` | `#1C1B1A` | Card surface in dark mode |
| `walnut` | `31.14% 0.0038 128.6` | `#30312F` | Muted surface in dark mode |
| `mist` | `70% 0.012 80` | — | Muted text in dark mode. 4.89:1 on walnut |
| `brick` | `50.6% 0.1927 27.7` | `#BA1A1A` | Destructive and error only |
| `border-dark` | `38% 0.006 80` | — | Hairline in dark mode. About 1.7:1 on cocoa and espresso |

---

# Semantic Color Mapping

## Light Mode (`:root`)

| Semantic Token | Maps To | Notes |
|----------------|---------|-------|
| `--background` | ivory | App background |
| `--foreground` | espresso | Primary text. 16.56:1 on ivory |
| `--card` | white | Cards and containers |
| `--card-foreground` | espresso | |
| `--popover` | white | Popovers and the mobile sheet |
| `--popover-foreground` | espresso | |
| `--primary` | espresso | Primary buttons |
| `--primary-foreground` | ivory | 16.56:1 on espresso |
| `--secondary` | sand | Supporting surfaces |
| `--secondary-foreground` | espresso | |
| `--muted` | sand | Subdued surfaces |
| `--muted-foreground` | stone | 8.31:1 on sand |
| `--accent` | champagne | Prestige highlight |
| `--accent-foreground` | espresso | 6.72:1 on champagne |
| `--destructive` | brick | Errors |
| `--destructive-foreground` | ivory | 6.09:1 on brick |
| `--border` | bone | Hairline borders |
| `--input` | bone | Input borders |
| `--ring` | champagne | Focus ring |
| `--success` | forest | Confirmed and completed states |
| `--success-foreground` | ivory | 9.06:1 on forest |

## Dark Mode (`.dark`)

| Semantic Token | Maps To | Notes |
|----------------|---------|-------|
| `--background` | espresso | |
| `--foreground` | ivory | |
| `--card` | cocoa | |
| `--card-foreground` | ivory | |
| `--popover` | cocoa | |
| `--popover-foreground` | ivory | |
| `--primary` | ivory | Buttons stay visible on an espresso page |
| `--primary-foreground` | espresso | |
| `--secondary` | walnut | |
| `--secondary-foreground` | ivory | |
| `--muted` | walnut | |
| `--muted-foreground` | mist | 4.89:1 on walnut |
| `--accent` | champagne | Unchanged between modes |
| `--accent-foreground` | espresso | |
| `--destructive` | brick | |
| `--destructive-foreground` | ivory | |
| `--border` | border-dark | |
| `--input` | walnut 40% transparent | `color-mix(in oklch, walnut 40%, transparent)` |
| `--ring` | champagne | |
| `--success` | forest | |
| `--success-foreground` | ivory | |

---

# Color Usage

## Backgrounds

| Element | Token |
|----------|-------|
| App background | `bg-background` |
| Cards / containers | `bg-card` |
| Popovers / sheet | `bg-popover` |
| Secondary surfaces | `bg-secondary` |
| Muted surfaces | `bg-muted` |
| Sidebar | `bg-sidebar` |

---

## Typography Colors

| Element | Token |
|----------|-------|
| Primary text | `text-foreground` |
| Card text | `text-card-foreground` |
| Muted / caption text | `text-muted-foreground` |
| Primary button text | `text-primary-foreground` |
| Secondary button text | `text-secondary-foreground` |
| Botanical accent | `text-forest` |
| Gold accent | `text-champagne` |

Champagne on ivory is 2.46:1. Use it for icons, stars, and focus rings, not for body text on the canvas.

---

## Primary Brand

Reserved for the main action in a group: Reserve, a service booking link, and the contact submit button.

```
bg-primary
text-primary
border-primary
```

In light mode that fill is espresso. In dark mode it is ivory.

---

## Accent

Reserved for prestige highlights and the focus ring.

```
bg-accent
text-champagne
ring-ring
```

Forest is the botanical accent for icons and success, via `text-forest` or `bg-success`.

---

## Semantic Colors

### Success (`bg-success`, `text-success-foreground`)

- A message that was received
- A completed content save in custom UI

### Destructive (`bg-destructive`, `text-destructive-foreground`)

- Validation errors
- A failed inquiry submit

### Chart Colors

Five chart slots: `chart-1` (espresso), `chart-2` (forest), `chart-3` (champagne), `chart-4` (champagne-soft), `chart-5` (brick).

---

# Typography

## Font Families

| Purpose | Font Stack | Tailwind Class |
|---------|-----------|----------------|
| Display / Headings | Playfair Display → Georgia → serif | `font-display`, `font-heading`, `font-serif` |
| Body / UI | Outfit → system-ui → sans-serif | `font-body`, `font-sans` |

Both families are loaded in `src/app/(frontend)/layout.tsx`. The design notes name Plus Jakarta Sans. This project does not load it.

## Font Weights

| Element | Weight |
|----------|--------|
| Display heading | 400 |
| Section heading | 500–600 |
| Body text | 400 |
| Labels and overlines | 600, with wide tracking |
| Buttons | 600 |

---

# Spacing

Use Tailwind's default spacing scale.

Common spacing:

| Token | Usage |
|--------|-------|
| gap-2 | Small gaps |
| gap-4 | Component spacing |
| gap-6 | Section spacing |
| gap-8 | Large sections |
| p-4 | Compact padding |
| p-6 | Card padding |

Keep the public content width near `max-w-7xl` (80rem). Section padding stays generous.

---

# Border Radius

Base radius: `0.5rem`

| Token | Value |
|-------|-------|
| `rounded-sm` | `calc(0.5rem - 4px)` = 0.25rem |
| `rounded-md` | `calc(0.5rem - 2px)` = 0.375rem |
| `rounded-lg` | `0.5rem` |
| `rounded-xl` | `calc(0.5rem + 4px)` = 0.75rem |
| `rounded-2xl` | `0.5rem × 1.8` = 0.9rem |
| `rounded-3xl` | `0.5rem × 2.2` = 1.1rem |
| `rounded-4xl` | `0.5rem × 2.6` = 1.3rem |
| `rounded-full` | Pill. Use this for buttons and chips |

Service cards use `rounded-2xl`. Buttons and chips use `rounded-full`.

---

# Shadows

Warm-tinted shadows use the espresso coordinates (`21.42% 0.0025 67.69`) in light mode. Dark mode switches the shadow base to pure black (`0% 0 0`).

| Token | Value | Usage |
|-------|-------|-------|
| `var(--shadow-sm)` | `0 4px 20px -2px` at 4% | Cards at rest |
| `var(--shadow-md)` | `0 12px 32px -4px` at 8% | Hover and dropdowns |
| `var(--shadow-lg)` | `0 16px 40px -6px` at 12% | Overlays |

Prefer a hairline `border-border` over a heavy shadow. The header may use a translucent ivory background with blur. Do not invent a second shadow scale.

---

# Component Tokens

Reusable controls come from `components/ui` and inherit these tokens.

- **Cards**: `bg-card text-card-foreground border-border rounded-2xl`
- **Primary button**: `bg-primary text-primary-foreground rounded-full`
- **Secondary button**: transparent, `border-border text-foreground`, sand fill on hover
- **Input**: `bg-card border-input text-foreground focus:ring-ring`
- **Sheet**: `bg-popover text-popover-foreground`

There is no shared table, toast, or dialog on the public site.

---

# Sidebar Tokens

Payload's admin is separate. These tokens keep any sidebar that uses the shadcn names on the same palette.

| Token | Light | Dark |
|-------|-------|------|
| `--sidebar` | white | cocoa |
| `--sidebar-foreground` | espresso | ivory |
| `--sidebar-primary` | espresso | ivory |
| `--sidebar-primary-foreground` | ivory | espresso |
| `--sidebar-accent` | sand | walnut |
| `--sidebar-accent-foreground` | espresso | ivory |
| `--sidebar-border` | bone | border-dark |
| `--sidebar-ring` | champagne | champagne |

---

# Icons

Use **Tabler Icons** (`@tabler/icons-react`) throughout the application.

Never mix icon libraries. Pair an icon with a text label.

---

# Motion

- Keep animations subtle.
- Prefer 150–250ms transitions.
- A short hover lift is enough. Do not add scroll-driven animation.
- Respect `prefers-reduced-motion`.

---

# Responsive Breakpoints

Use Tailwind defaults.

Primary layouts should support:

- Mobile
- Tablet (`md`, 768px)
- Desktop (`lg`, 1024px)
- Large desktop

---

# Accessibility

- Text on a fill meets AA contrast (4.5:1). The pairs in the tables above were checked.
- Visible keyboard focus via `ring-ring` (champagne).
- Never rely on color alone.
- Interactive targets at least 44×44px where practical.
- Champagne is not body text on ivory.

---

# Invariants

- Never hardcode colors inside components.
- Never use raw Tailwind palette utilities such as `bg-emerald-800`, `text-amber-300`, or `bg-neutral-900`.
- Always use a semantic token or a brand token from this file.
- Use `bg-success` for success and `bg-destructive` for errors.
- Use Tabler Icons (`@tabler/icons-react`) for all icons.
- Prefer Tailwind spacing utilities over custom values.
- Use `font-display` / `font-heading` for headings and `font-body` / `font-sans` for body text.
- Use `rounded-full` for buttons and `rounded-2xl` for cards.
