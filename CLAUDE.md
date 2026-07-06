# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this project is

`iambecomingbooks` is the marketing website for **_I Am Becoming_**, a
nine-book contemplative series by author **Spike Humer**, published under
**SoulWord Press**. It is a small, content-driven single-page application with a
thin Express server that exists mainly to inject per-route SEO metadata and to
proxy a Mailchimp newsletter signup.

The site is deliberately simple: a handful of static-content pages, no database,
no user accounts, no client-side data fetching beyond the newsletter form. Most
"content" lives as typed data in `shared/`, and the pages render it.

Production site: `https://iambecomingbooks.com`

## Tech stack

- **Runtime/build:** [Vite 7](https://vite.dev) (client), [esbuild](https://esbuild.github.io) (server bundle)
- **Language:** TypeScript 5.6 (strict), ESM throughout (`"type": "module"`)
- **UI:** React 19, [wouter](https://github.com/molefrog/wouter) for routing, [framer-motion](https://www.framer.com/motion/) for animation
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`), [shadcn/ui](https://ui.shadcn.com) (new-york style) components in `client/src/components/ui/`
- **Server:** Express 4, [axios](https://axios-http.com) (Mailchimp calls)
- **Validation/forms:** zod 4, react-hook-form, `@hookform/resolvers`
- **Package manager:** **pnpm** (v10). Do not use npm/yarn — there is a `pnpm-lock.yaml` and pnpm-specific `patchedDependencies`/`overrides`.

## Commands

Run everything with pnpm from the repo root.

| Command | What it does |
| --- | --- |
| `pnpm install` | Install deps (applies the wouter patch automatically) |
| `pnpm dev` | Vite dev server on port 3000 (`--host`), HMR. Serves the client only. |
| `pnpm build` | `vite build` → `dist/public`, then esbuild-bundle `server/index.ts` → `dist/index.js` |
| `pnpm start` | Run the built server in production (`NODE_ENV=production node dist/index.js`) |
| `pnpm preview` | Preview the built client with Vite |
| `pnpm check` | `tsc --noEmit` — the type check. **Run this before committing.** |
| `pnpm format` | Prettier write across the repo |

There is **no test suite** and no lint step. `vitest` is a dependency but no
`*.test.ts` files exist and they are excluded from the tsconfig. Quality gate is
`pnpm check` + `pnpm format`.

### The dev vs. server split (important)

`pnpm dev` runs Vite only and does **not** run the Express server. That means in
dev the SEO placeholders in `client/index.html` (`__SEO_TITLE__`, etc.) are
**not** filled in by the server — the client-side `Seo` component patches the
document head at runtime instead. To exercise the real server behavior
(placeholder injection, 301 redirects, `/api/subscribe`), you must
`pnpm build && pnpm start`.

## Repository layout

```
client/                 Vite root — the React SPA
  index.html            HTML template with __SEO_*__ / __ANALYTICS_SCRIPT__ placeholders
  src/
    main.tsx            React entry (createRoot)
    App.tsx             Providers + wouter <Route> table (all pages lazy-loaded)
    index.css           Tailwind v4 theme + design tokens (oklch palette, fonts)
    pages/              One component per route (Home, About, Books, Receive, book pages, …)
    components/
      Layout.tsx        Shared header/nav/footer wrapper used by every page
      Seo.tsx           Client-side head/meta/JSON-LD updater, keyed on route path
      BookDetailPage.tsx Shared template for the three published-book pages
      ui/               shadcn/ui primitives (generated; see components.json)
    contexts/ThemeContext.tsx  light/dark theme (defaults light, not switchable in App)
    hooks/, lib/utils.ts (cn helper)
    const.ts            Re-exports @shared/const + runtime OAuth URL helper
  public/               Client static assets: images/, robots.txt, sitemap.xml
server/
  index.ts              Express app: host redirect, /api/subscribe, SEO injection, catch-all
shared/                 Code imported by BOTH client and server (keep it isomorphic)
  seo.ts                SeoRoute type, per-route SEO entries, URL/escape helpers
  structuredData.ts     schema.org JSON-LD graph builder (Person/Org/Book/Breadcrumb…)
  siteContent.ts        Long-form page copy (about, per-book extended content)
  books.ts              publishedBooks[] + upcomingVolumes[] (titles, Amazon links, blurbs)
  const.ts              Shared constants
public/                 Repo-root public dir (extra book-cover images)
scripts/optimize_images.py  Pillow script: regenerates responsive .webp variants
patches/                pnpm patch for wouter@3.7.1
ideas.md                Informal working notes / backlog (not authoritative)
```

Path aliases (configured in `vite.config.ts` and `tsconfig.json`):

- `@/…`  → `client/src/…`
- `@shared/…` → `shared/…`
- `@assets/…` → `attached_assets/…` (directory may not exist; used by tooling)

## How the site is wired

### Routing (`client/src/App.tsx`)

wouter `<Switch>` with lazy-loaded page components. Adding a page = add a lazy
import + a `<Route path="…" component={…} />`. The final unmatched `<Route>`
renders `NotFound`. `/the-book-series` is a legacy path that redirects to
`/books` on the client (`LegacyBooksRedirect`) and on the server (see below).

### The three published books

`The Waking`, `The Companion`, and `The Standing` each have a route
(`/the-waking`, etc.). Their page components are thin wrappers that pass
`bookPageContent[slug]` into the shared `BookDetailPage`. Book metadata (Amazon
links, blurbs, availability) lives in `shared/books.ts`; long-form page copy in
`shared/siteContent.ts`. To edit book content, change the data in `shared/`, not
the components.

### SEO — the dual system (read before touching SEO)

SEO is applied in **two** places that must stay in sync:

1. **Server-side (`server/index.ts` → `injectSeoTemplate`):** on every request
   the Express catch-all reads `getSeoEntry(path)` + `getStructuredData(path)`
   from `shared/` and string-replaces the `__SEO_*__` placeholders in
   `client/index.html`. This is what crawlers and social scrapers see.
2. **Client-side (`client/src/components/Seo.tsx`):** each page renders
   `<Seo path="…" />`, which upserts the same `<title>`, meta tags, canonical
   link, and JSON-LD `<script>` on navigation (SPA route changes never hit the
   server).

Both read the **same** source of truth in `shared/seo.ts` and
`shared/structuredData.ts`. When you add or change a route's SEO:

- Add the route to the `SeoRoute` union and `seoEntries` map in `shared/seo.ts`.
- If it needs custom structured data, extend `shared/structuredData.ts`.
- Add the page's `<Seo path="…" />` in the page component.
- Update `client/public/sitemap.xml`.

`normalizePublicPath` maps unknown paths back to `/`, so a route missing from
`seoEntries` silently gets the homepage's SEO — don't rely on that.

### Server responsibilities (`server/index.ts`)

- **Host canonicalization:** redirects `www.iambecomingbooks.com` → apex `iambecomingbooks.com` (301).
- **`POST /api/subscribe`:** validates an email, then subscribes it to Mailchimp
  using `MAILCHIMP_*` env vars. Treats an existing member as success. This is the
  only server-side business logic.
- **Legacy redirects:** `LEGACY_ROUTE_REDIRECTS` (in `shared/seo.ts`) → 301 (currently `/the-book-series` → `/books`).
- **Static + catch-all:** serves `dist/public`, then for any other path injects
  the SEO template and returns the SPA `index.html`.

### Environment variables

Server-side (needed for `/api/subscribe` and analytics; app runs without them
but the newsletter form will 500):

- `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_SERVER_PREFIX` (default `us1`)
- `VITE_ANALYTICS_ENDPOINT`, `VITE_ANALYTICS_WEBSITE_ID` (Umami; script omitted if unset)
- `PORT` (default 3000), `NODE_ENV`

Client-side (`import.meta.env`, currently referenced by `client/src/const.ts`
for an OAuth helper that isn't wired into any active flow): `VITE_APP_ID`,
`VITE_OAUTH_PORTAL_URL`, `VITE_FRONTEND_FORGE_API_*`. Env files (`.env*`) are
gitignored — never commit secrets.

## Styling & design conventions

- **Tailwind v4** with CSS-first config. Design tokens live in
  `client/src/index.css` under `@theme inline` and `:root` / `.dark` — an
  oklch-based "Ethereal Horizon" palette. Prefer semantic tokens
  (`bg-background`, `text-muted-foreground`, `border-border/40`, `text-accent`)
  over raw colors.
- **Fonts:** `font-serif` = Cormorant Garamond (headings), `font-sans` = Lato
  (body). Loaded from Google Fonts in `client/index.html`.
- **Tone of the copy:** contemplative, gentle, unhurried. Nav labels are
  evocative ("Invitation", "Inside the Pages", "The Author", "Join the Circle")
  rather than literal. Match this voice when editing user-facing text.
- **Compose classes with `cn()`** from `@/lib/utils` (clsx + tailwind-merge).
- **shadcn/ui:** components in `client/src/components/ui/` are generated
  (`components.json`, new-york style, base color neutral). Prefer adding via the
  shadcn CLI over hand-editing, and avoid gratuitous edits to these files.
- **Theme:** `ThemeProvider` defaults to `light` and is instantiated
  non-switchable in `App.tsx`; a `.dark` palette exists but there is no toggle in
  the current UI.

### Images

Responsive images use `<picture>` with `.webp` variants at multiple widths (see
`Home.tsx` hero). To add/resize optimized images, edit the `TARGETS` map in
`scripts/optimize_images.py` (requires Python + Pillow) and run it; it writes
`.webp` files into `client/public/images/`. Keep explicit `width`/`height` and
`loading`/`fetchPriority` attributes for CLS/perf.

## Code conventions

- **Formatting:** Prettier is the authority (`.prettierrc`): 2-space indent,
  **double quotes**, semicolons, `printWidth` 80, ES5 trailing commas,
  `arrow-parens: avoid`. Run `pnpm format`; don't hand-fight the formatter.
- **TypeScript strict** is on. Keep `pnpm check` green. Model content as typed
  data (see `PublishedBook`, `SeoRoute`, `SeoEntry`) rather than loose objects.
- **Keep `shared/` isomorphic:** anything in `shared/` is imported by both the
  browser and Node. No browser-only (`window`, `document`) or Node-only (`fs`)
  APIs there.
- **Content-as-data:** when changing copy, book details, or SEO, prefer editing
  the data in `shared/` so the client head, server head, and JSON-LD stay
  consistent automatically.

## Working in this repo

- Do the type check (`pnpm check`) and format (`pnpm format`) before committing.
- When you change routes/content, remember the **three** places that describe
  the site's structure and must agree: `App.tsx` routes, `shared/seo.ts`
  entries, and `client/public/sitemap.xml` (plus JSON-LD in
  `shared/structuredData.ts` where relevant).
- To verify server behavior (SEO injection, redirects, subscribe), build and run
  (`pnpm build && pnpm start`) — `pnpm dev` alone won't exercise it.
- `ideas.md` is informal scratch notes, not a spec; don't treat it as
  authoritative.

## Git / branch workflow

Development for the current task happens on branch `claude/claude-md-docs-h8b08s`
(the default branch is `main`). Commit with clear messages and push with
`git push -u origin <branch>`. Do not open a pull request unless explicitly
asked.
