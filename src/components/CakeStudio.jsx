import { useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { LogoFallback, Stage3D, StudioView } from '../three/lazy'
import { SITE } from '../data/site'
import { useLang } from '../i18n'
import Reveal from './Reveal'
import { SectionHead } from './Title'
import { PhoneIcon, tel } from './Nav'

const FROSTINGS = ['#fffaf3', '#ffd66b', '#f7b6c8', '#c8e0b0', '#7a4a2e', '#bfe3ef']
const DRIPS = ['#e0901f', '#4a2418', '#fbf3e6', '#c0264f', null]
const TOPPINGS = ['cherries', 'macarons', 'berries', 'candles']

function Group({ label, children }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink/50 uppercase">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({ active, onClick, children, swatch }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 active:scale-95 ${
        active ? 'border-ink bg-ink text-cream shadow-lg' : 'border-ink/15 bg-white/70 text-ink hover:border-ink/40'
      }`}
    >
      {swatch !== undefined && (
        <span className="size-4 rounded-full ring-1 ring-black/10" style={{ background: swatch ?? 'repeating-linear-gradient(45deg,#fff 0 3px,#ddd 3px 6px)' }} />
      )}
      {children}
    </button>
  )
}

export default function CakeStudio() {
  const { t, num } = useLang()
  const s = t.studio
  const [config, setConfig] = useState({ tiers: 2, frosting: 0, drip: 0, topping: 0 })
  const rotation = useRef({ target: 0, auto: 1 })
  const drag = useRef(null)
  const set = (k) => (v) => setConfig((c) => ({ ...c, [k]: v }))

  const summary = [s.tier(num(config.tiers)), s.frostings[config.frosting], s.drips[config.drip], s.toppings[config.topping]].join(' · ')
  const sceneConfig = { tiers: config.tiers, frosting: FROSTINGS[config.frosting], drip: DRIPS[config.drip], topping: TOPPINGS[config.topping] }

  const onDown = (e) => {
    drag.current = e.clientX
    rotation.current.auto = 0
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e) => {
    if (drag.current === null) return
    rotation.current.target += (e.clientX - drag.current) * 0.01
    drag.current = e.clientX
  }
  const onUp = () => {
    drag.current = null
    rotation.current.auto = 1
  }

  return (
    <section id="studio" className="relative overflow-hidden bg-cream-deep py-28 lg:py-36">
      <div className="pointer-events-none absolute -top-32 left-1/4 size-[36rem] rounded-full bg-butter/60 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead eyebrow={s.eyebrow} title={s.title} center />
        <Reveal delay={0.1} className="mx-auto mt-5 max-w-2xl text-center text-ink-soft">{s.sub}</Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              data-cursor="⟷"
              className="relative h-[440px] cursor-grab touch-pan-y rounded-[2.5rem] bg-gradient-to-b from-white/90 to-white/30 ring-1 ring-white active:cursor-grabbing sm:h-[540px]"
            >
              <Stage3D fallback={<LogoFallback />}>
                <StudioView className="absolute inset-0" config={sceneConfig} rotation={rotation} />
              </Stage3D>
              <span className="pointer-events-none absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/85 px-4 py-1.5 text-xs font-medium whitespace-nowrap text-ink/70 backdrop-blur">
                <span dir="ltr">⟵</span> {s.drag} <span dir="ltr">⟶</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="space-y-8 rounded-[2.5rem] bg-white/60 p-6 ring-1 ring-white backdrop-blur sm:p-8">
            <Group label={s.labels.tiers}>
              {[1, 2, 3].map((n) => (
                <Chip key={n} active={config.tiers === n} onClick={() => set('tiers')(n)}>
                  {s.tier(num(n))}
                </Chip>
              ))}
            </Group>
            <Group label={s.labels.frosting}>
              {FROSTINGS.map((c, i) => (
                <Chip key={c} active={config.frosting === i} onClick={() => set('frosting')(i)} swatch={c}>
                  {s.frostings[i]}
                </Chip>
              ))}
            </Group>
            <Group label={s.labels.drip}>
              {DRIPS.map((c, i) => (
                <Chip key={i} active={config.drip === i} onClick={() => set('drip')(i)} swatch={c}>
                  {s.drips[i]}
                </Chip>
              ))}
            </Group>
            <Group label={s.labels.topping}>
              {TOPPINGS.map((v, i) => (
                <Chip key={v} active={config.topping === i} onClick={() => set('topping')(i)}>
                  {s.toppings[i]}
                </Chip>
              ))}
            </Group>

            <div className="border-t border-ink/10 pt-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-ink/50 uppercase">{s.yourCake}</p>
              <div className="mt-2 min-h-[3.5rem]">
                <AnimatePresence mode="wait">
                  <m.p key={summary} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="font-display text-xl">
                    {summary}
                  </m.p>
                </AnimatePresence>
              </div>
              <a href={tel} className="btn-primary mt-4 w-full">
                <PhoneIcon /> {s.orderCall} · <span dir="ltr">{SITE.phone}</span>
              </a>
              {SITE.whatsapp && (
                <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(s.waMessage(summary))}`} target="_blank" rel="noreferrer" className="btn-ghost mt-3 w-full">
                  {s.orderWa}
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
