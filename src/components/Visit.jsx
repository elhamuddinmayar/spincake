import { SITE } from '../data/site'
import { useLang } from '../i18n'
import { Magnetic } from './Extras'
import { PhoneIcon, tel } from './Nav'
import Reveal from './Reveal'
import { SectionHead } from './Title'

const Label = ({ children }) => <dt className="text-xs font-semibold tracking-[0.2em] text-ink/50 uppercase">{children}</dt>

export default function Visit() {
  const { t, lang } = useLang()
  const v = t.visit
  const { lat, lng } = SITE.coords
  return (
    <section id="visit" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:py-36">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col">
          <SectionHead eyebrow={v.eyebrow} title={v.title} />

          <Reveal delay={0.1}>
            <dl className="mt-10 space-y-6">
              <div>
                <Label>{v.address}</Label>
                <dd className="mt-1 font-display text-xl">
                  {t.brand}
                  {lang === 'en' ? ', ' : '، '}
                  {SITE.address || v.city}
                </dd>
              </div>
              <div>
                <Label>{v.phone}</Label>
                <dd className="mt-1 font-display text-2xl">
                  <a href={tel} dir="ltr" className="transition hover:text-gold-deep">{SITE.phone}</a>
                </dd>
              </div>
              {SITE.hours.length > 0 && (
                <div>
                  <Label>{v.hours}</Label>
                  {SITE.hours.map((h) => (
                    <dd key={h.en} className="mt-1 flex justify-between gap-6 border-b border-dashed border-ink/15 py-2 text-ink-soft">
                      <span>{h[lang]}</span>
                      <span dir="ltr" className="font-medium text-ink">{h.time}</span>
                    </dd>
                  ))}
                </div>
              )}
              <div>
                <Label>{v.follow}</Label>
                <dd className="mt-2 flex flex-wrap gap-2">
                  <a href={SITE.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1877f2] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110">
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M14 8V6c0-.9.6-1 1-1h2V2h-3c-3 0-4 2.2-4 4v2H8v3h2v11h4V11h2.6l.4-3z" /></svg>
                    Facebook
                  </a>
                  {SITE.instagram && (
                    <a href={SITE.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">Instagram</a>
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  {v.directions}
                  <svg viewBox="0 0 24 24" className="size-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M8 7h9v9" /></svg>
                </a>
              </Magnetic>
              <a href={tel} className="btn-ghost">
                <PhoneIcon /> {v.call}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] bg-cream-deep shadow-[0_40px_80px_-40px_rgba(31,34,40,0.5)] ring-1 ring-ink/10 lg:h-full lg:min-h-[520px]">
            <iframe
              key={lang}
              title={`${SITE.name} — Google Maps`}
              src={`https://www.google.com/maps?q=${lat},${lng}&z=16&hl=${lang}&output=embed`}
              className="absolute inset-0 size-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute top-5 flex items-center gap-3 rounded-2xl bg-white/95 p-2.5 pe-5 shadow-lg ltr:left-5 rtl:right-5">
              <img src="/img/logo.png" alt="" className="size-10 object-contain" />
              <div>
                <p className="brand text-lg leading-tight font-semibold">{SITE.name}</p>
                <p className="text-xs text-ink-soft">{v.city}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
