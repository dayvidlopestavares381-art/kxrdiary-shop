import type { ReactNode } from 'react'

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mx-auto max-w-[1600px] px-5 pt-12 pb-10 sm:px-8 md:pt-20 md:pb-14 lg:px-12">
      <p className="eyebrow rise text-ash">{eyebrow}</p>
      <div className="mt-5 grid gap-8 md:grid-cols-12 md:items-end">
        <h1 className="display rise text-[clamp(3rem,9vw,8.5rem)] md:col-span-8" style={{ animationDelay: '80ms' }}>
          {title}
        </h1>
        {intro && (
          <div className="rise max-w-md text-[0.9375rem] leading-relaxed text-graphite md:col-span-4 md:pb-3" style={{ animationDelay: '160ms' }}>
            {intro}
          </div>
        )}
      </div>
      {children}
      <div className="silver-rule mt-10 md:mt-14" />
    </header>
  )
}
