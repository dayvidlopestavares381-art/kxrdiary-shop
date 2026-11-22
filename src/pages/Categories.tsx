import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES } from '../data/fixtures'
import { useProducts } from '../data/store'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'

export default function Categories() {
  const { data } = useProducts()
  return (
    <>
      <Seo title="Categories" description="Browse KXRDIARY by category: clothing, shoes, bags, accessories, beauty, jewellery, lifestyle and more." />
      <PageHeader eyebrow="Index" title={<>Categ<span className="italic">ories</span></>} intro="Eight rooms in the diary. Pick one to see only its finds — every filter and search still works inside." />
      <section className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8 lg:px-12">
        <div className="grid gap-px bg-mist sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const count = data?.filter((p) => p.category === c.id).length
            const dark = i % 3 === 0
            return (
              <Reveal key={c.id} delay={(i % 4) * 70}>
                <Link
                  to={`/categories/${c.id}`}
                  className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-6 transition-colors duration-700 md:p-8 ${dark ? 'bg-ink text-paper' : 'bg-paper hover:bg-bone'}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-mono text-xs ${dark ? 'text-smoke' : 'text-ash'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} />
                  </div>
                  <span
                    aria-hidden="true"
                    className={`display pointer-events-none absolute -right-4 -bottom-8 text-[11rem] leading-none italic opacity-[0.07] transition-transform duration-1000 ease-[var(--ease-lux)] group-hover:-translate-y-4`}
                  >
                    {c.name[0]}
                  </span>
                  <div className="relative">
                    <h2 className="display text-[clamp(2.5rem,4vw,3.5rem)] transition-all duration-500 group-hover:italic">{c.name}</h2>
                    <p className={`mt-3 max-w-[16rem] text-sm leading-relaxed ${dark ? 'text-smoke' : 'text-ash'}`}>{c.blurb}</p>
                    <p className="eyebrow mt-6 text-[0.6rem]">{count == null ? '…' : `${count} ${count === 1 ? 'entry' : 'entries'}`}</p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
