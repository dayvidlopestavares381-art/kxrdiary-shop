/**
 * KXRDIARY fixtures — the single source of stubbed content for the storefront.
 *
 * Everything the public site renders comes from here (via `src/data/store.ts`).
 * A later milestone replaces these with Netlify Database records managed from
 * the admin dashboard; the shapes below are the contract for that swap.
 *
 * No real products, prices, links or coupon codes are invented: the catalogue
 * ships as 150 empty, numbered slots waiting to be filled.
 */

export type CategoryId =
  | 'clothing'
  | 'shoes'
  | 'bags'
  | 'accessories'
  | 'beauty'
  | 'jewellery'
  | 'lifestyle'
  | 'other'

export interface Category {
  id: CategoryId
  name: string
  blurb: string
}

export interface Product {
  id: string
  /** Display order in the catalogue (lower first). */
  position: number
  /** Slot number shown while a slot is still empty. */
  slot: number
  name: string | null
  price: number | null
  currency: string
  category: CategoryId
  reference: string | null
  url: string | null
  description: string | null
  /** Path or URL to the product photo. */
  image: string | null
  featured: boolean
  newArrival: boolean
  createdAt: string
}

export interface Coupon {
  id: string
  name: string
  discount: string
  code: string
  expiresAt: string | null
  url: string
  verified: boolean
}

export interface GuideSection {
  id: string
  title: string
  kicker: string
  body: string[]
  steps?: string[]
  image?: string
  videoUrl?: string
}

export interface Faq {
  q: string
  a: string
}

export const SITE = {
  name: 'KXRDIARY',
  tagline: 'A diary of considered finds.',
  /** Editable Instagram profile. */
  instagramUrl: 'https://www.instagram.com/kxrdiary',
  instagramHandle: '@kxrdiary',
  currency: 'EUR',
}

export const CATEGORIES: Category[] = [
  { id: 'clothing', name: 'Clothing', blurb: 'Tailoring, knitwear, denim and the coat you keep for a decade.' },
  { id: 'shoes', name: 'Shoes', blurb: 'Loafers, boots, trainers and everything between.' },
  { id: 'bags', name: 'Bags', blurb: 'Totes, shoulder bags and small leather goods.' },
  { id: 'accessories', name: 'Accessories', blurb: 'Belts, eyewear, scarves and hats that finish a look.' },
  { id: 'beauty', name: 'Beauty', blurb: 'Skin, scent and the shelf essentials.' },
  { id: 'jewellery', name: 'Jewellery', blurb: 'Silver, gold and pieces worn every day.' },
  { id: 'lifestyle', name: 'Lifestyle', blurb: 'Objects for the home, desk and travel.' },
  { id: 'other', name: 'Other', blurb: 'The finds that refuse a label.' },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CategoryId, Category>

/** 150 empty slots, spread evenly across categories so every filter has a home. */
export const SLOT_COUNT = 150

const LAUNCH = Date.UTC(2026, 10, 1)

export const PRODUCTS: Product[] = Array.from({ length: SLOT_COUNT }, (_, i) => {
  const slot = i + 1
  return {
    id: `slot-${String(slot).padStart(3, '0')}`,
    position: slot,
    slot,
    name: null,
    price: null,
    currency: SITE.currency,
    category: CATEGORIES[i % CATEGORIES.length].id,
    reference: null,
    url: null,
    description: null,
    image: null,
    featured: slot <= 8,
    newArrival: slot <= 16,
    // Newer slots first when sorting by "newest".
    createdAt: new Date(LAUNCH - i * 3_600_000).toISOString(),
  }
})

/** Only verified, real codes belong here. None have been added yet. */
export const COUPONS: Coupon[] = []

export const GUIDES: GuideSection[] = [
  {
    id: 'how-to-order',
    kicker: '01',
    title: 'How to order',
    body: [
      'KXRDIARY is a discovery diary, not a shop. Every find links to the store that sells it, so your order is placed directly with that store.',
    ],
    steps: [
      'Open a find and check the price, category and reference.',
      'Press “View product” — the store opens safely in a new tab.',
      'Choose your size or colour on the store page and add it to your basket.',
      'Apply a code from the Coupons page if one is listed for that store.',
      'Check out on the store’s own website and keep the confirmation email.',
    ],
    image: '/img/guides.png',
  },
  {
    id: 'find-products',
    kicker: '02',
    title: 'How to find products',
    body: [
      'Use the search icon at the top of any page to look up a find by its name, category or reference. Results appear as you type.',
      'On the Finds page, combine a category with a sort order — newest, price ascending, price descending or featured — and clear everything in one tap.',
    ],
  },
  {
    id: 'references',
    kicker: '03',
    title: 'How to use product references',
    body: [
      'Some finds carry a reference — a short code that identifies the exact item, colourway or listing.',
      'Copy the reference from the product page and paste it into the KXRDIARY search, or into the store’s own search, to land on the same piece.',
    ],
  },
  {
    id: 'tracking',
    kicker: '04',
    title: 'How to track an order',
    body: [
      'Because orders are placed with the store, tracking comes from them. Look for the shipping confirmation email, which usually holds a tracking number and a courier link.',
      'If nothing arrives, check your spam folder and the order page in your account on the store’s website.',
    ],
  },
  {
    id: 'shipping',
    kicker: '05',
    title: 'Shipping information',
    body: [
      'Delivery times, costs, duties and returns are set by each store. Read the store’s shipping and returns pages before you buy, especially for orders crossing borders.',
      'Save your receipts and order numbers — you will need them for any return or exchange.',
    ],
  },
]

export const FAQS: Faq[] = [
  { q: 'Does KXRDIARY sell products?', a: 'No. KXRDIARY curates finds and links to the stores that sell them. Payment, delivery and returns are handled by each store.' },
  { q: 'Do I need an account to browse?', a: 'No. The whole catalogue is open to everyone. An account is optional.' },
  { q: 'Why does a link open in a new tab?', a: 'So you never lose your place in the diary. External stores always open in a separate, secure tab.' },
  { q: 'Are the coupon codes verified?', a: 'Only codes that have been checked are published on the Coupons page, together with their expiry date.' },
  { q: 'How do I suggest a find or report a broken link?', a: 'Send a note through the Contact page with the product name or reference.' },
]
