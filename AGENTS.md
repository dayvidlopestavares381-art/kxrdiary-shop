# AGENTS.md — KXRDIARY

Read **PLAN.md** first: it is the roadmap. Milestone 1 (storefront) is complete; continue with the next unchecked milestone.

## Architecture

- Vite + React 19 SPA, React Router (`react-router` v8, declarative `<BrowserRouter>` routes in `src/App.tsx`).
- Deliberately **no full-stack framework**: the planned backend is a Netlify Server (`netlify/server/index.mjs`, scoped to `/api/*`). A framework catch-all function would shadow it.
- `netlify.toml` lists each SPA route as an explicit rewrite to `/index.html` instead of `/*` so `/api/*` can reach the server later. **Add a rewrite there whenever you add a new top-level route** (e.g. `/admin`, `/admin/*`).
- Unknown paths fall back to `public/404.html`; in-app unknown routes render `pages/NotFound.tsx`.

## Key directories

- `src/data/fixtures.ts` — the only source of stubbed content and the type contract (`Product`, `Coupon`, `GuideSection`, …).
- `src/data/store.ts` — data access (`getProducts`, `getProduct`, `getCoupons`, `queryProducts`, `useAsync`). Swap these to `fetch('/api/...')` in milestone 2; pages must not import fixtures for products/coupons directly.
- `src/components/` — Header (+ nav config `NAV`), SearchOverlay, Footer, Catalogue (search/filter/sort/pagination via URL params `q`, `category`, `sort`, `featured`), ProductCard/ProductGrid, ProductImage, ShareLinks, Reveal, Seo, PageHeader, Icons (brand SVGs; lucide has no brand icons).
- `src/pages/` — one file per route.
- `public/img/` — generated editorial imagery (hero, promo, guides). Always reference via `cdn()` / `srcSet()` in `src/lib/img.ts` (Netlify Image CDN).
- `public/__forms.html` — static Netlify Forms skeleton for the `contact` form. Field names must match `pages/Contact.tsx`.

## Conventions

- Monochrome palette tokens (`ink`, `graphite`, `ash`, `smoke`, `silver`, `mist`, `paper`, `bone`) and fonts (Bodoni Moda display, Hanken Grotesk body, JetBrains Mono for prices/codes) are defined in `src/index.css` `@theme`. Reuse `.btn`, `.btn-solid`, `.btn-ghost`, `.btn-light`, `.field`, `.eyebrow`, `.display`, `.skeleton`, `.slot-surface`.
- Every page renders `<Seo title description>` (React 19 hoists `<title>`/`<meta>`).
- External store links: `target="_blank" rel="noopener noreferrer nofollow"`. If a product has no URL, render a disabled button — never a dead link.
- Never invent products, prices, links, coupon codes, reviews or statistics. Empty slots render as numbered placeholders (`isFilled`, `displayName`, `formatPrice` in `store.ts`).
- Always ship loading (skeleton), empty and error states.
- Rounded corners only on chips and icon buttons.

## Non-obvious decisions

- The 150 slots are spread across categories (`i % 8`) and the first 8 / 16 are flagged featured / new so every section has layout content before real products exist.
- Price sorts push unpriced items to the end.
- Login/Sign up validate input but show a "accounts opening soon" notice; wire them to Netlify Identity in milestone 3. The admin role must be enforced server-side.
- The Instagram URL/handle in `SITE` is a placeholder for the owner to confirm.
