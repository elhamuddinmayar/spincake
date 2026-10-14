import { MENU } from '../data/menu'
import { useLang } from '../i18n'
import { CatIcon } from './Menu'

// One straight ribbon of menu categories. Each half holds the list twice so the
// loop never shows a gap. The track is always laid out left-to-right (in RTL the
// container would otherwise push it off-screen); each label keeps its own direction.
export default function Marquee() {
  const { lang, rtl } = useLang()
  const half = [...MENU, ...MENU]
  return (
    <div dir="ltr" className="relative z-40 overflow-hidden border-y border-gold/30 bg-ink text-cream">
      <div
        key={lang}
        className={`flex w-max animate-marquee py-5 hover:[animation-play-state:paused] ${rtl ? '[animation-direction:reverse]' : ''}`}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {half.map((c, i) => (
              <li key={i} dir={rtl ? 'rtl' : 'ltr'} className="flex items-center gap-3 px-6 text-xl leading-normal font-semibold whitespace-nowrap sm:text-2xl">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold text-ink">
                  <CatIcon name={c.icon} className="size-5" />
                </span>
                {c.name[lang]}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
