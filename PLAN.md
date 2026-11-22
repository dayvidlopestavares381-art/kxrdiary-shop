# KXRDIARY — Product roadmap

KXRDIARY is a premium fashion-finds catalogue: visitors browse, search and filter curated products that link out to the stores selling them, and the owner manages everything from a private dashboard. The goal is that the owner's only regular task is: upload a photo, type a name, price and link, pick a category, press **Save**.

The platform is delivered in milestones. Each one is self-contained and leaves the site working.

## Milestone 1 — Storefront experience ✅ (done)

The complete public website, running on stubbed content from `src/data/fixtures.ts`.

- Fixed header (logo, search, all-finds icon, Log in, Sign up) and navigation bar: Home, Finds, Categories, New Arrivals, Coupons, Guides, Contact.
- Homepage: hero, featured scroller, latest finds, category index, new arrivals, coupons promo, catalogue call-to-action, Instagram section and share links.
- Catalogue with 150 empty numbered slots across 8 categories; responsive grid (2 / 3 / 4 / 5 columns), live search by name, category and reference, category chips, sort (newest, price ↑, price ↓, featured), featured-only toggle, clear filters, load-more pagination, loading/empty/error states.
- Category index and per-category pages, New Arrivals page.
- Product detail page: large photo, name, price, description, category, copyable reference, Buy / View product button (new tab, `noopener noreferrer`), share links, related finds.
- Coupons page (verified, non-expired codes only, copy button, store link) with an empty state until real codes exist.
- Guides page: how to order, find products, use references, track an order, shipping, FAQ; sections support an image and a YouTube/Vimeo video link.
- Contact form with validation, honeypot and **live storage via Netlify Forms**.
- Log in / Sign up screens with validation (not yet connected to accounts).

## Milestone 2 — Product database and API

- Add a Netlify Server (`netlify/server/index.mjs`, Hono) scoped to `/api/*`. The SPA rewrites in `netlify.toml` are already explicit per route, so they won't shadow it.
- Netlify Database (Postgres + Drizzle) schema in `db/schema.ts`: `products` (id, position, name, price, currency, category, reference, url, description, image_key, featured, new_arrival, created_at, updated_at).
- Seed the 150 empty slots.
- Public endpoints: `GET /api/products` (search, category, sort, pagination), `GET /api/products/:id`.
- Swap the functions in `src/data/store.ts` to `fetch` these endpoints — pages and components stay unchanged.
- Decide whether empty slots are hidden from the public catalogue once real products exist.

## Milestone 3 — Accounts and admin protection

- Netlify Identity for visitor sign up / log in (wire the existing `/login` and `/signup` screens; registration stays optional).
- An `admin` role assigned only to the owner; admin pages and every `/api/admin/*` route verify it on the server.
- No admin links or credentials anywhere in the public UI.

## Milestone 4 — Admin dashboard (products)

- `/admin` mobile-friendly dashboard behind the admin role.
- Quick-add form with only five required fields: photo, name, price, link, category. Everything else (reference, description, featured, new arrival) optional.
- Product table with image previews, search, pagination, edit, delete with confirmation, bulk selection and bulk delete with confirmation, drag-to-reorder (writes `position`).
- Saved changes appear on the public site immediately.

## Milestone 5 — Secure image uploads

- Upload endpoint storing photos in Netlify Blobs (type and size validation, generated keys, admin-only).
- Serve stored photos through a server route and the Netlify Image CDN so cards load small, optimised WebP images.

## Milestone 6 — Coupons, guides and site settings management

- Database tables and admin editors for coupons (name, discount, code, expiry, store link, verified flag) — expired codes hidden automatically.
- Editable guide sections (text, steps, image upload, video link) and FAQ entries.
- Site settings: Instagram URL and handle, homepage copy.

## Milestone 7 — Polish and launch checks

- Per-product Open Graph images and metadata, sitemap and robots.txt.
- Full pass on accessibility, mobile layouts and performance.
- End-to-end checks: navigation, product create / edit / delete, image upload, search, filters, external links, admin access rules, persistence after refresh.
