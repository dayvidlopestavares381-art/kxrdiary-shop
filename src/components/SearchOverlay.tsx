import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowRight, Search, X } from 'lucide-react'
import { CATEGORIES, CATEGORY_MAP } from '../data/fixtures'
import { displayName, formatPrice, queryProducts, useProducts } from '../data/store'
import { ProductImage } from './ProductImage'

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { data, loading } = useProducts()

  useEffect(() => {
    if (!open) return
    setTimeout(() => input.current?.focus(), 40)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const results = useMemo(() => (data && q.trim() ? queryProducts(data, { q }) : []), [data, q])

  if (!open) return null

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    onClose()
    navigate(q.trim() ? `/finds?q=${encodeURIComponent(q.trim())}` : '/finds')
  }

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Search finds">
      <button className="fade-in absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} aria-label="Close search" />
      <div className="rise relative max-h-[88vh] overflow-y-auto bg-paper shadow-2xl" style={{ animationDuration: '0.6s' }}>
        <div className="mx-auto max-w-4xl px-5 pt-6 pb-10 sm:px-8 md:pt-10">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-ash">Search the diary</p>
            <button onClick={onClose} className="grid size-10 place-items-center hover:text-ash" aria-label="Close search">
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>
          <form onSubmit={submit} role="search" className="mt-4 flex items-center gap-3 border-b border-ink pb-3">
            <Search className="size-5 shrink-0 text-ash" strokeWidth={1.5} />
            <label htmlFor="overlay-search" className="sr-only">
              Search by name, category or reference
            </label>
            <input
              ref={input}
              id="overlay-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Name, category or reference…"
              className="display w-full bg-transparent text-[clamp(1.75rem,5vw,3rem)] placeholder:text-smoke focus:outline-none"
              autoComplete="off"
            />
            <button type="submit" className="btn btn-solid h-10 shrink-0 px-4" aria-label="See all results">
              <ArrowRight className="size-4" />
            </button>
          </form>

          {!q.trim() ? (
            <div className="mt-8">
              <p className="eyebrow text-ash">Browse a category</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Link key={c.id} to={`/categories/${c.id}`} onClick={onClose} className="eyebrow rounded-full border border-mist px-4 py-2 text-[0.62rem] transition-colors hover:border-ink">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : loading ? (
            <p className="eyebrow mt-8 text-ash">Searching…</p>
          ) : results.length === 0 ? (
            <p className="mt-8 text-sm text-ash">No finds match “{q}”. Try a category name such as “shoes” or a reference.</p>
          ) : (
            <div className="mt-8">
              <p className="eyebrow text-ash">
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
              <ul className="mt-4 divide-y divide-mist">
                {results.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <Link to={`/product/${p.id}`} onClick={onClose} className="group flex items-center gap-4 py-3">
                      <div className="relative h-16 w-13 shrink-0 overflow-hidden bg-mist">
                        <ProductImage product={p} sizes="52px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="eyebrow text-[0.55rem] text-ash">{CATEGORY_MAP[p.category].name}</p>
                        <p className="truncate text-sm group-hover:underline">{displayName(p)}</p>
                      </div>
                      <span className="font-mono text-xs text-graphite">{formatPrice(p)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length > 6 && (
                <button onClick={submit} className="btn btn-ghost mt-6 w-full">
                  See all {results.length} results
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
