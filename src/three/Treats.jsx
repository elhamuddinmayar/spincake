import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Deterministic pseudo-random so decorations don't reshuffle on re-render
export function rand(seed) {
  let s = seed * 9301 + 49297
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const CREAM = '#fff4e6'
const SPRINKLE_COLORS = ['#e0457b', '#ffd166', '#7ad3c4', '#ffffff', '#8b5cf6', '#ff8fab']
const TAU = Math.PI * 2

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

export function Pearls({ radius, y = 0, count = 32, size = 0.07, color = CREAM }) {
  const ref = useRef()
  useLayoutEffect(() => {
    const d = new THREE.Object3D()
    for (let i = 0; i < count; i++) {
      const a = (i / count) * TAU
      d.position.set(Math.cos(a) * radius, y, Math.sin(a) * radius)
      d.updateMatrix()
      ref.current.setMatrixAt(i, d.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  }, [radius, y, count])
  return (
    <instancedMesh key={count} ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 10, 8]} />
      <meshStandardMaterial color={color} roughness={0.45} />
    </instancedMesh>
  )
}

export function Sprinkles({ radius, y = 0, count = 90, seed = 1, inner = 0 }) {
  const ref = useRef()
  useLayoutEffect(() => {
    const r = rand(seed)
    const d = new THREE.Object3D()
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const rr = inner + Math.sqrt(r()) * (radius - inner)
      const a = r() * TAU
      d.position.set(Math.cos(a) * rr, y, Math.sin(a) * rr)
      d.rotation.set(0, r() * TAU, Math.PI / 2)
      d.updateMatrix()
      ref.current.setMatrixAt(i, d.matrix)
      ref.current.setColorAt(i, c.set(SPRINKLE_COLORS[Math.floor(r() * SPRINKLE_COLORS.length)]))
    }
    ref.current.instanceMatrix.needsUpdate = true
    ref.current.instanceColor.needsUpdate = true
  }, [radius, y, count, seed, inner])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.012, 0.05, 4, 8]} />
      <meshStandardMaterial roughness={0.35} />
    </instancedMesh>
  )
}

export function Drips({ radius, top, color, seed }) {
  const material = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.1 }),
    [color],
  )
  const drips = useMemo(() => {
    const r = rand(seed)
    const n = Math.round(radius * 22)
    return Array.from({ length: n }, (_, i) => ({
      a: (i / n) * TAU + r() * 0.12,
      len: 0.06 + r() * 0.32,
      w: 0.04 + r() * 0.015,
    }))
  }, [radius, seed])
  return (
    <group>
      <mesh position={[0, top + 0.02, 0]} material={material}>
        <cylinderGeometry args={[radius + 0.02, radius + 0.02, 0.05, 72]} />
      </mesh>
      {drips.map(({ a, len, w }, i) => (
        <mesh
          key={i}
          material={material}
          position={[Math.cos(a) * (radius + 0.012), top - len / 2, Math.sin(a) * (radius + 0.012)]}
        >
          <capsuleGeometry args={[w, len, 4, 8]} />
        </mesh>
      ))}
    </group>
  )
}

function Tier({ r, h, y, frosting, drip, seed }) {
  return (
    <group position={[0, y, 0]}>
      <mesh position={[0, h / 2, 0]}>
        <cylinderGeometry args={[r, r, h, 64]} />
        <meshStandardMaterial color={frosting} roughness={0.5} />
      </mesh>
      <Pearls radius={r + 0.01} y={0.07} count={Math.round(r * 38)} size={0.075} />
      {drip ? (
        <Drips radius={r} top={h} color={drip} seed={seed + 3} />
      ) : (
        <Pearls radius={r - 0.05} y={h + 0.03} count={Math.round(r * 34)} size={0.06} />
      )}
    </group>
  )
}

export function CakeStand() {
  return (
    <group>
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[1.62, 1.5, 0.08, 64]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.12} clearcoat={1} />
      </mesh>
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.16, 0.24, 0.56, 48]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.12} clearcoat={1} />
      </mesh>
      <mesh position={[0, -0.66, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.08, 64]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.12} clearcoat={1} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Toppings                                                           */
/* ------------------------------------------------------------------ */

export function Cherry({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.095, 20, 14]} />
        <meshPhysicalMaterial color="#b0102a" roughness={0.12} clearcoat={1} clearcoatRoughness={0.05} />
      </mesh>
      <mesh position={[0.025, 0.12, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.007, 0.009, 0.18, 6]} />
        <meshStandardMaterial color="#5b3a1a" />
      </mesh>
    </group>
  )
}

function Dollop({ position, color = CREAM }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.09, 0]}>
        <coneGeometry args={[0.13, 0.22, 8, 3]} />
        <meshStandardMaterial color={color} roughness={0.5} flatShading />
      </mesh>
    </group>
  )
}

export function CherryTopping({ radius }) {
  const n = 8
  const ring = radius * 0.7
  return (
    <group>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * TAU
        const p = [Math.cos(a) * ring, 0, Math.sin(a) * ring]
        return (
          <group key={i} position={p}>
            <Dollop position={[0, 0, 0]} />
            <Cherry position={[0, 0.24, 0]} />
          </group>
        )
      })}
      <Sprinkles radius={ring - 0.18} y={0.015} count={70} seed={4} />
    </group>
  )
}

const MACARON_COLORS = ['#f9c9d6', '#b8d7a3', '#ffe08a', '#c9b6f2', '#ffb38a', '#9ed8e6']

export function Macaron({ color = '#f9c9d6', filling = CREAM, ...props }) {
  return (
    <group {...props}>
      <mesh position={[0, 0.07, 0]} scale={[1, 0.42, 1]}>
        <sphereGeometry args={[0.2, 24, 14]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.18, 0.18, 0.07, 32]} />
        <meshPhysicalMaterial color={filling} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.07, 0]} scale={[1, 0.42, 1]}>
        <sphereGeometry args={[0.2, 24, 14]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </group>
  )
}

function MacaronTopping({ radius }) {
  const n = 6
  const ring = radius * 0.55
  return (
    <group>
      {Array.from({ length: n }, (_, i) => (
        <group key={i} rotation={[0, -(i / n) * TAU, 0]}>
          <Macaron color={MACARON_COLORS[i % MACARON_COLORS.length]} position={[ring, 0.2, 0]} rotation={[0, 0, 1.15]} />
        </group>
      ))}
      <Macaron color="#e0457b" position={[0, 0.12, 0]} scale={1.15} />
    </group>
  )
}

export function Strawberry(props) {
  return (
    <group {...props}>
      <mesh scale={[1, 1.25, 1]}>
        <sphereGeometry args={[0.12, 24, 18]} />
        <meshPhysicalMaterial color="#d61f3c" roughness={0.25} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <coneGeometry args={[0.1, 0.05, 6]} />
        <meshStandardMaterial color="#3f8f3a" roughness={0.6} />
      </mesh>
    </group>
  )
}

function BerryTopping({ radius }) {
  const berries = useMemo(() => {
    const r = rand(11)
    return Array.from({ length: 16 }, () => {
      const rr = Math.sqrt(r()) * radius * 0.75
      const a = r() * TAU
      return [Math.cos(a) * rr, 0.05, Math.sin(a) * rr]
    })
  }, [radius])
  const n = 7
  return (
    <group>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * TAU
        return (
          <Strawberry
            key={i}
            position={[Math.cos(a) * radius * 0.6, 0.15, Math.sin(a) * radius * 0.6]}
            rotation={[Math.cos(a) * 0.4, 0, -Math.sin(a) * 0.4]}
          />
        )
      })}
      <Strawberry position={[0, 0.18, 0]} scale={1.2} />
      {berries.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 16, 12]} />
          <meshPhysicalMaterial color="#2c3570" roughness={0.35} clearcoat={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Flame({ position, seed }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 12 + seed * 3
    const s = 1 + Math.sin(t) * 0.08 + Math.sin(t * 2.3) * 0.05
    ref.current.scale.set(0.6 * s, 1.4 / s, 0.6 * s)
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 16, 12]} />
      <meshBasicMaterial color="#ffc94d" toneMapped={false} />
    </mesh>
  )
}

function CandleTopping({ radius }) {
  const n = 6
  const ring = radius * 0.5
  const spots = [[0, 0], ...Array.from({ length: n }, (_, i) => [Math.cos((i / n) * TAU) * ring, Math.sin((i / n) * TAU) * ring])]
  return (
    <group>
      {spots.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.4, 16]} />
            <meshStandardMaterial color={i % 2 ? '#ffffff' : '#ff8fab'} roughness={0.4} />
          </mesh>
          <Flame position={[0, 0.47, 0]} seed={i} />
        </group>
      ))}
      <pointLight position={[0, 0.7, 0]} intensity={2} distance={3} color="#ffb547" />
      <Sprinkles radius={radius * 0.85} y={0.015} count={80} seed={9} />
    </group>
  )
}

const TOPPINGS = {
  cherries: CherryTopping,
  macarons: MacaronTopping,
  berries: BerryTopping,
  candles: CandleTopping,
}

/* ------------------------------------------------------------------ */
/*  The cake                                                           */
/* ------------------------------------------------------------------ */

const TIER_SIZES = [
  { r: 1.25, h: 0.85 },
  { r: 0.95, h: 0.72 },
  { r: 0.68, h: 0.6 },
]

export function Cake({ tiers = 2, frosting = '#f9c9d6', drip = '#4a2418', topping = 'cherries', stand = true, ...props }) {
  let y = 0
  const stack = []
  for (let i = 0; i < tiers; i++) {
    const { r, h } = TIER_SIZES[i]
    stack.push({ r, h, y })
    y += h
  }
  const top = stack[stack.length - 1]
  const Topping = TOPPINGS[topping] ?? CherryTopping
  return (
    <group {...props}>
      {stand && <CakeStand />}
      {stack.map((t, i) => (
        <Tier key={i} {...t} frosting={frosting} drip={drip} seed={i * 7} />
      ))}
      <group position={[0, y + (drip ? 0.045 : 0.02), 0]}>
        <Topping radius={top.r} />
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Menu treats                                                        */
/* ------------------------------------------------------------------ */

export function Donut({ glaze = '#ff8fab', ...props }) {
  return (
    <group {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.36, 0.17, 20, 40]} />
          <meshStandardMaterial color="#d9a066" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0, 0.045]} scale={[1.02, 1.02, 0.8]}>
          <torusGeometry args={[0.36, 0.165, 20, 40]} />
          <meshPhysicalMaterial color={glaze} roughness={0.2} clearcoat={1} />
        </mesh>
      </group>
      <Sprinkles radius={0.48} inner={0.26} y={0.19} count={60} seed={21} />
    </group>
  )
}
