import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { SITE } from '../data/site'
import { useLang } from '../i18n'
import { LangSwitch, Magnetic } from './Extras'

export const tel = `tel:${SITE.phone.replace(/\s/g, '')}`

export function Logo({ className = '', light = false }) {
  const { t, lang } = useLang()
  return (
    <a href="#home" className={`flex items-center gap-2.5 ${className}`}>
      <span className={`grid size-11 place-items-center rounded-2xl ${light ? 'bg-white' : 'bg-white shadow-sm ring-1 ring-ink/5'}`}>
        <img src="/img/logo.png" alt="" width="40" height="40" className="size-9 object-contain" />
      </span>
      <span className="leading-none">
        <span dir="ltr" className="brand block text-xl font-semibold tracking-tight whitespace-nowrap">{SITE.name}</span>
        {lang !== 'en' && <span className={`mt-1 block text-[11px] font-semibold ${light ? 'text-gold' : 'text-gold-deep'}`}>{t.brand}</span>}
      </span>
    </a>
  )
}

export default function Nav() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#menu', label: t.nav.menu },
    { href: '#about', label: t.nav.about },
    { href: '#craft', label: t.nav.craft },
    { href: '#studio', label: t.nav.studio },
    { href: '#visit', label: t.nav.visit },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 sm:px-5 ${
          scrolled ? 'bg-cream/80 shadow-[0_10px_40px_-15px_rgba(31,34,40,0.35)] ring-1 ring-ink/5 backdrop-blur-xl' : ''
        }`}
      >
        <Logo />
        <ul className="hidden items-center gap-7 text-sm font-medium xl:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group relative py-1 text-ink/75 transition hover:text-ink">
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 scale-x-0 rounded-full bg-gold transition-transform duration-300 group-hover:scale-x-100 ltr:origin-left rtl:origin-right" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <LangSwitch className="hidden sm:flex" />
          <div className="hidden lg:block">
            <Magnetic>
              <a href={tel} className="btn-primary !px-5 !py-2.5 whitespace-nowrap">
                <PhoneIcon /> {t.nav.order}
              </a>
            </Magnetic>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full bg-ink text-cream xl:hidden"
            aria-label={t.nav.toggle}
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl bg-cream/95 p-4 shadow-xl ring-1 ring-ink/5 backdrop-blur-xl xl:hidden"
          >
            <LangSwitch className="mb-3 w-fit sm:hidden" />
            <ul className="space-y-1">
              {links.map((l, i) => (
                <m.li key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-display text-lg hover:bg-butter/50">
                    {l.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <a href={tel} className="btn-primary mt-3 w-full">
              <PhoneIcon /> {t.nav.order} · <span dir="ltr">{SITE.phone}</span>
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export function PhoneIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  )
}
