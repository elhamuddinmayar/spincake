import { SITE } from '../data/site'
import { MENU } from '../data/menu'
import { useLang } from '../i18n'
import { LogoView, Stage3D } from '../three/lazy'
import { LangSwitch } from './Extras'
import { PhoneIcon, tel } from './Nav'

// Flat logo shown until (or instead of) the 3D medallion
function LogoBadge() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="grid size-56 place-items-center rounded-full bg-cream shadow-[0_0_0_10px_rgba(245,165,0,0.9),0_30px_80px_-20px_rgba(245,165,0,0.6)]">
        <img src="/img/logo.png" alt="Spin Cake" className="size-40 object-contain" />
      </div>
    </div>
  )
}

export default function Footer() {
  const { t, lang, num } = useLang()
  const links = [
    { label: 'Facebook', href: SITE.facebook },
    { label: 'Instagram', href: SITE.instagram },
    { label: 'Google Maps', href: SITE.mapsUrl },
  ].filter((l) => l.href)
  // no z-index here so the shared 3D canvas can draw the logo on top of the photo
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      {/* storefront photo background */}
      <img src="/img/storefront.webp" alt="" loading="lazy" className="absolute inset-0 size-full object-cover object-[50%_45%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(245,165,0,0.18),transparent_55%)] rtl:bg-[radial-gradient(circle_at_70%_40%,rgba(245,165,0,0.18),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 lg:pt-24">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* 3D logo */}
          <div data-cursor="✦" className="relative h-72 sm:h-80 lg:h-[26rem]">
            <Stage3D fallback={<LogoBadge />}>
              <LogoView className="absolute inset-0" />
            </Stage3D>
          </div>

          <div className="relative z-40 text-center lg:text-start">
            <p className="brand text-5xl font-semibold tracking-tight sm:text-6xl">
              <span dir="ltr" className="inline-block">
                Spin <span className="text-gold">Cake</span>
              </span>
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-gold">{SITE.localName.ps}</p>
            <p className="mt-4 inline-flex rounded-full border border-gold/40 bg-ink/40 px-4 py-1.5 text-sm text-cream/85 backdrop-blur">
              {lang === 'en' ? 'Sweets & Food · Tea | Food | Sweets' : `Sweets & Food · ${t.footer.tagline}`}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href={tel} className="btn bg-gold text-ink hover:bg-sun">
                <PhoneIcon /> <span dir="ltr">{SITE.phone}</span>
              </a>
              <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="btn border border-cream/25 bg-cream/5 text-cream backdrop-blur hover:border-cream/60 hover:bg-cream/10">
                {t.visit.directions}
              </a>
            </div>

            {/* quick links to menu categories */}
            <ul className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
              {MENU.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <a
                    href="#menu"
                    onClick={() => window.dispatchEvent(new CustomEvent('menu:select', { detail: c.id }))}
                    className="block rounded-full bg-cream/10 px-3.5 py-1.5 text-sm text-cream/80 transition hover:bg-gold hover:text-ink"
                  >
                    {c.name[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-40 mt-12 flex flex-col items-center justify-between gap-5 border-t border-cream/15 pt-8 md:flex-row">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-cream/70">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" className="transition hover:text-gold">{l.label}</a>
              </li>
            ))}
          </ul>
          <LangSwitch dark className="w-fit" />
        </div>
        <p className="relative z-40 mt-6 text-center text-sm text-cream/45 md:text-start">
          © {num(new Date().getFullYear())} {t.brand} · {t.visit.city} · {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
