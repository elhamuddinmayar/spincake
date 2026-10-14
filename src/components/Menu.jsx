import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { MENU, MENU_PAGES } from '../data/menu'
import { useLang } from '../i18n'
import Reveal from './Reveal'
import { SectionHead } from './Title'

// Simple line icons per category
const ICONS = {
  cake: 'M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7M5 16c2 1.5 4 1.5 7 0s5-1.5 7 0M12 12V8M12 5.5a1.5 1.5 0 1 0 0-.01',
  juice: 'M7 8h10l-1.2 12.2A2 2 0 0 1 13.8 22h-3.6a2 2 0 0 1-2-1.8zM6.5 8h11M13 8l2-6 3 1',
  icecream: 'M8 11l4 11 4-11M7 11a5 5 0 1 1 10 0z',
  cup: 'M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3',
  pizza: 'M12 3L3 19c6 3 12 3 18 0zM9 12h.01M14 15h.01M11 17h.01',
  burger: 'M4 11a8 8 0 0 1 16 0zM3 14h18M4 17h16a2 2 0 0 1-2 3H6a2 2 0 0 1-2-3z',
  pot: 'M3 11h18M5 11v5a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5v-5M8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4',
  noodles: 'M3 12h18a9 9 0 0 1-18 0zM7 12c0-4 1-7 2-9M11 12c0-4 2-7 4-9M15 12c0-3 1-5 3-6',
  salad: 'M3 12h18a9 9 0 0 1-18 0zM9 12c-1-3 0-6 3-7 0 3-1 5-3 7zM14 12c0-3 2-5 5-5-1 3-2 4-5 5z',
  soup: 'M3 11h18a9 9 0 0 1-18 0zM8 7c0-1.5 1-2 1-3.5M12 7c0-1.5 1-2 1-3.5M16 7c0-1.5 1-2 1-3.5',
}

export function CatIcon({ name, className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[name]} />
    </svg>
  )
}

function PriceChips({ prices }) {
  const { t, num } = useLang()
  const ui = t.menuUi
  const label = (l) => (l == null ? null : l.startsWith('pcs:') ? ui.sizes.pcs(num(+l.slice(4))) : ui.sizes[l])
  return (
    <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
      {prices.map((p, i) => (
        <span key={i} className="inline-flex items-baseline gap-1 rounded-full bg-cream-deep px-2.5 py-1 text-xs ring-1 ring-gold/20">
          {label(p.label) && <span className="text-ink-soft">{label(p.label)}</span>}
          <b className="text-sm text-ink">{num(p.value)}</b>
        </span>
      ))}
    </div>
  )
}

function ItemRow({ item, showCat }) {
  const { t, lang } = useLang()
  // show the other script underneath so every visitor recognises the dish
  const secondary = lang === 'en' ? item.ps : item.en
  return (
    <li className="flex items-center gap-4 border-b border-dashed border-ink/10 py-3.5">
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-2 font-semibold text-ink">
          {item[lang]}
          {item.special && <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-ink">★ {t.menuUi.special}</span>}
          {showCat && <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink-soft">{showCat}</span>}
        </p>
        <p className="mt-0.5 truncate text-sm text-ink-soft" dir={lang === 'en' ? 'rtl' : 'ltr'} style={{ textAlign: lang === 'en' ? 'left' : 'right' }}>
          {secondary}
        </p>
      </div>
      <PriceChips prices={item.prices} />
    </li>
  )
}

function Lightbox({ page, onClose, onNav }) {
  const { t, num } = useLang()
  useEffect(() => {
    if (page == null) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start()
    }
  }, [page, onClose, onNav])

  return (
    <AnimatePresence>
      {page != null && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[260] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <m.img
            key={page}
            src={`/img/menu-${page}.webp`}
            alt={t.menuUi.page(num(page))}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-auto rounded-2xl shadow-2xl"
          />
          <div dir="ltr" className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onNav(-1)} className="grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25" aria-label="Previous">‹</button>
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm text-white">{t.menuUi.page(num(page))}</span>
            <button onClick={() => onNav(1)} className="grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25" aria-label="Next">›</button>
          </div>
          <button onClick={onClose} className="absolute top-5 grid size-11 place-items-center rounded-full bg-white/15 text-xl text-white hover:bg-white/25 ltr:right-5 rtl:left-5" aria-label={t.menuUi.close}>
            ✕
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default function Menu() {
  const { t, lang, num } = useLang()
  const ui = t.menuUi
  const [active, setActive] = useState(MENU[0].id)
  const [q, setQ] = useState('')
  const [page, setPage] = useState(null)
  const cat = MENU.find((c) => c.id === active)

  // other sections can open a category: window.dispatchEvent(new CustomEvent('menu:select', { detail: 'tea' }))
  useEffect(() => {
    const onSelect = (e) => {
      setQ('')
      setActive(e.detail)
    }
    window.addEventListener('menu:select', onSelect)
    return () => window.removeEventListener('menu:select', onSelect)
  }, [])

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return null
    return MENU.flatMap((c) => c.items.filter((i) => [i.en, i.ps, i.fa].some((n) => n.toLowerCase().includes(query))).map((i) => ({ item: i, cat: c })))
  }, [q])

  const navPage = (d) => setPage((p) => ((p - 1 + d + MENU_PAGES.length) % MENU_PAGES.length) + 1)

  return (
    <section id="menu" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:py-36">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHead eyebrow={ui.eyebrow} title={ui.title} className="max-w-xl" />
        <Reveal delay={0.15} className="max-w-sm text-ink-soft">{ui.desc}</Reveal>
      </div>

      {/* search */}
      <Reveal>
        <label className="relative block">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 size-5 -translate-y-1/2 text-ink/40 ltr:left-5 rtl:right-5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ui.search}
            className="w-full rounded-full border border-ink/10 bg-white/80 py-4 text-base shadow-[0_10px_30px_-20px_rgba(31,34,40,0.4)] outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20 ltr:pr-12 ltr:pl-13 rtl:pr-13 rtl:pl-12"
          />
          {q && (
            <button onClick={() => setQ('')} className="absolute top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10 ltr:right-3 rtl:left-3" aria-label={ui.close}>
              ✕
            </button>
          )}
        </label>
      </Reveal>

      {/* category tabs */}
      <div className="sticky top-[5.25rem] z-20 -mx-4 mt-5 px-4 py-2 sm:mx-0 sm:px-0">
        <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-full bg-cream/80 p-1.5 ring-1 ring-ink/5 backdrop-blur-xl">
          {MENU.map((c) => {
            const on = !results && c.id === active
            return (
              <button
                key={c.id}
                onClick={() => {
                  setQ('')
                  setActive(c.id)
                }}
                className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${on ? 'text-ink' : 'text-ink/60 hover:text-ink'}`}
              >
                {on && <m.span layoutId="menu-tab" className="absolute inset-0 -z-10 rounded-full bg-gold shadow-md" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <CatIcon name={c.icon} className="size-4" />
                {c.name[lang]}
                <span className={`text-[11px] ${on ? 'text-ink/60' : 'text-ink/35'}`}>{num(c.items.length)}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* panel */}
      <div className="mt-4 rounded-[2rem] bg-white/70 p-5 ring-1 ring-ink/5 shadow-[0_30px_80px_-50px_rgba(31,34,40,0.45)] sm:p-8">
        <AnimatePresence mode="wait">
          {results ? (
            <m.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <p className="mb-2 text-sm font-semibold text-gold-deep">{ui.results(num(results.length))}</p>
              {results.length ? (
                <ul className="grid gap-x-10 md:grid-cols-2">
                  {results.map(({ item, cat: c }) => (
                    <ItemRow key={c.id + item.en} item={item} showCat={c.name[lang]} />
                  ))}
                </ul>
              ) : (
                <p className="py-10 text-center text-ink-soft">{ui.noResults}</p>
              )}
            </m.div>
          ) : (
            <m.div key={cat.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-gold text-ink shadow-[0_12px_24px_-12px_rgba(196,106,0,0.8)]">
                    <CatIcon name={cat.icon} className="size-7" />
                  </span>
                  <div>
                    <h3 className="font-display text-3xl font-medium">{cat.name[lang]}</h3>
                    <p className="text-sm text-ink-soft">
                      {ui.items(num(cat.items.length))} · {ui.currency}
                    </p>
                  </div>
                </div>
                <button onClick={() => setPage(cat.page)} className="flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink/70 transition hover:border-gold hover:text-ink">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>
                  {ui.printed} · {ui.page(num(cat.page))}
                </button>
              </div>
              <ul className="grid gap-x-10 md:grid-cols-2">
                {cat.items.map((item) => (
                  <ItemRow key={item.en} item={item} />
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* printed menu pages */}
      <Reveal className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 className="font-display text-2xl">{ui.printed}</h3>
          <p className="text-sm text-ink-soft">{ui.printedHint}</p>
        </div>
        <div className="no-scrollbar mt-5 flex gap-4 overflow-x-auto pb-4">
          {MENU_PAGES.map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              data-cursor="⤢"
              className="group relative w-36 shrink-0 overflow-hidden rounded-2xl ring-1 ring-ink/10 transition duration-500 hover:-translate-y-1.5 hover:shadow-xl sm:w-44"
            >
              <img src={`/img/menu-${n}-thumb.webp`} alt={ui.page(num(n))} loading="lazy" width="176" height="249" className="aspect-[1131/1600] w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute bottom-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold ltr:left-2 rtl:right-2">{ui.page(num(n))}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <Lightbox page={page} onClose={() => setPage(null)} onNav={navPage} />
    </section>
  )
}
