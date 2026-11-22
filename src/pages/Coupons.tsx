import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Ticket } from 'lucide-react'
import { Link } from 'react-router'
import type { Coupon } from '../data/fixtures'
import { SITE } from '../data/fixtures'
import { getCoupons, useAsync } from '../data/store'
import { PageHeader } from '../components/PageHeader'
import { Seo } from '../components/Seo'
import { InstagramIcon } from '../components/Icons'

export default function Coupons() {
  const { data, loading, error } = useAsync(getCoupons)
  return (
    <>
      <Seo title="Coupons" description="Verified discount codes for the stores featured on KXRDIARY, each with its expiry date." />
      <PageHeader eyebrow="Verified codes" title={<>Cou<span className="italic">pons</span></>} intro="Only checked, currently valid codes are listed here — each with its discount, expiry date and the store it works on. Expired codes disappear automatically." />
      <section className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8 lg:px-12">
        {error ? (
          <p role="alert" className="border border-mist bg-bone p-8 text-sm">Coupons couldn’t be loaded. Please refresh the page.</p>
        ) : loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy="true">
            {Array.from({ length: 3 }, (_, i) => <div key={i} className="skeleton h-64" />)}
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.map((c) => <CouponCard key={c.id} coupon={c} />)}
          </div>
        ) : (
          <div className="grid overflow-hidden border border-mist md:grid-cols-12">
            <div className="flex flex-col justify-center bg-bone p-10 md:col-span-7 md:p-16">
              <Ticket className="size-7 text-smoke" strokeWidth={1} />
              <h2 className="display mt-6 text-[clamp(2.25rem,4.5vw,4rem)] italic">No verified codes right now.</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ash">
                Codes are only published once they’ve been tested on the store. New ones are announced on Instagram first — check back soon.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  <InstagramIcon /> Get notified on Instagram
                </a>
                <Link to="/finds" className="btn btn-ghost">Browse finds</Link>
              </div>
            </div>
            <div className="relative hidden bg-ink p-10 text-paper md:col-span-5 md:flex md:flex-col md:justify-between">
              <p className="eyebrow text-smoke">How coupons work</p>
              <ol className="mt-8 space-y-6 text-sm text-mist">
                {['Copy the code with one tap.', 'Open the store — it launches in a new tab.', 'Paste the code at the store’s checkout.'].map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="font-mono text-smoke">{String(i + 1).padStart(2, '0')}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <div aria-hidden="true" className="mt-10 border border-dashed border-graphite p-5">
                <p className="eyebrow text-[0.55rem] text-smoke">Code</p>
                <p className="mt-2 font-mono text-2xl tracking-[0.3em] text-graphite">— — — —</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code)
    } catch {
      window.prompt('Copy this code', coupon.code)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  const expires = coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No expiry date'
  return (
    <article className="flex flex-col justify-between border border-mist bg-bone p-7">
      <div>
        <div className="flex items-center justify-between">
          <p className="eyebrow text-ash">{coupon.name}</p>
          <span className="eyebrow flex items-center gap-1 text-[0.55rem] text-graphite"><Check className="size-3" /> Verified</span>
        </div>
        <p className="display mt-5 text-4xl">{coupon.discount}</p>
        <p className="mt-2 text-xs text-ash">Expires {expires}</p>
      </div>
      <div className="mt-8 flex items-stretch border border-dashed border-ink">
        <span className="flex-1 px-4 py-3 font-mono text-lg tracking-[0.18em]">{coupon.code}</span>
        <button onClick={copy} className="btn btn-solid h-auto border-0 px-4" aria-label={`Copy code ${coupon.code}`}>
          {copied ? <><Check className="size-3.5" /> Copied</> : <><Copy className="size-3.5" /> Copy</>}
        </button>
      </div>
      <a href={coupon.url} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-ghost mt-3 w-full">
        Go to store <ArrowUpRight className="size-3.5" />
      </a>
    </article>
  )
}
