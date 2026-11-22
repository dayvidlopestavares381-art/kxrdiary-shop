import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '../data/fixtures'
import { CATEGORY_MAP } from '../data/fixtures'
import { displayName, formatPrice, isFilled } from '../data/store'
import { ProductImage } from './ProductImage'

export const GRID_SIZES = '(min-width: 1536px) 18vw, (min-width: 1024px) 24vw, (min-width: 480px) 32vw, 48vw'

export function ProductCard({ product, sizes = GRID_SIZES, eager }: { product: Product; sizes?: string; eager?: boolean }) {
  const filled = isFilled(product)
  const href = `/product/${product.id}`
  return (
    <article className="group flex flex-col">
      <Link to={href} className="relative block aspect-[4/5] overflow-hidden bg-mist" aria-label={`View ${displayName(product)}`}>
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-lux)] group-hover:scale-[1.04]">
          <ProductImage product={product} sizes={sizes} eager={eager} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-2.5 sm:p-3">
          {product.featured ? (
            <span className="eyebrow bg-ink px-2 py-1 text-[0.55rem] text-paper">Featured</span>
          ) : (
            <span />
          )}
          {product.newArrival && <span className="eyebrow bg-paper/90 px-2 py-1 text-[0.55rem] text-ink backdrop-blur">New</span>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-3 sm:pt-4">
        <p className="eyebrow text-[0.58rem] text-ash">{CATEGORY_MAP[product.category].name}</p>
        <h3 className={`mt-1.5 line-clamp-2 text-[0.875rem] leading-snug sm:text-[0.9375rem] ${filled ? 'text-ink' : 'text-smoke'}`}>
          <Link to={href} className="link-underline">
            {filled ? displayName(product) : `${displayName(product)} — awaiting product`}
          </Link>
        </h3>
        <p className="mt-1 font-mono text-[0.8125rem] text-graphite">{formatPrice(product)}</p>

        <div className="mt-3 flex gap-1.5">
          <Link to={href} className="btn btn-ghost h-9 flex-1 px-2 text-[0.58rem] tracking-[0.18em]">
            View
          </Link>
          {product.url ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn btn-solid h-9 w-9 shrink-0 px-0"
              aria-label={`Open ${displayName(product)} in store (new tab)`}
              title="Open in store"
            >
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : (
            <button type="button" disabled className="btn btn-solid h-9 w-9 shrink-0 px-0" aria-label="Store link not added yet" title="Store link not added yet">
              <ArrowUpRight className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="skeleton aspect-[4/5]" />
      <div className="skeleton mt-4 h-2 w-16" />
      <div className="skeleton mt-2.5 h-3 w-4/5" />
      <div className="skeleton mt-2 h-3 w-12" />
      <div className="skeleton mt-3 h-9 w-full" />
    </div>
  )
}

/** 2 cols small phones → 3 large phones → 4 desktop → 5 wide screens. */
export const GRID_CLASS = 'grid grid-cols-2 gap-x-3 gap-y-9 min-[480px]:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-5'

export function ProductGrid({ products, loading, skeletonCount = 8 }: { products: Product[] | null; loading?: boolean; skeletonCount?: number }) {
  if (loading || !products) {
    return (
      <div className={GRID_CLASS} aria-busy="true" aria-label="Loading finds">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }
  return (
    <div className={GRID_CLASS}>
      {products.map((p, i) => (
        <div key={p.id} className="fade-in" style={{ animationDelay: `${Math.min(i % 24, 12) * 35}ms` }}>
          <ProductCard product={p} eager={i < 4} />
        </div>
      ))}
    </div>
  )
}
