import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import { getFaqs, getGuides } from '../data/store'
import type { GuideSection } from '../data/fixtures'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { cdn, srcSet } from '../lib/img'

function embedUrl(url: string) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return null
}

export default function Guides() {
  const guides = getGuides()
  const faqs = getFaqs()
  return (
    <>
      <Seo title="Guides" description="How to order, find products, use references, track orders and understand shipping on KXRDIARY." />
      <PageHeader eyebrow="Help & tutorials" title={<>Gui<span className="italic">des</span></>} intro="Short, practical notes on getting from a find to your door — ordering, references, tracking and shipping.">
        <nav aria-label="Guide sections" className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {[...guides, { id: 'faq', title: 'FAQ', kicker: '06' }].map((g) => (
            <a key={g.id} href={`#${g.id}`} className="eyebrow link-underline text-[0.62rem] text-ash hover:text-ink">
              <span className="mr-1.5 font-mono tracking-normal">{g.kicker}</span>
              {g.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {guides.map((g, i) => (
          <GuideBlock key={g.id} guide={g} flip={i % 2 === 1} />
        ))}

        <section id="faq" className="scroll-mt-[calc(var(--header-h)+1rem)] border-t border-mist py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="font-mono text-xs text-ash">06</p>
              <h2 className="display mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">Frequently <span className="italic">asked</span></h2>
              <p className="mt-5 max-w-xs text-sm text-ash">
                Something else? <Link to="/contact" className="underline underline-offset-4 hover:text-ink">Send a message</Link>.
              </p>
            </Reveal>
            <div className="md:col-span-8">
              {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function GuideBlock({ guide, flip }: { guide: GuideSection; flip: boolean }) {
  const video = guide.videoUrl ? embedUrl(guide.videoUrl) : null
  const hasMedia = Boolean(guide.image || guide.videoUrl)
  return (
    <section id={guide.id} className="scroll-mt-[calc(var(--header-h)+1rem)] border-t border-mist py-20 first:border-t-0 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <Reveal className={`${hasMedia ? 'md:col-span-6' : 'md:col-span-8 md:col-start-3'} ${flip && hasMedia ? 'md:order-2' : ''}`}>
          <p className="font-mono text-xs text-ash">{guide.kicker}</p>
          <h2 className="display mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">{guide.title}</h2>
          <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-graphite">
            {guide.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          {guide.steps && (
            <ol className="mt-8 border-t border-mist">
              {guide.steps.map((s, i) => (
                <li key={s} className="flex gap-5 border-b border-mist py-4 text-sm">
                  <span className="font-mono text-ash">{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </li>
              ))}
            </ol>
          )}
        </Reveal>
        {hasMedia && (
          <Reveal className="md:col-span-6" delay={120}>
            {video ? (
              <div className="aspect-video overflow-hidden bg-ink">
                <iframe src={video} title={`${guide.title} — video`} className="h-full w-full" loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />
              </div>
            ) : guide.videoUrl ? (
              <a href={guide.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Watch the video</a>
            ) : null}
            {guide.image && (
              <div className={`aspect-[3/2] overflow-hidden bg-mist ${video ? 'mt-4' : ''}`}>
                <img src={cdn(guide.image, 960)} srcSet={srcSet(guide.image, [480, 960, 1400])} sizes="(min-width: 768px) 46vw, 100vw" alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            )}
          </Reveal>
        )}
      </div>
    </section>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-mist first:border-t">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-6 text-left">
        <span className="text-[1.0625rem]">{q}</span>
        <Plus className={`size-4 shrink-0 transition-transform duration-500 ${open ? 'rotate-45' : ''}`} strokeWidth={1.5} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-lux)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ash">{a}</p>
        </div>
      </div>
    </div>
  )
}
