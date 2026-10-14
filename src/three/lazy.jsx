import { createContext, lazy, Suspense, useContext, useEffect, useState } from 'react'
import { m } from 'framer-motion'

// three.js + drei (~1 MB) are split into their own chunk and fetched after the page is interactive
const load = () => import('./views')
export const Canvas3D = lazy(() => load().then((m) => ({ default: m.Canvas3D })))
export const HeroView = lazy(() => load().then((m) => ({ default: m.HeroView })))
export const CraftView = lazy(() => load().then((m) => ({ default: m.CraftView })))
export const StudioView = lazy(() => load().then((m) => ({ default: m.StudioView })))
export const LogoView = lazy(() => load().then((m) => ({ default: m.LogoView })))

const ThreeContext = createContext(false)

function canRender3D() {
  if (navigator.connection?.saveData) return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function ThreeProvider({ children }) {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (!canRender3D()) return
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 300))
    const cancel = window.cancelIdleCallback ?? clearTimeout
    const id = idle(() => setEnabled(true), { timeout: 1500 })
    return () => cancel(id)
  }, [])
  return (
    <ThreeContext.Provider value={enabled}>
      {children}
      {enabled && (
        <Suspense fallback={null}>
          <Canvas3D />
        </Suspense>
      )}
    </ThreeContext.Provider>
  )
}

// Renders the 3D view once available; until then (or without WebGL) shows the lightweight fallback
export function Stage3D({ children, fallback = null }) {
  const enabled = useContext(ThreeContext)
  if (!enabled) return fallback
  return (
    <Suspense fallback={fallback}>
      <m.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        {children}
      </m.div>
    </Suspense>
  )
}

// Static placeholder: the Spin Cake logo on a soft glow
export function LogoFallback({ className = '' }) {
  return (
    <div className={`absolute inset-0 grid place-items-center ${className}`}>
      <div className="relative grid size-56 place-items-center rounded-full bg-white/70 shadow-[0_30px_80px_-30px_rgba(160,100,0,0.45)] sm:size-72">
        <img src="/img/logo.png" alt="" className="size-40 object-contain sm:size-52" />
      </div>
    </div>
  )
}
