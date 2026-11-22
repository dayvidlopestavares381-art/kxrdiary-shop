import { useState, type FormEvent } from 'react'
import { Check, LoaderCircle } from 'lucide-react'
import { SITE } from '../data/fixtures'
import { PageHeader } from '../components/PageHeader'
import { Seo } from '../components/Seo'
import { InstagramIcon } from '../components/Icons'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

function validate(fd: FormData): Errors {
  const e: Errors = {}
  const name = String(fd.get('name') ?? '').trim()
  const email = String(fd.get('email') ?? '').trim()
  const message = String(fd.get('message') ?? '').trim()
  if (name.length < 2) e.name = 'Please enter your name.'
  else if (name.length > 80) e.name = 'Name is too long.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = 'Please enter a valid email address.'
  if (message.length < 10) e.message = 'Your message needs at least 10 characters.'
  else if (message.length > 3000) e.message = 'Please keep it under 3,000 characters.'
  return e
}

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const errs = validate(fd)
    setErrors(errs)
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    setStatus('sending')
    try {
      // Netlify Forms stores the submission; registered via /__forms.html.
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(fd as unknown as Record<string, string>).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo title="Contact" description="Send KXRDIARY a message — suggest a find, report a broken link or ask a question." />
      <PageHeader eyebrow="Write to us" title={<>Con<span className="italic">tact</span></>} intro="Suggest a find, flag a broken link or ask a question. Messages are stored privately and answered by email." />
      <section className="mx-auto grid max-w-[1600px] gap-14 px-5 pb-28 sm:px-8 md:grid-cols-12 lg:px-12">
        <div className="md:col-span-7">
          {status === 'sent' ? (
            <div className="fade-in border border-mist bg-bone p-10 md:p-14" role="status">
              <span className="grid size-12 place-items-center rounded-full bg-ink text-paper"><Check className="size-5" /></span>
              <h2 className="display mt-8 text-5xl italic">Message received.</h2>
              <p className="mt-4 max-w-md text-sm text-ash">Thank you for writing. A reply will come to the email address you entered.</p>
              <button onClick={() => setStatus('idle')} className="btn btn-ghost mt-8">Send another message</button>
            </div>
          ) : (
            <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} noValidate className="space-y-6">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors.name} autoComplete="name" required />
                <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" required />
              </div>
              <Field label="Subject (optional)" name="subject" />
              <div>
                <label htmlFor="message" className="eyebrow text-[0.6rem] text-graphite">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  maxLength={3000}
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="field mt-2 h-auto resize-y py-3 leading-relaxed"
                  placeholder="Tell us about the find, link or question…"
                />
                {errors.message && <p id="message-error" className="mt-2 text-xs text-[#8a2a2a]">{errors.message}</p>}
              </div>
              {status === 'error' && (
                <p role="alert" className="border border-[#8a2a2a]/30 bg-[#8a2a2a]/5 p-4 text-sm text-[#8a2a2a]">
                  Your message couldn’t be sent. Please check your connection and try again.
                </p>
              )}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-xs text-ash">Your details are only used to reply to you.</p>
                <button type="submit" disabled={status === 'sending'} className="btn btn-solid min-w-44">
                  {status === 'sending' ? <><LoaderCircle className="size-4 animate-spin" /> Sending</> : 'Send message'}
                </button>
              </div>
            </form>
          )}
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <div className="border-t border-ink pt-6">
            <p className="eyebrow text-ash">Good to know</p>
            <ul className="mt-6 space-y-5 text-sm leading-relaxed text-graphite">
              <li>For questions about an order, delivery or a return, contact the store you bought from — they hold your order details.</li>
              <li>Reporting a broken link? Include the product name or reference so it can be fixed quickly.</li>
            </ul>
          </div>
          <div className="mt-12 border-t border-mist pt-6">
            <p className="eyebrow text-ash">Elsewhere</p>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm link-underline">
              <InstagramIcon /> {SITE.instagramHandle}
            </a>
          </div>
        </aside>
      </section>
    </>
  )
}

function Field({ label, name, type = 'text', error, required, autoComplete }: { label: string; name: string; type?: string; error?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-[0.6rem] text-graphite">{label}{required && ' *'}</label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className="field mt-2"
      />
      {error && <p id={`${name}-error`} className="mt-2 text-xs text-[#8a2a2a]">{error}</p>}
    </div>
  )
}
