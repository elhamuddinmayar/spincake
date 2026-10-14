// Everything that pulls in three.js lives behind this module, which is loaded lazily (see lazy.jsx).
import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, View } from '@react-three/drei'
import { CraftScene, HeroScene, LogoScene, StudioScene } from './Scenes'

// One shared WebGL canvas; every <View> on the page renders into it
export function Canvas3D() {
  const [dpr, setDpr] = useState(1.5)
  return (
    <Canvas
      className="!fixed inset-0 !pointer-events-none z-30"
      eventSource={document.getElementById('root')}
      eventPrefix="client"
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      {/* drop resolution on slower devices, raise it again when there is headroom */}
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(Math.min(1.5, window.devicePixelRatio))} />
      <View.Port />
    </Canvas>
  )
}

export function HeroView({ className }) {
  return (
    <View className={className}>
      <HeroScene />
    </View>
  )
}

export function CraftView({ className, progress }) {
  return (
    <View className={className}>
      <CraftScene progress={progress} />
    </View>
  )
}

export function StudioView({ className, config, rotation }) {
  return (
    <View className={className}>
      <StudioScene config={config} rotation={rotation} />
    </View>
  )
}

export function LogoView({ className }) {
  return (
    <View className={className}>
      <Suspense fallback={null}>
        <LogoScene />
      </Suspense>
    </View>
  )
}
