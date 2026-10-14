import { SITE } from '../data/site'
import { useLang } from '../i18n'
import { LangSwitch } from './Extras'
import { Logo, tel } from './Nav'

export default function Footer() {
  const { t, num } = useLang()
  const links = [
    { label: SITE.phone, href: tel, ltr: true },
    { label: 'Facebook', href: SITE.facebook, ext: true },
    { label: 'Instagram', href: SITE.instagram, ext: true },
    { label: 'Google Maps', href: SITE.mapsUrl, ext: true },
  ].filter((l) => l.href)

  return (
    <footer className="relative z-40 overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <p dir="ltr" className="brand text-[17vw] leading-none font-semibold tracking-tighter text-cream/[0.07] lg:text-[11rem]">
            Spin Cake
          </p>
          <p className="font-display text-3xl font-semibold text-gold/30 md:mb-6">{SITE.localName.ps}</p>
        </div>
        <div className="mt-10 grid gap-8 border-t border-cream/10 pt-10 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div>
            <Logo light className="text-cream" />
            <p className="mt-3 text-sm text-cream/50">{t.footer.tagline}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70 md:justify-center">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} dir={l.ltr ? 'ltr' : undefined} target={l.ext ? '_blank' : undefined} rel="noreferrer" className="transition hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <LangSwitch dark className="w-fit" />
        </div>
        <p className="mt-8 text-sm text-cream/45">
          © {num(new Date().getFullYear())} {t.brand} · {t.visit.city} · {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
