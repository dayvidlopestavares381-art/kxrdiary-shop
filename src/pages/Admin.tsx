
import { useState } from 'react'
import { Package, Plus, Search, Store } from 'lucide-react'

export default function Admin() {
  const [search, setSearch] = useState('')

  return (
    <main className="mx-auto min-h-screen max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12">
      <p className="eyebrow text-ash">KXR DIARY / MANAGEMENT</p>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-5xl">Admin<span className="italic">.</span></h1>
          <p className="mt-3 text-sm text-ash">
            Manage your catalogue.
          </p>
        </div>
        <a href="/" className="text-sm underline underline-offset-4">
          View shop
        </a>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="border border-mist p-6">
          <Package className="size-5" />
          <p className="mt-5 text-3xl">150</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-ash">
            Catalogue slots
          </p>
        </div>

        <div className="border border-mist p-6">
          <Store className="size-5" />
          <p className="mt-5 text-3xl">KXR</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-ash">
            Your storefront
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
        <h2 className="display text-3xl">Your products</h2>
        <button
          type="button"
          className="btn btn-solid flex items-center gap-2 px-5 py-3"
          onClick={() => alert('Product editing will be connected in the next step.')}
        >
          <Plus className="size-4" />
          Add product
        </button>
      </div>

      <div className="relative mt-6 max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ash" />
        <input
          className="field pl-10"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <p className="mt-8 border-t border-mist py-6 text-sm text-ash">
        Your product editor and secure saving system will be connected next.
      </p>
    </main>
  )
}
