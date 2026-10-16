# Code Standards

Implementation rules and conventions for the entire project. The AI agent must follow these in every session without exception. These rules prevent pattern drift across sessions.

---

## Engineering Mindset

The AI agent on this project operates as a senior engineer. This means:

- **Think before implementing** — understand what is being built and why before writing a single line
- **Read context files first** — never assume, always verify against `architecture.md` and `project-overview.md`
- **Scope is sacred** — only build what the current feature requires. Never go beyond scope even if it seems helpful
- **Every feature must be testable** — if it cannot be verified immediately after implementation, it is incomplete
- **Clean over clever** — simple readable code that a junior developer can understand is always preferred over clever abstractions
- **One thing at a time** — complete one feature fully before touching the next
- **Failures are expected** — public pages catch Payload read failures, log them, and render the component defaults. One failed read must not take down the page

This is a marketing site. A service booking URL is a link to the third-party booking service. Do not add payment, email, or customer-auth code.

---

## TypeScript

- Strict mode is enabled in `tsconfig.json` — no exceptions
- Never use `any` — use `unknown` and narrow the type
- Never use type assertions (`as SomeType`) unless absolutely necessary, and then comment why
- Helpers, server actions, and other non-component functions must type every parameter and return value
- Component return types stay inferred. Do not rework `src/components/ui/` or `src/payload-types.ts` to add return types
- Use `type` for object shapes and unions — use `interface` only for component props
- All async functions must have proper error handling — never let promises float unhandled
- Use `const` by default — only use `let` when reassignment is necessary

---

## Next.js 16 Conventions

- App Router only — no Pages Router
- React 19 — use React 19 APIs throughout
- All components are Server Components by default
- Only add `"use client"` when the component requires:
  - `useState` or `useReducer`
  - `useEffect`
  - Browser APIs
  - Event listeners
- Never add `"use client"` to layout files unless absolutely required
- Data fetching happens in Server Components — never fetch in Client Components directly
- UI components receive props. They do not call Payload or decide access
- Payload already owns `app/(payload)/api`. Add a custom route handler only when a Server Component or Server Action cannot do the job, and keep business rules out of the handler. Those rules belong in a collection, a global, or `src/lib/`
- Server Actions live in `src/actions/` — never define Server Actions inline in components
- Public pages may export `revalidate` when the content should be cached. The homepage uses `revalidate = 60`
- Always read the Next.js docs in `node_modules/next/dist/docs/` before implementing any Next.js feature — APIs may differ from training data

---

## Payload

Refer to `payload-structure.md`.

Until that file exists, follow `architecture.md`:

- Page copy and images come from globals and collections
- Server pages talk to Payload through the Local API
- Shared helpers stay pure and live in `src/lib/`
- Import `cn` from the `cn` package
- Schema changes go through migrations. `push` stays off

---

## Comments

- No comments explaining what the code does — code must be self-explanatory
- Comments only for why — explaining a non-obvious decision

---

## Dependencies

Never install a new package without a clear reason. Before installing anything check:

1. Does shadcn/ui already have this component?
2. Does Next.js already provide this functionality?
3. Is there a simpler native solution?

Do not install any other packages without updating this list first. Do not add a booking, payment, or email package. Those concerns stay outside this application.
