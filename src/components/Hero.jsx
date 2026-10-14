import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { HeroView, LogoFallback, Stage3D } from '../three/lazy'
import { MENU, MENU_STATS } from '../data/menu'
import { useLang } from '../i18n'
import { Magnetic } from './Extras'

const rise = (delay) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: delay + 0.9, ease: [0.22, 1, 0.36, 1] }, // starts as the intro lifts
})

const SPECIAL = MENU.find((c) => c.id === 'juices').items.find((i) => i.special)

function RotatingWord({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    setI(0)
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2600)
    return () => clearInterval(id)
  }, [words])
  return (
    <span className="relative block overflow-hidden pb-[0.12em]">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={words[i]}
          initial={{ y: '100%', opacity: 0, rotate: 3 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: '-100%', opacity: 0, rotate: -3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="block bg-gradient-to-r from-gold-deep via-gold to-[#e8790a] bg-clip-text pb-1 text-transparent italic rtl:bg-gradient-to-l"
        >
          {words[i]}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const { t, lang, num } = useLang()
  const ui = t.menuUi
  const stats = [
    [num(MENU_STATS.items) + '+', t.hero.stats.items],
    [num(MENU_STATS.categories), t.hero.stats.categories],
    [num(MENU_STATS.minPrice), t.hero.stats.from],
  ]

  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden pt-28">
      {/* ambient colour blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 size-[42rem] rounded-full bg-butter/70 blur-3xl ltr:right-[-10%] rtl:left-[-10%]" />
        <div className="absolute bottom-[-20%] size-[34rem] rounded-full bg-[#ffe7c2] blur-3xl ltr:left-[-10%] rtl:right-[-10%]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-4 px-4 sm:px-6 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-40 order-2 pb-16 lg:order-1 lg:pb-0">
          <m.p {...rise(0.1)} className="eyebrow">
            <span className="h-px w-8 bg-gold" /> {t.hero.eyebrow}
          </m.p>
          <m.h1 {...rise(0.2)} className="mt-6 font-display text-[2.9rem] leading-[1] font-medium tracking-tight sm:text-6xl lg:text-[4.5rem]">
            {t.hero.line1}
            <RotatingWord words={t.hero.words} />
            {t.hero.line3}
          </m.h1>
          <m.p {...rise(0.35)} className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
            {t.hero.sub}
          </m.p>
          <m.div {...rise(0.5)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <a href="#menu" className="btn-primary">
                {t.hero.cta}
                <svg viewBox="0 0 24 24" className="size-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#studio" className="btn-ghost">{t.hero.cta2}</a>
            </Magnetic>
          </m.div>
          <m.dl {...rise(0.65)} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            {stats.map(([a, b]) => (
              <div key={b}>
                <dt className="font-display text-3xl font-semibold">{a}</dt>
                <dd className="mt-1 text-xs text-ink-soft">{b}</dd>
              </div>
            ))}
          </m.dl>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          data-cursor="✦"
          className="relative order-1 -mx-4 h-[52svh] min-h-[360px] sm:-mx-6 lg:order-2 lg:h-[82svh] ltr:lg:mr-[min(-1.5rem,calc((72rem-100vw)/2))] ltr:lg:ml-0 rtl:lg:ml-[min(-1.5rem,calc((72rem-100vw)/2))] rtl:lg:mr-0"
        >
          <div className="absolute inset-[12%] rounded-full bg-gradient-to-b from-white/80 to-butter/40 blur-2xl" />
          <Stage3D fallback={<LogoFallback />}>
            <HeroView className="absolute inset-0" />
          </Stage3D>

          {/* real menu teaser */}
          <m.a
            href="#menu"
            {...rise(0.9)}
            className="absolute bottom-6 z-40 flex items-center gap-3 rounded-2xl bg-white/85 py-2.5 ps-2.5 pe-4 shadow-[0_20px_40px_-20px_rgba(31,34,40,0.4)] ring-1 ring-ink/5 backdrop-blur ltr:left-6 rtl:right-6 lg:bottom-16"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-gold text-lg">★</span>
            <span className="leading-tight">
              <span className="block text-[11px] font-semibold text-gold-deep">{ui.special}</span>
              <span className="block text-sm font-semibold">{SPECIAL[lang]}</span>
              <span className="block text-xs text-ink-soft">
                {ui.sizes.m} {num(SPECIAL.prices[0].value)} · {ui.sizes.l} {num(SPECIAL.prices[1].value)} {ui.currency}
              </span>
            </span>
          </m.a>
        </m.div>
      </div>

      <a href="#menu" className="absolute bottom-6 left-1/2 z-40 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-ink/60 uppercase lg:flex">
        {t.hero.scroll}
        <span className="relative h-10 w-px overflow-hidden bg-ink/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrolldot_1.8s_ease-in-out_infinite] bg-gold" />
        </span>
      </a>
      <style>{`@keyframes scrolldot{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  )
}
