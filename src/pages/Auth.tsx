import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Eye, EyeOff, Info } from 'lucide-react'
import { Seo } from '../components/Seo'
import { cdn } from '../lib/img'

type Mode = 'login' | 'signup'

/**
 * Visitor account screens. Validation is live; connecting the forms to
 * Netlify Identity is the accounts milestone in PLAN.md. Browsing never
 * requires an account.
 */
export function AuthPage({ mode }: { mode: Mode }) {
  const isSignup = mode === 'signup'
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState(false)
  const [show, setShow] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const errs: Record<string, string> = {}
    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')
    if (isSignup && String(fd.get('name') ?? '').trim().length < 2) errs.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = 'Please enter a valid email address.'
    if (password.length < (isSignup ? 8 : 1)) errs.password = isSignup ? 'Use at least 8 characters.' : 'Please enter your password.'
    setErrors(errs)
    setNotice(Object.keys(errs).length === 0)
  }

  return (
    <>
      <Seo title={isSignup ? 'Sign up' : 'Log in'} description={isSignup ? 'Create a free KXRDIARY account.' : 'Log in to your KXRDIARY account.'} />
      <section className="mx-auto grid max-w-[1600px] md:min-h-[calc(100vh-var(--header-h))] md:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-ink md:block">
          <img src={cdn('/img/hero.png', 1000)} alt="" className="hero-img absolute inset-0 h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-12 text-paper">
            <p className="display text-6xl leading-[0.9] lg:text-7xl">
              {isSignup ? <>Keep your<br /><span className="silver-text italic">diary.</span></> : <>Welcome<br /><span className="silver-text italic">back.</span></>}
            </p>
            <p className="mt-5 max-w-sm text-sm text-mist">An account is optional — every find, category and coupon stays open to all visitors.</p>
          </div>
        </div>

        <div className="flex items-center px-5 py-14 sm:px-8 md:px-14 lg:px-24">
          <div className="rise w-full max-w-md">
            <div className="flex gap-6 border-b border-mist" role="tablist" aria-label="Account">
              <Link to="/login" role="tab" aria-selected={!isSignup} className={`eyebrow -mb-px border-b pb-3 ${!isSignup ? 'border-ink text-ink' : 'border-transparent text-ash hover:text-ink'}`}>Log in</Link>
              <Link to="/signup" role="tab" aria-selected={isSignup} className={`eyebrow -mb-px border-b pb-3 ${isSignup ? 'border-ink text-ink' : 'border-transparent text-ash hover:text-ink'}`}>Sign up</Link>
            </div>
            <h1 className="display mt-10 text-5xl">{isSignup ? 'Create an account' : 'Log in'}</h1>
            <p className="mt-3 text-sm text-ash">{isSignup ? 'Free, and never needed to browse.' : 'Use the email you signed up with.'}</p>

            <form onSubmit={onSubmit} noValidate className="mt-10 space-y-5">
              {isSignup && <AuthField label="Name" name="name" autoComplete="name" error={errors.name} />}
              <AuthField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="password" className="eyebrow text-[0.6rem] text-graphite">Password</label>
                  {isSignup && <span className="text-[0.7rem] text-ash">8+ characters</span>}
                </div>
                <div className="relative mt-2">
                  <input id="password" name="password" type={show ? 'text' : 'password'} autoComplete={isSignup ? 'new-password' : 'current-password'} aria-invalid={errors.password ? 'true' : undefined} className="field pr-12" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-ash hover:text-ink" aria-label={show ? 'Hide password' : 'Show password'}>
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-xs text-[#8a2a2a]">{errors.password}</p>}
              </div>

              {notice && (
                <div role="status" className="fade-in flex gap-3 border border-mist bg-bone p-4 text-sm text-graphite">
                  <Info className="mt-0.5 size-4 shrink-0" />
                  <p>
                    Member accounts open very soon. In the meantime every find is open to browse — <Link to="/finds" className="underline underline-offset-4">explore the catalogue</Link>.
                  </p>
                </div>
              )}

              <button type="submit" className="btn btn-solid h-13 w-full">{isSignup ? 'Create account' : 'Log in'}</button>
            </form>

            <p className="mt-8 text-center text-sm text-ash">
              {isSignup ? 'Already have an account? ' : 'New to KXRDIARY? '}
              <Link to={isSignup ? '/login' : '/signup'} className="text-ink underline underline-offset-4">{isSignup ? 'Log in' : 'Create one'}</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function AuthField({ label, name, type = 'text', autoComplete, error }: { label: string; name: string; type?: string; autoComplete?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-[0.6rem] text-graphite">{label}</label>
      <input id={name} name={name} type={type} autoComplete={autoComplete} aria-invalid={error ? 'true' : undefined} className="field mt-2" />
      {error && <p className="mt-2 text-xs text-[#8a2a2a]">{error}</p>}
    </div>
  )
}

export const Login = () => <AuthPage mode="login" />
export const Signup = () => <AuthPage mode="signup" />
