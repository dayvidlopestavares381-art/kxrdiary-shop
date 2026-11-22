/** React 19 hoists <title> and <meta> into <head>. */
export function Seo({ title, description }: { title: string; description?: string }) {
  const full = title === 'KXRDIARY' ? 'KXRDIARY — Curated fashion finds' : `${title} — KXRDIARY`
  return (
    <>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
    </>
  )
}
