import { Link, useParams } from 'react-router'
import { CATEGORIES, CATEGORY_MAP, type CategoryId } from '../data/fixtures'
import { Catalogue } from '../components/Catalogue'
import { PageHeader } from '../components/PageHeader'
import { Seo } from '../components/Seo'
import NotFound from './NotFound'

export default function CategoryPage() {
  const { id } = useParams()
  const category = id ? CATEGORY_MAP[id as CategoryId] : undefined
  if (!category) return <NotFound />
  return (
    <>
      <Seo title={category.name} description={`${category.name} finds on KXRDIARY — ${category.blurb}`} />
      <PageHeader eyebrow="Category" title={<span className="italic">{category.name}</span>} intro={category.blurb}>
        <div className="no-scrollbar -mx-5 mt-10 flex gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Switch category">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/categories/${c.id}`}
              aria-current={c.id === category.id ? 'page' : undefined}
              className={`eyebrow flex h-8 shrink-0 items-center rounded-full border px-3.5 text-[0.6rem] transition-colors ${c.id === category.id ? 'border-ink bg-ink text-paper' : 'border-mist text-graphite hover:border-ink'}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </PageHeader>
      <Catalogue key={category.id} fixedCategory={category.id} />
    </>
  )
}
