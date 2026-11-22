import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'
import { FacebookIcon, PinterestIcon, WhatsAppIcon, XIcon } from './Icons'

export function ShareLinks({ title, url, image, className = '' }: { title: string; url?: string; image?: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const href = url ?? (typeof window !== 'undefined' ? window.location.href : '')
  const u = encodeURIComponent(href)
  const t = encodeURIComponent(title)
  const links = [
    { label: 'WhatsApp', icon: WhatsAppIcon, href: `https://wa.me/?text=${t}%20${u}` },
    { label: 'Pinterest', icon: PinterestIcon, href: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}${image ? `&media=${encodeURIComponent(image)}` : ''}` },
    { label: 'X', icon: XIcon, href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { label: 'Facebook', icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ]
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt('Copy this link', href)
    }
  }
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map(({ label, icon: Icon, href: h }) => (
        <a key={label} href={h} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label} (new tab)`} title={`Share on ${label}`} className="grid size-10 place-items-center rounded-full border border-mist text-graphite transition-colors hover:border-ink hover:bg-ink hover:text-paper">
          <Icon className="size-4" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" className="inline-flex h-10 items-center gap-2 rounded-full border border-mist px-4 text-graphite transition-colors hover:border-ink">
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
        <span className="eyebrow text-[0.58rem]">{copied ? 'Copied' : 'Copy link'}</span>
      </button>
    </div>
  )
}
