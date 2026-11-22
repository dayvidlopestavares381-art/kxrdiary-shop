import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowUpRight, Check, Copy, Hash } from 'lucide-react'
import { useState } from 'react'
import { CATEGORY_MAP } from '../data/fixtures'
import { displayName, formatPrice, getProduct, isFilled, queryProducts, useAsync, useProducts } from '../data/store'
import { ProductImage } from '../components/ProductImage'
import { ProductGrid } from '../components/ProductCard'
import { ShareLinks } from '../components/ShareLinks'
import { Seo } from '../components/Seo'

export default function ProductPage() {
  const { id = '' } = useParams()
  const { data: product, loading } = useAsync(() => getProduct(id), [id])
  const { data: all } = useProducts()
  const [copied, setCopied] = useState(false)

  if (loading) {
    return (
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-10 sm:px-8 md:grid-cols-12 lg:px-12" aria-busy="true">
        <div className="skeleton aspect-[4/5] md:col-span-7" />
        <div className="space-y-4 md:col-span-5 md:pt-10">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-14 w-4/5" />
          <div className="skeleton h-5 w-20" />
          <div className="skeleton mt-10 h-12 w-full" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <Seo title="Find not found" />
        <p className="eyebrow text-ash">Error 404</p>
        <h1 className="display mt-6 text-6xl italic md:text-8xl">This find has moved on.</h1>
        <p className="mt-6 text-sm text-ash">It may have been removed from the diary. The rest of the catalogue is a click away.</p>
        <Link to="/finds" className="btn btn-solid mt-10">
          Back to all finds
        </Link>
      </div>
    )
  }

  const filled = isFilled(product)
  const category = CATEGORY_MAP[product.category]
  const related = all ? queryProducts(all, { category: product.category }).filter((p) => p.id !== product.id).slice(0, 4) : null

  const copyRef = async () => {
    if (!product.reference) return
    await navigator.clipboard.writeText(product.reference).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      <Seo title={displayName(product)} description={product.description ?? `${displayName(product)} — ${category.name} on KXRDIARY.`} />
      <div className="mx-auto max-w-[1600px] px-5 pt-6 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="eyebrow flex items-center gap-2 text-[0.6rem] text-ash">
          <Link to="/finds" className="link-underline inline-flex items-center gap-1.5 hover:text-ink">
            <ArrowLeft className="size-3" /> Finds
          </Link>
          <span>/</span>
          <Link to={`/categories/${category.id}`} className="link-underline hover:text-ink">
            {category.name}
          </Link>
        </nav>
      </div>

      <article className="mx-auto grid max-w-[1600px] gap-10 px-5 pt-6 pb-24 sm:px-8 md:grid-cols-12 md:gap-14 lg:px-12">
        <div className="fade-in md:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-mist">
            <ProductImage product={product} sizes="(min-width: 768px) 58vw, 100vw" eager />
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="rise md:sticky md:top-[calc(var(--header-h)+2rem)]">
            <div className="flex flex-wrap gap-2">
              <span className="eyebrow border border-mist px-2.5 py-1 text-[0.58rem] text-graphite">{category.name}</span>
              {product.featured && <span className="eyebrow bg-ink px-2.5 py-1 text-[0.58rem] text-paper">Featured</span>}
              {product.newArrival && <span className="eyebrow border border-ink px-2.5 py-1 text-[0.58rem]">New arrival</span>}
            </div>

            <h1 className={`display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] ${filled ? '' : 'text-smoke italic'}`}>{displayName(product)}</h1>
            <p className="mt-5 font-mono text-xl text-graphite">{formatPrice(product)}</p>

            <div className="silver-rule my-8" />

            {filled ? (
              <p className="text-[0.9375rem] leading-relaxed text-graphite">{product.description ?? 'No description has been added for this find yet.'}</p>
            ) : (
              <div className="border border-dashed border-silver bg-bone p-5 text-sm leading-relaxed text-ash">
                This catalogue slot is ready for a product. Once a photo, name, price and store link are saved, they appear here automatically.
              </div>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-px border border-mist bg-mist text-sm">
              <div className="bg-paper p-4">
                <dt className="eyebrow text-[0.56rem] text-ash">Category</dt>
                <dd className="mt-1.5">
                  <Link to={`/categories/${category.id}`} className="link-underline">
                    {category.name}
                  </Link>
                </dd>
              </div>
              <div className="bg-paper p-4">
                <dt className="eyebrow text-[0.56rem] text-ash">Reference</dt>
                <dd className="mt-1.5 flex items-center justify-between gap-2 font-mono text-[0.8125rem]">
                  {product.reference ? (
                    <>
                      <span className="truncate">{product.reference}</span>
                      <button onClick={copyRef} className="text-ash hover:text-ink" aria-label="Copy reference">
                        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      </button>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-smoke">
                      <Hash className="size-3" /> None
                    </span>
                  )}
                </dd>
              </div>
            </dl>

            {product.url ? (
              <a href={product.url} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-solid mt-8 h-14 w-full text-[0.72rem]">
                Buy / View product <ArrowUpRight className="size-4" />
              </a>
            ) : (
              <button disabled className="btn btn-solid mt-8 h-14 w-full text-[0.72rem]">
                Store link coming soon
              </button>
            )}
            <p className="mt-3 text-center text-xs text-ash">Opens the store in a new, secure tab. Prices are set by the store.</p>

            <div className="mt-10">
              <p className="eyebrow mb-3 text-ash">Share this find</p>
              <ShareLinks title={`${displayName(product)} on KXRDIARY`} />
            </div>
          </div>
        </div>
      </article>

      {related && related.length > 0 && (
        <section className="mx-auto max-w-[1600px] border-t border-mist px-5 py-20 sm:px-8 lg:px-12">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="display text-[clamp(2rem,4vw,3.5rem)]">
              More in <span className="italic">{category.name.toLowerCase()}</span>
            </h2>
            <Link to={`/categories/${category.id}`} className="eyebrow link-underline">
              View all →
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  )
}
