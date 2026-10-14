import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { TRANSLATIONS } from './translations'

export const LANGS = [
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr', locale: 'en' },
  { code: 'ps', label: 'پښتو', name: 'پښتو', dir: 'rtl', locale: 'ps-AF', digits: 'fa-AF-u-nu-arabext' }, // browsers lack Pashto number data; digits are the same
  { code: 'fa', label: 'دری', name: 'دری', dir: 'rtl', locale: 'fa-AF', digits: 'fa-AF-u-nu-arabext' },
]

const LangContext = createContext(null)

function initialLang() {
  try {
    const saved = localStorage.getItem('spincake-lang')
    if (LANGS.some((l) => l.code === saved)) return saved
  } catch {
    /* storage unavailable */
  }
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)
  const [switching, setSwitching] = useState(false)
  const timers = useRef([])
  const meta = LANGS.find((l) => l.code === lang)

  useEffect(() => {
    document.documentElement.lang = meta.locale
    document.documentElement.dir = meta.dir
    try {
      localStorage.setItem('spincake-lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang, meta])

  // swap language behind a curtain so the layout flip (LTR ↔ RTL) is never seen mid-way
  const setLang = useCallback(
    (code) => {
      if (code === lang) return
      timers.current.forEach(clearTimeout)
      setSwitching(true)
      timers.current = [setTimeout(() => setLangState(code), 450), setTimeout(() => setSwitching(false), 650)]
    },
    [lang],
  )

  const value = useMemo(() => {
    const nf = new Intl.NumberFormat(meta.digits ?? meta.locale, { useGrouping: false })
    return {
      lang,
      setLang,
      switching,
      dir: meta.dir,
      rtl: meta.dir === 'rtl',
      t: TRANSLATIONS[lang],
      num: (n, pad = 0) => (pad ? nf.format(0).repeat(Math.max(0, pad - String(n).length)) : '') + nf.format(n),
    }
  }, [lang, meta, setLang, switching])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
