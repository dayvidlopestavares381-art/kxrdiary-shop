import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES, SITE } from '../data/fixtures'
import { InstagramIcon } from './Icons'
import { NAV } from './Header'

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 pb-10 sm:px-8 lg:px-12">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.85]">
              KXR<span className="silver-text italic">DIARY</span>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-smoke">
              {SITE.tagline} Clothing, shoes, bags and objects worth knowing about — each one linked straight to the store that sells it.
            </p>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-8">
              <InstagramIcon /> Follow {SITE.instagramHandle}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <p className="eyebrow text-smoke">Explore</p>
              <ul className="mt-5 space-y-3 text-sm">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="link-underline text-mist hover:text-paper">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-smoke">Categories</p>
              <ul className="mt-5 space-y-3 text-sm">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link to={`/categories/${c.id}`} className="link-underline text-mist hover:text-paper">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-smoke">Account</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link to="/login" className="link-underline text-mist hover:text-paper">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="link-underline text-mist hover:text-paper">
                    Sign up
                  </Link>
                </li>
                <li>
                  <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 text-mist hover:text-paper">
                    Instagram <ArrowUpRight className="size-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="silver-rule mt-20 opacity-40" />
        <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-ash sm:flex-row">
          <p>© {new Date().getFullYear()} KXRDIARY. All rights reserved.</p>
          <p>KXRDIARY links to independent stores. Prices and availability are set by each store.</p>
        </div>
      </div>
    </footer>
  )
}
