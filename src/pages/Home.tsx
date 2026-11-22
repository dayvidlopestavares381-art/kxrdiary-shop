import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CATEGORIES, SITE } from '../data/fixtures'
import { queryProducts, useProducts } from '../data/store'
import { ProductCard, ProductGrid } from '../components/ProductCard'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { InstagramIcon } from '../components/Icons'
import { ShareLinks } from '../components/ShareLinks'
import { cdn, srcSet } from '../lib/img'

export default function Home() {
  const { data, loading } = useProducts()
  const featured = data ? queryProducts(data, { featuredOnly: true, sort: 'featured' }).slice(0, 10) : null
  const latest = data ? queryProducts(data, { sort: 'newest' }).slice(0, 8) : null
  const arrivals = data ? queryProducts(data, { newOnly: true, sort: 'newest' }).slice(0, 5) : null
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c.id, data?.filter((p) => p.category === c.id).length ?? 0]))

  return (
    <>
      <Seo title="KXRDIARY" description="A curated diary of fashion finds — clothing, shoes, bags, accessories, beauty, jewellery and lifestyle, each linked straight to its store." />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 pt-8 pb-16 sm:px-8 md:grid-cols-12 md:pt-14 md:pb-24 lg:px-12">
          <div className="relative z-10 flex flex-col justify-between md:col-span-7 md:pr-6">
            <div>
              <p className="eyebrow rise flex items-center gap-3 text-ash">
                <span className="inline-block h-px w-10 bg-ink" /> Edition N°01 · Fashion finds
              </p>
              <h1 className="display rise mt-8 text-[clamp(4.25rem,15.5vw,15rem)] leading-[0.8] md:-mr-[14%]" style={{ animationDelay: '100ms' }}>
                KXR
                <br />
                <span className="silver-text italic">DIARY</span>
              </h1>
            </div>
            <div className="rise mt-10 grid gap-8 sm:grid-cols-2 md:mt-16" style={{ animationDelay: '260ms' }}>
              <p className="max-w-sm text-[1.0625rem] leading-relaxed text-graphite">
                Welcome to the diary. A considered edit of clothing, shoes, bags and small luxuries — found, noted, and linked straight to the store that sells them.
              </p>
              <div className="flex flex-wrap items-start gap-3 sm:justify-end">
                <Link to="/finds" className="btn btn-solid">
                  Explore the finds <ArrowRight className="size-3.5" />
                </Link>
                <Link to="/new-arrivals" className="btn btn-ghost">
                  New arrivals
                </Link>
              </div>
            </div>
          </div>

          <figure className="relative md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-mist">
              <img
                src={cdn('/img/hero.png', 900)}
                srcSet={srcSet('/img/hero.png', [480, 720, 900, 1200])}
                sizes="(min-width: 768px) 40vw, 100vw"
                alt="Model in an oversized charcoal coat walking past a concrete wall"
                className="hero-img h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <figcaption className="mt-3 flex justify-between text-[0.7rem] text-ash">
              <span className="eyebrow text-[0.58rem]">The edit</span>
              <span className="font-mono">Concrete, wool, black leather.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-ink bg-ink py-4 text-paper" aria-hidden="true">
        <div className="marquee flex w-max gap-12 whitespace-nowrap">
          {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((c, i) => (
            <span key={i} className="display flex items-center gap-12 text-2xl italic md:text-3xl">
              {c.name}
              <span className="text-xs not-italic text-smoke">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:pt-32 lg:px-12">
        <SectionHead index="01" eyebrow="Featured" title="Pieces of note" link={{ to: '/finds?featured=1', label: 'All featured' }} />
        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:gap-6 lg:px-12">
          {featured
            ? featured.map((p) => (
                <div key={p.id} className={SCROLLER_ITEM}>
                  <ProductCard product={p} sizes="(min-width: 1024px) 23vw, 64vw" />
                </div>
              ))
            : Array.from({ length: 5 }, (_, i) => (
                <div key={i} className={SCROLLER_ITEM}>
                  <div className="skeleton aspect-[4/5]" />
                </div>
              ))}
        </div>
      </section>

      {/* LATEST */}
      <section className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:pt-32 lg:px-12">
        <SectionHead index="02" eyebrow="Latest finds" title="Just noted" link={{ to: '/finds', label: 'Full catalogue' }} />
        <div className="mt-10">
          <ProductGrid products={latest} loading={loading} skeletonCount={8} />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mt-24 bg-bone md:mt-32">
        <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <SectionHead index="03" eyebrow="Popular categories" title="Browse by category" link={{ to: '/categories', label: 'All categories' }} />
          <ul className="mt-12 border-t border-ink">
            {CATEGORIES.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 40}>
                <Link to={`/categories/${c.id}`} className="group grid grid-cols-12 items-center gap-4 border-b border-mist py-5 transition-colors duration-500 hover:bg-ink hover:text-paper md:py-7">
                  <span className="col-span-2 pl-2 font-mono text-xs text-ash transition-colors group-hover:text-smoke md:col-span-1 md:pl-4">{String(i + 1).padStart(2, '0')}</span>
                  <span className="display col-span-8 text-[clamp(2rem,6vw,4.5rem)] transition-transform duration-700 ease-[var(--ease-lux)] group-hover:translate-x-3 group-hover:italic md:col-span-6">{c.name}</span>
                  <span className="col-span-4 hidden text-sm text-ash transition-colors group-hover:text-smoke md:block">{c.blurb}</span>
                  <span className="col-span-2 flex items-center justify-end gap-3 pr-2 md:col-span-1 md:pr-4">
                    <span className="hidden font-mono text-xs text-ash lg:inline">{counts[c.id]}</span>
                    <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:pt-32 lg:px-12">
        <SectionHead index="04" eyebrow="New arrivals" title="Fresh in the diary" link={{ to: '/new-arrivals', label: 'See all new' }} />
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-4 lg:grid-cols-5 lg:gap-x-6">
          {arrivals
            ? arrivals.map((p, i) => (
                <div key={p.id} className={i === 0 ? 'col-span-2 lg:row-span-2' : ''}>
                  <ProductCard product={p} sizes={i === 0 ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 20vw, 50vw'} />
                </div>
              ))
            : Array.from({ length: 5 }, (_, i) => <div key={i} className={`skeleton aspect-[4/5] ${i === 0 ? 'col-span-2' : ''}`} />)}
        </div>
      </section>

      {/* PROMO */}
      <section className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:pt-32 lg:px-12">
        <Reveal className="relative grid overflow-hidden bg-ink text-paper md:grid-cols-12">
          <div className="relative aspect-[16/10] md:col-span-7 md:aspect-auto md:min-h-[520px]">
            <img
              src={cdn('/img/promo.png', 1200)}
              srcSet={srcSet('/img/promo.png', [640, 960, 1400])}
              sizes="(min-width: 768px) 58vw, 100vw"
              alt="Black leather bag, silver chain, grey knit and loafers on a stone plinth"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
          </div>
          <div className="flex flex-col justify-between gap-10 p-8 md:col-span-5 md:p-12 lg:p-16">
            <p className="eyebrow text-smoke">Coupons · Verified only</p>
            <div>
              <h2 className="display text-[clamp(2.75rem,5.5vw,5rem)]">
                Codes worth <span className="silver-text italic">keeping.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-smoke">
                Every discount code on KXRDIARY is checked before it is published, with its expiry date shown up front. Copy it in one tap and head to the store.
              </p>
            </div>
            <Link to="/coupons" className="btn btn-light self-start">
              View coupons <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* CATALOGUE CTA */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 text-center sm:px-8 md:py-36 lg:px-12">
        <Reveal>
          <p className="eyebrow text-ash">The complete catalogue</p>
          <Link to="/finds" className="group mt-6 inline-block">
            <span className="display block text-[clamp(3rem,11vw,10rem)] leading-[0.85] transition-[font-style] group-hover:italic">Every find,</span>
            <span className="display silver-text block text-[clamp(3rem,11vw,10rem)] leading-[0.85] italic">one place.</span>
          </Link>
          <p className="mx-auto mt-8 max-w-md text-sm text-ash">
            {data ? `${data.length} catalogue entries` : 'The full catalogue'} — searchable by name, category and reference, sortable by price, newest and featured.
          </p>
          <Link to="/finds" className="btn btn-solid mt-8">
            Open the catalogue <ArrowRight className="size-3.5" />
          </Link>
        </Reveal>
      </section>

      {/* INSTAGRAM */}
      <section className="border-t border-mist bg-paper">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-12 md:items-center md:py-28 lg:px-12">
          <Reveal className="md:col-span-7">
            <p className="eyebrow flex items-center gap-2 text-ash">
              <InstagramIcon className="size-3.5" /> On Instagram
            </p>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="group mt-5 block">
              <span className="display block text-[clamp(2.75rem,8vw,7rem)] leading-[0.9] break-all transition-all duration-700 group-hover:italic">{SITE.instagramHandle}</span>
            </a>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-graphite">New finds land on Instagram first — outfit notes, restocks and the occasional code. Follow along and never miss a drop.</p>
          </Reveal>
          <Reveal className="flex flex-col gap-6 md:col-span-5 md:items-end" delay={120}>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              <InstagramIcon /> Follow on Instagram
            </a>
            <div className="md:text-right">
              <p className="eyebrow mb-3 text-ash">Share KXRDIARY</p>
              <ShareLinks title="KXRDIARY — curated fashion finds" className="md:justify-end" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const SCROLLER_ITEM = 'w-[64vw] shrink-0 snap-start min-[480px]:w-[42vw] md:w-[30vw] lg:w-[23vw] 2xl:w-[18vw]'

function SectionHead({ index, eyebrow, title, link }: { index: string; eyebrow: string; title: string; link?: { to: string; label: string } }) {
  return (
    <Reveal className="flex items-end justify-between gap-6 border-b border-mist pb-6">
      <div>
        <p className="eyebrow flex items-center gap-3 text-ash">
          <span className="font-mono tracking-normal">{index}</span>
          <span className="inline-block h-px w-6 bg-smoke" />
          {eyebrow}
        </p>
        <h2 className="display mt-4 text-[clamp(2.5rem,6vw,5rem)]">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="eyebrow link-underline shrink-0 pb-2 text-ink">
          {link.label} →
        </Link>
      )}
    </Reveal>
  )
}
