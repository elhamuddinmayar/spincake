import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { LANGS, useLang } from '../i18n'

/* Intro screen (first visit of the session only) ---------------------- */
function seenIntro() {
  try {
    if (sessionStorage.getItem('spincake-intro')) return true
    sessionStorage.setItem('spincake-intro', '1')
  } catch {
    /* storage unavailable */
  }
  return false
}

export function Loader() {
  const [done, setDone] = useState(seenIntro)
  const [i, setI] = useState(0)
  const greetings = ['Welcome', 'ښه راغلاست', 'خوش آمدید']

  useEffect(() => {
    if (done) return
    const tick = setInterval(() => setI((v) => (v + 1) % greetings.length), 420)
    const end = setTimeout(() => setDone(true), 1300)
    return () => {
      clearInterval(tick)
      clearTimeout(end)
    }
  }, [done, greetings.length])

  return (
    <AnimatePresence>
      {!done && (
        <m.div
          key="loader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] grid place-items-center bg-ink text-cream"
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          <div className="flex flex-col items-center">
            <m.div
              initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14 }}
              className="grid size-28 place-items-center rounded-[2rem] bg-white shadow-[0_20px_60px_-10px_rgba(245,165,0,0.5)]"
            >
              <img src="/img/logo.png" alt="" className="size-24 object-contain" />
            </m.div>
            <m.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="brand mt-6 text-4xl font-semibold tracking-tight">
              Spin Cake
            </m.p>
            <div className="mt-2 h-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <m.p
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-[Vazirmatn,Inter,sans-serif] text-lg text-gold"
                >
                  {greetings[i]}
                </m.p>
              </AnimatePresence>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

/* Curtain shown while switching language ------------------------------ */
export function LangCurtain() {
  const { switching } = useLang()
  return (
    <AnimatePresence>
      {switching && (
        <m.div
          key="curtain"
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[250] grid place-items-center bg-gold"
        >
          <span className="size-10 animate-spin rounded-full border-2 border-ink/20 border-t-ink" />
        </m.div>
      )}
    </AnimatePresence>
  )
}

/* Thin progress bar at the very top ----------------------------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <m.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold-deep via-gold to-sun rtl:origin-right" />
}

/* Custom cursor (mouse / trackpad only) ------------------------------- */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ hover: false, label: '' })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target.closest?.('[data-cursor], a, button')
      setState((s) => {
        const label = el?.dataset?.cursor ?? ''
        const hover = !!el
        return s.hover === hover && s.label === label ? s : { hover, label }
      })
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      document.body.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <m.div style={{ x, y }} className="pointer-events-none fixed top-0 left-0 z-[400] -mt-1 -ml-1 size-2 rounded-full bg-gold" />
      <m.div
        style={{ x: rx, y: ry }}
        animate={{ width: state.label ? 84 : state.hover ? 56 : 34, height: state.label ? 84 : state.hover ? 56 : 34 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`pointer-events-none fixed top-0 left-0 z-[400] grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[11px] font-semibold transition-colors duration-300 ${
          state.label ? 'border-transparent bg-gold text-ink' : state.hover ? 'border-gold bg-gold/15' : 'border-ink/30'
        }`}
      >
        {state.label}
      </m.div>
    </>
  )
}

/* Button that leans toward the pointer -------------------------------- */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef()
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })
  return (
    <m.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </m.div>
  )
}

/* EN | پښتو | دری switcher -------------------------------------------- */
export function LangSwitch({ className = '', dark = false }) {
  const { lang, setLang } = useLang()
  return (
    <div dir="ltr" className={`relative flex rounded-full p-1 ${dark ? 'bg-cream/10' : 'bg-ink/5 ring-1 ring-ink/10'} ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          aria-label={l.name}
          className={`relative z-10 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${l.code !== 'en' ? 'font-[Vazirmatn,sans-serif] text-[13px]' : ''} ${
            lang === l.code ? 'text-ink' : dark ? 'text-cream/70 hover:text-cream' : 'text-ink/70 hover:text-ink'
          }`}
        >
          {lang === l.code && (
            <m.span layoutId={`lang-pill-${dark}`} className={`absolute inset-0 -z-10 rounded-full bg-gold`} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
          )}
          {l.label}
        </button>
      ))}
    </div>
  )
}
