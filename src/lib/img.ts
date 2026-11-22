/** Route an image through the Netlify Image CDN so pages never ship full-size originals. */
export function cdn(src: string, w: number, opts: { h?: number; q?: number } = {}) {
  const params = new URLSearchParams({ url: src, w: String(w), fm: 'webp', q: String(opts.q ?? 72) })
  if (opts.h) {
    params.set('h', String(opts.h))
    params.set('fit', 'cover')
  }
  return `/.netlify/images?${params.toString()}`
}

export function srcSet(src: string, widths: number[], ratio?: number) {
  return widths.map((w) => `${cdn(src, w, ratio ? { h: Math.round(w * ratio) } : {})} ${w}w`).join(', ')
}
