import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router'
import { PackageSearch, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import { CATEGORIES, CATEGORY_MAP, type CategoryId } from '../data/fixtures'
import { SORT_OPTIONS, queryProducts, useProducts, type SortKey } from '../data/store'
import { ProductGrid } from './ProductCard'

const PAGE_SIZE = 24

interface Props {
  /** Locks the catalogue to a single category (category pages). */
  fixedCategory?: CategoryId
  /** Only products marked as new arrivals. */
  newOnly?: boolean
}

export function Catalogue({ fixedCategory, newOnly }: Props) {
  const [params, setParams] = useSearchParams()
  const { data, loading, error } = useProducts()

  const q = params.get('q') ?? ''
  const urlCategory = params.get('category') as CategoryId | null
  const category = fixedCategory ?? (urlCategory && CATEGORY_MAP[urlCategory] ? urlCategory : null)
  const sort = (params.get('sort') as SortKey) || 'newest'
  const featuredOnly = params.get('featured') === '1'

  const [draft, setDraft] = useState(q)
  // Follow external URL changes (back button, header search) without clobbering what's being typed.
  useEffect(() => setDraft((d) => (d.trim() === q ? d : q)), [q])

  const [visible, setVisible] = useState(PAGE_SIZE)
  useEffect(() => setVisible(PAGE_SIZE), [q, category, sort, featuredOnly])

  const results = useMemo(
    () => (data ? queryProducts(data, { q, category, sort, featuredOnly, newOnly }) : null),
    [data, q, category, sort, featuredOnly, newOnly],
  )

  const update = (patch: Record<string, string | null>) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        for (const [k, v] of Object.entries(patch)) {
          if (v == null || v === '') next.delete(k)
          else next.set(k, v)
        }
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }

  // Live search, lightly debounced so the URL isn't rewritten on every keystroke.
  useEffect(() => {
    if (draft.trim() === q) return
    const t = setTimeout(() => update({ q: draft.trim() || null }), 220)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft])

  const hasFilters = Boolean(q || (!fixedCategory && category) || sort !== 'newest' || featuredOnly)
  const clearAll = () => {
    setDraft('')
    setParams(new URLSearchParams(), { replace: true, preventScrollReset: true })
  }

  const shown = results?.slice(0, visible) ?? null

  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8 lg:px-12" aria-label="Catalogue">
      {/* Controls */}
      <div className="sticky top-[var(--header-h)] z-30 -mx-5 border-b border-mist bg-paper/92 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <form
            role="search"
            className="relative flex-1 lg:max-w-md"
            onSubmit={(e) => {
              e.preventDefault()
              update({ q: draft.trim() || null })
            }}
          >
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ash" strokeWidth={1.5} />
            <label htmlFor="catalogue-search" className="sr-only">
              Search by name, category or reference
            </label>
            <input
              id="catalogue-search"
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search name, category or reference"
              className="field h-11 pr-10 pl-11"
              autoComplete="off"
            />
            {draft && (
              <button type="button" onClick={() => setDraft('')} className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-ash hover:text-ink" aria-label="Clear search">
                <X className="size-4" />
              </button>
            )}
          </form>

          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            <label className="relative">
              <span className="sr-only">Sort</span>
              <SlidersHorizontal className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-ash" />
              <select
                value={sort}
                onChange={(e) => update({ sort: e.target.value === 'newest' ? null : e.target.value })}
                className="field h-11 w-auto appearance-none pr-8 pl-9 text-[0.8125rem]"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              aria-pressed={featuredOnly}
              onClick={() => update({ featured: featuredOnly ? null : '1' })}
              className={`btn h-11 px-4 ${featuredOnly ? 'btn-solid' : 'btn-ghost border-mist'}`}
            >
              Featured only
            </button>
            <button type="button" onClick={clearAll} disabled={!hasFilters} className="btn btn-ghost h-11 border-mist px-4">
              <RotateCcw className="size-3.5" /> Clear filters
            </button>
          </div>
        </div>

        {!fixedCategory && (
          <div className="no-scrollbar -mx-5 mt-3 flex gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
            <Chip active={!category} onClick={() => update({ category: null })}>
              All
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c.id} active={category === c.id} onClick={() => update({ category: category === c.id ? null : c.id })}>
                {c.name}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {/* Result meta */}
      <div className="flex items-baseline justify-between py-6" aria-live="polite">
        <p className="eyebrow text-ash">
          {loading ? 'Loading finds…' : results ? `${results.length} ${results.length === 1 ? 'find' : 'finds'}` : ''}
          {q && !loading && <span className="text-ink"> for “{q}”</span>}
        </p>
        {fixedCategory && (
          <Link to="/categories" className="eyebrow link-underline text-ash hover:text-ink">
            All categories
          </Link>
        )}
      </div>

      {error ? (
        <div role="alert" className="border border-mist bg-bone p-10 text-center">
          <p className="display text-3xl">The catalogue didn’t load.</p>
          <p className="mt-3 text-sm text-ash">{error}</p>
          <button className="btn btn-solid mt-6" onClick={() => location.reload()}>
            Try again
          </button>
        </div>
      ) : results && results.length === 0 ? (
        <div className="flex flex-col items-center border border-mist bg-bone px-6 py-20 text-center">
          <PackageSearch className="size-7 text-smoke" strokeWidth={1} />
          <p className="display mt-6 text-[clamp(2rem,4vw,3rem)] italic">Nothing matches — yet.</p>
          <p className="mt-3 max-w-sm text-sm text-ash">Try a different word, another category, or clear your filters to see the whole diary.</p>
          {hasFilters && (
            <button className="btn btn-solid mt-8" onClick={clearAll}>
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <ProductGrid products={shown} loading={loading} skeletonCount={12} />
      )}

      {results && results.length > visible && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="eyebrow text-ash">
            Showing {visible} of {results.length}
          </p>
          <div className="h-px w-40 bg-mist">
            <div className="h-px bg-ink transition-all duration-700" style={{ width: `${(visible / results.length) * 100}%` }} />
          </div>
          <button className="btn btn-ghost mt-2" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more finds
          </button>
        </div>
      )}
    </section>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`eyebrow h-8 shrink-0 rounded-full border px-3.5 text-[0.6rem] transition-colors duration-300 ${
        active ? 'border-ink bg-ink text-paper' : 'border-mist bg-transparent text-graphite hover:border-ink'
      }`}
    >
      {children}
    </button>
  )
}
