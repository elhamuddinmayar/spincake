import { useRef, useState } from 'react'
import { m, useMotionValueEvent, useScroll } from 'framer-motion'
import { CraftView, LogoFallback, Stage3D } from '../three/lazy'
import { useLang } from '../i18n'
import { Title } from './Title'

export default function Craft() {
  const { t, num } = useLang()
  const section = useRef()
  const progress = useRef(0)
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progress.current = v
    setStep(Math.min(3, Math.floor(v * 4.4)))
  })

  return (
    <section id="craft" ref={section} className="relative h-[320vh] bg-gradient-to-b from-cream via-cream-deep to-cream">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-butter/50 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-2 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="relative z-40 order-2 lg:order-1">
            <p className="eyebrow"><span className="h-px w-8 bg-gold" /> {t.craft.eyebrow}</p>
            <Title parts={t.craft.title} className="section-title mt-4" />

            <ol className="mt-8 space-y-2 lg:mt-12">
              {t.craft.steps.map((s, i) => {
                const active = i === step
                return (
                  <li key={i} className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${active ? 'bg-white/80 shadow-[0_20px_50px_-30px_rgba(31,34,40,0.4)]' : i < step ? 'opacity-60' : 'opacity-35'} ${!active ? 'hidden lg:block' : ''}`}>
                    <div className="flex items-start gap-5 p-4 lg:p-5">
                      <span className={`font-display text-3xl font-semibold transition-colors duration-500 ${active ? 'text-gold-deep' : 'text-ink/40'}`}>{num(i + 1, 2)}</span>
                      <div>
                        <h3 className="font-display text-xl font-medium lg:text-2xl">{s.title}</h3>
                        <m.p initial={false} animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }} className="overflow-hidden text-ink-soft">
                          <span className="block pt-1">{s.text}</span>
                        </m.p>
                      </div>
                    </div>
                    {active && <m.span layoutId="craft-bar" className="absolute inset-y-3 w-1 rounded-full bg-gold ltr:left-0 rtl:right-0" />}
                  </li>
                )
              })}
            </ol>

            <div className="mt-6 flex gap-2 lg:hidden">
              {t.craft.steps.map((_, i) => (
                <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-gold' : 'bg-ink/10'}`} />
              ))}
            </div>
          </div>

          <div className="relative order-1 h-[46svh] lg:order-2 lg:h-[80svh]">
            <Stage3D fallback={<LogoFallback />}>
              <CraftView className="absolute inset-0" progress={progress} />
            </Stage3D>
          </div>
        </div>
      </div>
    </section>
  )
}
