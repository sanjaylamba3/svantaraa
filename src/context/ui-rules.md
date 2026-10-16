# UI Rules

General UI and UX rules for Svantaraa.

These rules define how the public website should behave and remain consistent. They focus on usability, accessibility, and consistency.

Visual design tokens are defined separately in `ui-tokens.md`.

---

# General Principles

The interface should be:

- Simple
- Consistent
- Predictable
- Fast
- Accessible
- Mobile-friendly

A parent should see what a link does before tapping it. Important actions stay visible: Reserve, a service card’s booking link, About, and Contact.

---

# Layout

- Use one public shell on every page: fixed header, `main`, and footer.
- Keep generous spacing between major sections.
- Group related information together. A homepage section owns one idea.
- Avoid deeply nested layouts.
- Prefer a vertical stack on smaller screens.
- Keep the same header and footer on `/`, `/about`, and `/contact`.

---

# Navigation

## Customer Website

- Primary navigation is Services, About Us, and Contact.
- Services and Reserve move the visitor to the services section on the homepage.
- About Us and Contact open their own pages.
- The current page should always be visually identifiable.
- Small screens use the existing sheet menu. Do not add a second mobile navigation.

## Admin

- Staff use the Payload sidebar.
- Do not build a separate admin navigation or operations dashboard.
- Keep content grouped the way the configs already do, such as Pages and Website & Content.

---

# Typography

- Maintain a clear visual hierarchy.
- Use `font-display` / `font-heading` (Playfair Display) for display and section headings.
- Use `font-body` / `font-sans` (Outfit) for body text, labels, and UI elements.
- Never add a font family beyond these two. They are loaded in the frontend layout and mapped in `src/app/(frontend)/styles.css`.
- Use consistent heading levels, in order.
- Avoid excessive font sizes.
- Avoid unnecessary font weight variations.
- Long paragraphs should be broken into smaller sections.

---

# Cards

Use cards to group a service’s photo, description, price, and booking link.

Cards should:

- Share the same spacing.
- Share the same border radius.
- Avoid nesting a card inside a card.
- Keep unrelated sections as siblings, not as cards inside one another.

A card’s booking control opens that service’s external URL.

---

# Buttons

Use `src/components/ui/button.tsx`. Keep the hierarchy consistent.

### Primary

The main action in a group.

Examples:

- Reserve
- The booking link on a service card
- Send on the contact form

Avoid placing multiple primary buttons next to each other.

### Secondary

A supporting action.

Examples:

- Explore the sanctuary
- Call the concierge
- Schedule a walk-through


---

# Forms

The only public form is the contact form.

- Fields are name, email, phone, and message.
- Label every field.
- Show which fields are required.
- Validate before submit and keep what the parent typed when validation fails.
- Show a short, specific message next to the problem.
- Do not ask for booking dates, pet details, or payment information.

---


# Empty States

A section that can render with no records needs a short empty state.

An empty state should contain:

- One sentence explaining the gap
- An optional icon
- A next step when one exists

Examples:

- No services published yet
- No testimonials yet
- No questions published yet

The homepage still renders when a Payload read fails. It uses the section’s built-in defaults and does not show an error page for a single failed read.

---

# Loading States

Pages are rendered on the server. Do not add a loading spinner around content that is already in the HTML.

On the contact form:

- Disable the submit button while the request is in flight
- Keep the button’s space stable so the form does not jump

Avoid layout shifts while images load. Give photos a known size.

---

# Error States

Show a short message the parent can act on.

Good examples:

- Message could not be sent. Please call the concierge.
- Please enter a valid email.
- This page is unavailable. Return home.

Never show a stack trace, a database error, or a raw Payload error on the public site.

---

# Success Feedback

After the contact form succeeds, say that the message was received.

Do not claim a booking is confirmed. Booking confirmation belongs to the third-party service the parent just left for.

Do not toast the parent for reading a page.

---

# Responsive Design

The site should work on:

- Mobile
- Tablet
- Desktop

Avoid horizontal scrolling. The header stays usable at each size: links on larger screens, the sheet menu on smaller ones.

---

# Accessibility

- Maintain sufficient color contrast.
- Support keyboard navigation, including the sheet menu.
- Use semantic HTML: header, nav, main, footer, headings, and lists.
- Label every interactive control, including icon-only buttons.
- Provide a visible focus indicator.
- Do not rely on color alone to show the current page, an error, or a required field.

---

# Icons

- Use `@tabler/icons-react` only.
- Place an icon beside a text label. Do not replace the label with an icon.
- Skip icons that do not help the parent understand the section.

---

# Modals & Dialogs

The mobile navigation sheet is the only overlay on the public site.

Do not stack a dialog on that sheet. A long task, including the contact form and the founder story, belongs on a page.

---

# Notifications

Public feedback is inline.

- The contact form shows success or failure in the form.
- Do not add a toast system for homepage reading.
- Keep any message to one or two sentences.

---

# Consistency

Similar actions behave the same way on every page.

- Reserve and a service booking link are the way to leave for booking.
- Secondary actions use the secondary button treatment.
- Header and footer do not change between pages.
- Section spacing and heading styles match from the homepage through About and Contact.

---

# Performance

- Keep motion small. A short hover or icon shift is enough.
- Do not block the page on a client fetch for content the server can render.
- Serve photos with `next/image` and a known size.
- Do not add a carousel, a video background, or a scroll animation unless the current section already uses that pattern.

---

# Do Nots

- Do not hardcode a new color in a component. Use the semantic classes in `styles.css` and the tokens in `ui-tokens.md`.
- Do not add another font family.
- Do not invent a new pattern when Header, Button, or an existing homepage section already covers it.
- Do not hide Reserve or a service card’s booking link.
- Do not show technical error messages to parents.
- Do not add booking, payment, or account UI.
- Do not use an icon as the only label.
- Do not let spacing, type, or button behavior drift between pages.
