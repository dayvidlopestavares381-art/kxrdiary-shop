# KXRDIARY

A premium, minimalist fashion-finds catalogue. Visitors discover clothing, shoes, bags, accessories, beauty, jewellery and lifestyle pieces, search and filter them, and jump straight to the store that sells each one. KXRDIARY doesn't sell anything itself — every find links out to its store.

## What's live

- Editorial homepage (hero, featured, latest finds, categories, new arrivals, coupons promo, Instagram).
- Full catalogue ready for 150+ products (currently 150 empty, numbered slots) with live search, category filters, sorting, featured filter, clear filters and pagination.
- Category pages, New Arrivals, product detail pages with safe external store links and share buttons.
- Coupons page (verified codes only), Guides page with FAQ, Contact form (stored with Netlify Forms), Log in / Sign up screens.

## Tech

- [Vite](https://vite.dev) + React 19 + TypeScript
- React Router for client-side routing
- Tailwind CSS v4 (design tokens in `src/index.css`)
- Netlify Image CDN for optimised images, Netlify Forms for contact messages
- Planned: Netlify Server (API), Netlify Database (products, coupons, guides), Netlify Identity (accounts + admin role), Netlify Blobs (product photos)

## Run locally

```bash
npm install
netlify dev --port 8889   # recommended: emulates the Image CDN and Forms
# or
npm run dev               # plain Vite (images under /.netlify/images won't resize)
```

## Content

Until the database milestone lands, all content lives in `src/data/fixtures.ts`:

- `SITE` — Instagram URL and handle
- `CATEGORIES` — the eight categories
- `PRODUCTS` — 150 empty slots (photo, name, price, category, reference, link, description, featured, new arrival)
- `COUPONS` — verified codes only (empty by default)
- `GUIDES` / `FAQS` — guide sections (each may have an `image` and a `videoUrl`)

## Roadmap

See [PLAN.md](./PLAN.md). Next up: the product database and API, then accounts with a protected admin role, then the admin dashboard where products are added with a photo, name, price, link and category.
