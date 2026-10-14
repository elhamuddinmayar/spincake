import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, PerspectiveCamera, Sparkles, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Cake, CakeStand, Cherry, CherryTopping, Donut, Drips, Macaron, Pearls, Strawberry } from './Treats'

// Brand colours: Spin = white, gold caramel, cherry on top
export const WHITE_CREAM = '#fffaf3'
export const CARAMEL = '#e0901f'

// Soft studio lighting, generated locally (no HDR download)
export function Studio() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 6, 4]} intensity={1.5} color="#fff4e0" />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#ffd98a" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 5]} scale={[8, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={2} color="#ffd98a" position={[-5, 1, 0]} scale={4} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2} color="#fff0d0" position={[5, 1, -1]} scale={[3, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.8} color="#f6e6c8" position={[0, -4, 0]} scale={[10, 10, 1]} target={[0, 0, 0]} />
      </Environment>
    </>
  )
}

function Rig({ target = [0, 0, 0], base = [0, 1.2, 9], amount = 0.5 }) {
  const v = new THREE.Vector3()
  useFrame((state) => {
    v.set(base[0] + state.pointer.x * amount, base[1] + state.pointer.y * amount * 0.5, base[2])
    state.camera.position.lerp(v, 0.04)
    state.camera.lookAt(...target)
  })
  return null
}

export function HeroScene() {
  const spin = useRef()
  const size = useThree((s) => s.size)
  // keep the floating treats inside the frame on any aspect ratio
  const halfW = 9 * Math.tan((35 / 2) * (Math.PI / 180)) * (size.width / size.height)
  const x = (v) => Math.sign(v) * Math.min(Math.abs(v), halfW - 0.8)
  const k = Math.min(1, halfW / 2.6)

  useFrame(({ clock }) => {
    const scroll = window.scrollY
    spin.current.rotation.y = clock.elapsedTime * 0.35 + scroll * 0.004
    spin.current.position.y = -1.1 - Math.min(scroll, 900) * 0.0012
  })
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.2, 9]} fov={35} />
      <Rig />
      <Studio />
      <group ref={spin} position={[0, -1.1, 0]} scale={Math.max(0.8, k)}>
        <Cake tiers={3} frosting={WHITE_CREAM} drip={CARAMEL} topping="cherries" />
      </group>

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.2}>
        <Macaron color="#ffd25e" position={[x(-2.6), 1.7, 0.2]} rotation={[0.6, 0.4, 0.3]} scale={1.4 * k} />
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={1}>
        <Donut glaze="#ffc23d" position={[x(2.6), 1.2, -0.4]} rotation={[0.9, 0, 0.4]} scale={1.1 * k} />
      </Float>
      <Float speed={2.4} rotationIntensity={1.5} floatIntensity={1.4}>
        <Strawberry position={[x(-2.4), -0.8, 0.8]} rotation={[0.3, 0, 0.5]} scale={1.6 * k} />
      </Float>
      <Float speed={1.8} rotationIntensity={1.4} floatIntensity={1.2}>
        <Macaron color="#f7a33a" position={[x(2.5), -1, 0.6]} rotation={[-0.4, 0.2, -0.6]} scale={1.2 * k} />
      </Float>
      <Float speed={2.2} rotationIntensity={2} floatIntensity={1.4}>
        <Cherry position={[x(-1.3), 2.25, 0.4]} scale={1.8 * k} />
      </Float>

      <Sparkles count={30} scale={[7, 5, 4]} size={3} speed={0.35} color="#ffc94d" />
      <ContactShadows position={[0, -1.85, 0]} opacity={0.3} scale={4.6} blur={2.6} far={3} resolution={256} color="#4a3210" />
    </>
  )
}

export function StudioScene({ config, rotation }) {
  const group = useRef()
  useFrame((_, dt) => {
    rotation.current.target += dt * 0.25 * rotation.current.auto
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, rotation.current.target, 6, dt)
  })
  const tierOffset = { 1: -0.3, 2: -0.65, 3: -1 }[config.tiers]
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2.2, 7.6]} fov={35} />
      <Rig base={[0, 2.2, 7.6]} target={[0, 0.2, 0]} amount={0.3} />
      <Studio />
      <group ref={group} position={[0, tierOffset, 0]}>
        <Cake key={config.tiers} tiers={config.tiers} frosting={config.frosting} drip={config.drip} topping={config.topping} />
      </group>
      <ContactShadows position={[0, tierOffset - 0.71, 0]} opacity={0.3} scale={3.8} blur={2.4} far={2.5} resolution={256} color="#4a3210" />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  "Our cakes" — a cake that builds itself as you scroll              */
/* ------------------------------------------------------------------ */

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2)

const R = 1.1
const LAYERS = [
  { h: 0.3, color: '#f3d7a6', r: R },
  { h: 0.08, color: WHITE_CREAM, r: R - 0.04 },
  { h: 0.3, color: '#f3d7a6', r: R },
  { h: 0.08, color: '#ffc23d', r: R - 0.04 },
  { h: 0.3, color: '#f3d7a6', r: R },
]
const H = LAYERS.reduce((a, l) => a + l.h, 0)
const LAYER_Y = LAYERS.reduce((acc, l, i) => [...acc, i ? acc[i - 1] + LAYERS[i - 1].h : 0], [])

export function CraftScene({ progress }) {
  const spin = useRef()
  const layers = useRef([])
  const frost = useRef()
  const pearls = useRef()
  const drip = useRef()
  const top = useRef()

  useFrame(({ clock }) => {
    const s = progress.current * 4.4 // 4 steps + a little hold at the end

    // 1 · sponge layers drop in one by one
    layers.current.forEach((g, i) => {
      const t = clamp01((s - i * 0.16) / 0.35)
      g.visible = t > 0
      g.position.y = LAYER_Y[i] + (1 - easeOut(t)) * 2.5
    })
    // 2 · cream rises up and wraps the sponge
    const f = easeOut(clamp01(s - 1.05))
    frost.current.visible = f > 0.001
    frost.current.scale.set(1, Math.max(f, 0.001), 1)
    pearls.current.visible = f > 0.85
    pearls.current.scale.setScalar(easeBack(clamp01((f - 0.85) / 0.15)))
    // 3 · caramel pours over the edge
    const d = easeOut(clamp01(s - 2.1))
    drip.current.visible = d > 0.001
    drip.current.scale.set(1, Math.max(d, 0.001), 1)
    // 4 · cherries fall in
    const tp = clamp01(s - 3.1)
    top.current.visible = tp > 0
    top.current.position.y = H + 0.05 + (1 - easeOut(tp)) * 2
    top.current.scale.setScalar(0.4 + 0.6 * easeBack(tp))

    spin.current.rotation.y = clock.elapsedTime * 0.25 + progress.current * Math.PI * 2
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2.6, 7.6]} fov={35} onUpdate={(c) => c.lookAt(0, 0.3, 0)} />
      <Studio />
      <group ref={spin} position={[0, -0.4, 0]}>
        <CakeStand />
        {LAYERS.map((l, i) => (
          <group key={i} ref={(el) => (layers.current[i] = el)}>
            <mesh position={[0, l.h / 2, 0]}>
              <cylinderGeometry args={[l.r, l.r, l.h, 64]} />
              <meshStandardMaterial color={l.color} roughness={i % 2 ? 0.4 : 0.9} />
            </mesh>
          </group>
        ))}
        <group ref={frost}>
          <mesh position={[0, (H + 0.02) / 2, 0]}>
            <cylinderGeometry args={[R + 0.03, R + 0.03, H + 0.02, 64]} />
            <meshStandardMaterial color={WHITE_CREAM} roughness={0.55} />
          </mesh>
        </group>
        <group ref={pearls}>
          <Pearls radius={R + 0.04} y={0.07} count={42} size={0.075} />
        </group>
        <group position={[0, H + 0.02, 0]}>
          <group ref={drip}>
            <group position={[0, -(H + 0.02), 0]}>
              <Drips radius={R + 0.03} top={H + 0.02} color={CARAMEL} seed={5} />
            </group>
          </group>
        </group>
        <group ref={top}>
          <CherryTopping radius={R} />
        </group>
      </group>
      <ContactShadows position={[0, -1.11, 0]} opacity={0.3} scale={4} blur={2.4} far={2.5} resolution={256} color="#4a3210" />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Footer — the Spin Cake logo as a spinning 3D gold medallion        */
/* ------------------------------------------------------------------ */

const GOLD = { color: '#f5b31a', metalness: 0.85, roughness: 0.28 }

function LogoFace({ texture, back = false }) {
  const z = back ? -0.151 : 0.151
  return (
    <group position={[0, 0, z]} rotation={[0, back ? Math.PI : 0, 0]}>
      <mesh>
        <circleGeometry args={[1.42, 64]} />
        <meshBasicMaterial color="#fffaf1" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.02, 0.003]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}

export function LogoScene() {
  const texture = useTexture('/img/logo.png')
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  const coin = useRef()

  useFrame(({ clock, pointer }, dt) => {
    // slow spin ("Spin" Cake) that leans toward the pointer
    coin.current.rotation.y = clock.elapsedTime * 0.7
    coin.current.rotation.x = THREE.MathUtils.damp(coin.current.rotation.x, -pointer.y * 0.25, 4, dt)
    coin.current.rotation.z = THREE.MathUtils.damp(coin.current.rotation.z, pointer.x * 0.1, 4, dt)
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={30} />
      <Studio />
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <group ref={coin}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 0.3, 96, 1, true]} />
            <meshStandardMaterial {...GOLD} />
          </mesh>
          <mesh position={[0, 0, 0.15]}>
            <torusGeometry args={[1.48, 0.07, 16, 96]} />
            <meshStandardMaterial {...GOLD} />
          </mesh>
          <mesh position={[0, 0, -0.15]}>
            <torusGeometry args={[1.48, 0.07, 16, 96]} />
            <meshStandardMaterial {...GOLD} />
          </mesh>
          <LogoFace texture={texture} />
          <LogoFace texture={texture} back />
        </group>
      </Float>
      <Sparkles count={40} scale={[5, 4, 2]} size={3} speed={0.4} color="#ffc94d" />
    </>
  )
}
