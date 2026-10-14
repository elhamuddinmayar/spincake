import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { useLang } from '../i18n'
import { CatIcon } from './Menu'
import Reveal from './Reveal'

const PILLARS = [
  { icon: 'cup', cat: 'tea' },
  { icon: 'pizza', cat: 'pizza' },
  { icon: 'cake', cat: 'desserts' },
]

// Highlights the brand name at the start of each slogan line
function SloganLine({ text, brand }) {
  if (!text.startsWith(brand)) return text
  return (
    <>
      <span className="text-gold">{brand}</span>
      {text.slice(brand.length)}
    </>
  )
}

export default function About() {
  const { t, lang } = useLang()
  const a = t.about
  const brand = lang === 'en' ? 'Spin Cake' : t.brand
  const photo = useRef()
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" className="relative z-40 overflow-hidden bg-ink py-28 text-cream lg:py-36">
      <div className="pointer-events-none absolute -top-40 size-[40rem] rounded-full bg-gold/15 blur-3xl ltr:-right-40 rtl:-left-40" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow !text-gold"><span className="h-px w-8 bg-gold" /> {a.eyebrow}</p>
            <h2 className="mt-5 font-display text-4xl leading-tight font-medium text-balance sm:text-5xl">
              <SloganLine text={a.lead} brand={brand} />
            </h2>
          </Reveal>

          <ul className="mt-10 space-y-4 border-gold/30 ltr:border-l-2 ltr:pl-6 rtl:border-r-2 rtl:pr-6">
            {a.lines.map((line, i) => (
              <Reveal as="li" key={i} delay={i * 0.12} y={20} className="text-lg leading-relaxed text-cream/75 sm:text-xl">
                <SloganLine text={line} brand={brand} />
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5}>
            <p className="mt-10 font-display text-3xl font-medium text-gold italic sm:text-4xl">{a.close}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div ref={photo} className="relative h-[460px] overflow-hidden rounded-[2.5rem] ring-1 ring-white/10 lg:h-full lg:min-h-[560px]">
            <m.img
              style={{ y, scale: 1.18 }}
              src="/img/storefront.webp"
              alt={a.photoAlt}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 flex items-center gap-3 rounded-2xl bg-white p-3 pe-5 text-ink shadow-2xl ltr:left-6 rtl:right-6">
            <img src="/img/logo.png" alt="" className="size-12 object-contain" />
            <div className="leading-tight">
              <p dir="ltr" className="brand text-lg font-semibold">Spin Cake</p>
              <p className="text-xs text-ink-soft">{t.footer.tagline}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-24 grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-3">
        {a.pillars.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <a
              href="#menu"
              onClick={() => window.dispatchEvent(new CustomEvent('menu:select', { detail: PILLARS[i].cat }))}
              className="group flex h-full items-start gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-white/[0.08]"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gold text-ink transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                <CatIcon name={PILLARS[i].icon} className="size-7" />
              </span>
              <span>
                <span className="block font-display text-2xl">{p.title}</span>
                <span className="mt-1 block text-cream/60">{p.text}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
