import { MENU } from '../data/menu'
import { useLang } from '../i18n'

const Star = () => (
  <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-gold" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
  </svg>
)

function Row({ items, reverse = false }) {
  const row = [...items, ...items]
  return (
    <div dir="ltr" className={`flex w-max animate-marquee ${reverse ? '[animation-direction:reverse]' : ''}`}>
      {row.map((item, i) => (
        <span key={i} className="flex items-center gap-8 pr-8 font-display text-2xl italic sm:text-3xl">
          {item}
          <Star />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  const { lang } = useLang()
  const items = MENU.map((c) => c.name[lang])
  return (
    <div className="relative z-40 py-6">
      <div className="-rotate-2 overflow-hidden bg-ink py-5 text-cream shadow-xl">
        <Row items={items} />
      </div>
      <div className="absolute inset-x-0 top-1/2 -z-10 rotate-2 overflow-hidden bg-gold py-5 text-ink/80">
        <Row items={items} reverse />
      </div>
    </div>
  )
}
