import { watch, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { debounce } from '../utils/debounce'

interface CodeParticle {
  x: number
  y: number
  vy: number
  size: number
  opacity: number
  text: string
  color: string
}

const CODE_TOKENS = [
  '</>',
  '{  }',
  '=>',
  '&&',
  '||',
  'const',
  'async',
  '01',
  '10',
  '()',
  ';',
  '===',
  'fn()',
  'null',
  'true',
]

function randomColor(dark: boolean): string {
  return Math.random() > 0.55
    ? dark
      ? '#eab308'
      : '#047857'
    : dark
      ? '#94a3b8'
      : '#1e293b'
}

function initParticles(w: number, h: number, dark: boolean): CodeParticle[] {
  const isMobile = window.matchMedia('(max-width: 640px)').matches
  const maxParticles = isMobile ? 20 : 40
  const count = Math.min(Math.max(18, Math.floor((w * h) / 20000)), maxParticles)

  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vy: -(Math.random() * 0.22 + 0.08),
    size: dark ? Math.random() * 8 + 7 : Math.random() * 9 + 6,
    opacity: dark ? Math.random() * 0.09 + 0.03 : Math.random() * 0.18 + 0.09,
    text: CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)] ?? '</>',
    color: randomColor(dark),
  }))
}

/**
 * Manages the floating code-token canvas animation in the Hero section.
 * Accepts an externally-created canvas ref so the component template can bind
 * to it directly, keeping vue-tsc happy about unused-locals checks.
 *
 * Optimisations vs original:
 *  - No ctx.save()/restore() — removes per-particle overhead.
 *  - No shadowBlur/shadowColor — removed the most expensive canvas 2D operation.
 *  - Particle count capped (20 mobile / 40 desktop).
 *  - isDark read once per frame, not inside the hot loop.
 *  - Theme switch updates colors in-place instead of full reinit + RAF restart.
 *  - Resize debounced at 150ms.
 *  - Respects prefers-reduced-motion.
 *  - IntersectionObserver pauses animation when hero is off-screen.
 */
export function useHeroCanvas(isDark: Ref<boolean>, heroCanvasRef: Ref<HTMLCanvasElement | null>) {
  let animId: number | null = null
  let observer: IntersectionObserver | null = null
  let particles: CodeParticle[] = []

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function animate() {
    const canvas = heroCanvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dark = isDark.value
    const { width: w, height: h } = canvas

    ctx.clearRect(0, 0, w, h)

    for (const p of particles) {
      ctx.globalAlpha = p.opacity
      ctx.font = `${p.size}px "Courier New", monospace`
      ctx.fillStyle = p.color
      ctx.fillText(p.text, p.x, p.y)

      p.y += p.vy
      if (p.y < -30) {
        p.y = h + 10
        p.x = Math.random() * w
        p.text = CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)] ?? '</>'
        p.color = randomColor(dark)
      }
    }

    ctx.globalAlpha = 1

    animId = requestAnimationFrame(animate)
  }

  function start() {
    if (prefersReducedMotion) return
    const canvas = heroCanvasRef.value
    if (!canvas) return
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    particles = initParticles(canvas.width, canvas.height, isDark.value)
    animate()
  }

  function stop() {
    if (animId !== null) {
      cancelAnimationFrame(animId)
      animId = null
    }
  }

  const debouncedResize = debounce(() => {
    stop()
    start()
  }, 150)

  watch(isDark, (dark) => {
    for (const p of particles) {
      p.color = randomColor(dark)
    }
  })

  onMounted(() => {
    start()

    const canvas = heroCanvasRef.value
    if (canvas) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            if (animId === null) start()
          } else {
            stop()
          }
        },
        { threshold: 0 },
      )
      observer.observe(canvas)
    }

    window.addEventListener('resize', debouncedResize, { passive: true })
  })

  onUnmounted(() => {
    stop()
    observer?.disconnect()
    window.removeEventListener('resize', debouncedResize)
  })
}
