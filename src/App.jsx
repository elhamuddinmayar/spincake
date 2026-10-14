import { useEffect } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Menu from './components/Menu'
import Craft from './components/Craft'
import CakeStudio from './components/CakeStudio'
import About from './components/About'
import Visit from './components/Visit'
import Footer from './components/Footer'
import { Cursor, LangCurtain, Loader, ScrollProgress } from './components/Extras'
import { ThreeProvider } from './three/lazy'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.1 })
    window.__lenis = lenis
    return () => lenis.destroy()
  }, [])

  return (
    <ThreeProvider>
      <Loader />
      <LangCurtain />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Menu />
        <About />
        <Craft />
        <CakeStudio />
        <Visit />
      </main>
      <Footer />
    </ThreeProvider>
  )
}
