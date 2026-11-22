import { Catalogue } from '../components/Catalogue'
import { PageHeader } from '../components/PageHeader'
import { Seo } from '../components/Seo'

export default function Finds() {
  return (
    <>
      <Seo title="All finds" description="Search and filter every KXRDIARY find by name, category or reference. Sort by newest, price or featured." />
      <PageHeader
        eyebrow="The catalogue"
        title={
          <>
            All <span className="italic">finds</span>
          </>
        }
        intro="Every piece in the diary in one place. Search by name, category or reference, narrow it down by category and sort by price, newest or featured."
      />
      <Catalogue />
    </>
  )
}
