import { Catalogue } from '../components/Catalogue'
import { PageHeader } from '../components/PageHeader'
import { Seo } from '../components/Seo'

export default function NewArrivals() {
  return (
    <>
      <Seo title="New arrivals" description="The newest finds added to KXRDIARY." />
      <PageHeader
        eyebrow="Fresh in"
        title={
          <>
            New <span className="italic">arrivals</span>
          </>
        }
        intro="The latest additions to the diary, newest first. Filter by category or search within the new edit."
      />
      <Catalogue newOnly />
    </>
  )
}
