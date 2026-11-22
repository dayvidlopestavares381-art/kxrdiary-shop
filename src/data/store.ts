import { useEffect, useState } from 'react'
import { COUPONS, FAQS, GUIDES, PRODUCTS, type CategoryId, type Coupon, type Product } from './fixtures'

/**
 * Data access for the storefront. Today it reads the fixtures; a later
 * milestone swaps these functions for `fetch('/api/...')` calls without
 * touching any page or component.
 */

export type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'featured'

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

export interface ProductQuery {
  q?: string
  category?: CategoryId | null
  sort?: SortKey
  featuredOnly?: boolean
  newOnly?: boolean
}

const tick = <T,>(value: T) => new Promise<T>((r) => setTimeout(() => r(value), 180))

export async function getProducts(): Promise<Product[]> {
  return tick([...PRODUCTS].sort((a, b) => a.position - b.position))
}

export async function getProduct(id: string): Promise<Product | null> {
  return tick(PRODUCTS.find((p) => p.id === id) ?? null)
}

export async function getCoupons(): Promise<Coupon[]> {
  const now = Date.now()
  return tick(COUPONS.filter((c) => c.verified && (!c.expiresAt || new Date(c.expiresAt).getTime() > now)))
}

export const getGuides = () => GUIDES
export const getFaqs = () => FAQS

export function isFilled(p: Product) {
  return Boolean(p.name)
}

export function displayName(p: Product) {
  return p.name ?? `Slot ${String(p.slot).padStart(3, '0')}`
}

export function formatPrice(p: Product) {
  if (p.price == null) return '—'
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: p.currency }).format(p.price)
}

export function queryProducts(all: Product[], query: ProductQuery): Product[] {
  const q = query.q?.trim().toLowerCase()
  let list = all.filter((p) => {
    if (query.category && p.category !== query.category) return false
    if (query.featuredOnly && !p.featured) return false
    if (query.newOnly && !p.newArrival) return false
    if (q) {
      const hay = [displayName(p), p.category, p.reference ?? '', p.description ?? ''].join(' ').toLowerCase()
      if (!q.split(/\s+/).every((t) => hay.includes(t))) return false
    }
    return true
  })
  const sort = query.sort ?? 'newest'
  list = [...list]
  if (sort === 'newest') list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  // Unpriced slots always sink to the end of price sorts.
  if (sort === 'price-asc') list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
  if (sort === 'price-desc') list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
  if (sort === 'featured') list.sort((a, b) => Number(b.featured) - Number(a.featured) || a.position - b.position)
  return list
}

/** Tiny async hook with loading + error state. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: string | null }>({
    data: null,
    loading: true,
    error: null,
  })
  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true, error: null }))
    fn()
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((e) => alive && setState({ data: null, loading: false, error: e?.message ?? 'Something went wrong' }))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return state
}

export const useProducts = () => useAsync(getProducts)
