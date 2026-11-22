import { Link } from 'react-router'
import { Seo } from '../components/Seo'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center md:py-44">
      <Seo title="Page not found" />
      <p className="eyebrow text-ash">Error 404</p>
      <h1 className="display mt-6 text-[clamp(3.5rem,10vw,8rem)] italic">Not in the diary.</h1>
      <p className="mt-6 text-sm text-ash">The page you were looking for doesn’t exist.</p>
      <div className="mt-10 flex justify-center gap-3">
        <Link to="/" className="btn btn-solid">Home</Link>
        <Link to="/finds" className="btn btn-ghost">All finds</Link>
      </div>
    </div>
  )
}
