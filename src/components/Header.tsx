import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { LayoutGrid, Search, User } from 'lucide-react'
import { SearchOverlay } from './SearchOverlay'

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/finds', label: 'Finds' },
  { to: '/categories', label: 'Categories' },
  { to: '/new-arrivals', label: 'New Arrivals' },
  { to: '/coupons', label: 'Coupons' },
  { to: '/guides', label: 'Guides' },
  { to: '/contact', label: 'Contact' },
]

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-baseline gap-1 ${className}`} aria-label="KXRDIARY home">
      <span className="display text-[1.55rem] leading-none tracking-[0.06em] md:text-[1.8rem]">KXR</span>
      <span className="display text-[1.55rem] leading-none tracking-[0.06em] italic md:text-[1.8rem]">DIARY</span>
    </Link>
  )
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // "/" opens search from anywhere, like a proper catalogue.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => setSearchOpen(false), [pathname])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-paper/88 backdrop-blur-xl transition-shadow duration-500 ${scrolled ? 'shadow-[0_1px_0_0_var(--color-mist),0_12px_32px_-24px_rgba(0,0,0,0.25)]' : 'shadow-[0_1px_0_0_var(--color-mist)]'}`}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between px-5 sm:px-8 md:h-[68px] lg:px-12">
          <Logo />
          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} className="grid size-10 place-items-center text-ink transition-colors hover:text-ash" aria-label="Search finds">
              <Search className="size-[18px]" strokeWidth={1.5} />
            </button>
            <Link to="/finds" className="grid size-10 place-items-center text-ink transition-colors hover:text-ash" aria-label="Browse all finds" title="All finds">
              <LayoutGrid className="size-[18px]" strokeWidth={1.5} />
            </Link>
            <Link to="/login" className="grid size-10 place-items-center sm:hidden" aria-label="Log in">
              <User className="size-[18px]" strokeWidth={1.5} />
            </Link>
            <Link to="/login" className="btn btn-ghost hidden h-9 border-transparent px-3 hover:border-ink sm:inline-flex">
              Log in
            </Link>
            <Link to="/signup" className="btn btn-solid ml-1 h-9 px-3.5 sm:px-4">
              Sign up
            </Link>
          </div>
        </div>

        <nav aria-label="Primary" className="border-t border-mist/80">
          <ul className="no-scrollbar mx-auto flex h-[44px] max-w-[1600px] items-center gap-6 overflow-x-auto px-5 sm:px-8 md:h-[48px] md:justify-center md:gap-10 lg:px-12">
            {NAV.map((item) => (
              <li key={item.to} className="shrink-0">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `eyebrow link-underline pb-1 text-[0.65rem] transition-colors ${isActive ? 'text-ink' : 'text-ash hover:text-ink'}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
