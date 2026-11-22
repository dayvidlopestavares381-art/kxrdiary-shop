import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import type { Product } from '../data/fixtures'
import { CATEGORY_MAP } from '../data/fixtures'
import { cdn, srcSet } from '../lib/img'

/** Product photo via the Image CDN, with an editorial placeholder for empty slots. */
export function ProductImage({ product, sizes, eager = false, className = '' }: { product: Product; sizes: string; eager?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (!product.image || failed) {
    return (
      <div className={`slot-surface flex h-full w-full flex-col items-center justify-center gap-3 text-ash ${className}`}>
        {failed ? (
          <>
            <ImageOff className="size-5" strokeWidth={1.25} />
            <span className="eyebrow text-[0.6rem]">Image unavailable</span>
          </>
        ) : (
          <>
            <span className="display text-[clamp(2.25rem,6vw,4rem)] text-silver italic">{String(product.slot).padStart(3, '0')}</span>
            <span className="eyebrow text-[0.58rem] text-smoke">{CATEGORY_MAP[product.category].name}</span>
          </>
        )}
      </div>
    )
  }
  return (
    <>
      {!loaded && <div className="skeleton absolute inset-0" />}
      <img
        src={cdn(product.image, 640, { h: 800 })}
        srcSet={srcSet(product.image, [320, 480, 640, 960, 1280], 1.25)}
        sizes={sizes}
        alt={product.name ?? 'Product photo'}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </>
  )
}
