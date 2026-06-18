<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'
import { useScrollSpy } from '../composables/useScrollSpy'
import { useCarousel } from '../composables/useCarousel'
import { useTypingAnimation } from '../composables/useTypingAnimation'
import { useProjectModal } from '../composables/useProjectModal'
import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { CONTACT, contactPhoneHref, contactEmailHref } from '../data/contact'
import SkillCard from './SkillCard.vue'
import ProjectsPagination from './ProjectsPagination.vue'
import ContactLink from './ContactLink.vue'
import { featuredCertificates, aluraCertificates } from '../data/certificates'

// ---- Tema ----
const { isDark, toggleDarkMode } = useDarkMode()
const isMenuOpen = ref(false)

// ---- Mobile skill highlight ----
const mobileActiveSkill = ref<string | null>(null)
let mobileActiveSkillTimer: ReturnType<typeof setTimeout> | null = null

// ---- Hero canvas (floating code tokens) ----
const heroCanvasRef = ref<HTMLCanvasElement | null>(null)
let heroAnimId: number | null = null
let heroObserver: IntersectionObserver | null = null

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
let heroParticles: CodeParticle[] = []

function initHeroParticles(w: number, h: number, dark: boolean): CodeParticle[] {
  const count = Math.max(18, Math.floor((w * h) / 20000))
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vy: -(Math.random() * 0.22 + 0.08),
    size: Math.random() * 8 + 7,
    opacity: Math.random() * 0.09 + 0.03,
    text: CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)] ?? '</>',
    color: Math.random() > 0.55 ? (dark ? '#eab308' : '#10b981') : (dark ? '#94a3b8' : '#475569'),
  }))
}

function animateHeroCanvas() {
  const canvas = heroCanvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const { width: w, height: h } = canvas
  ctx.clearRect(0, 0, w, h)
  for (const p of heroParticles) {
    ctx.save()
    ctx.globalAlpha = p.opacity
    ctx.font = `${p.size}px "Courier New", monospace`
    ctx.fillStyle = p.color
    ctx.fillText(p.text, p.x, p.y)
    ctx.restore()
    p.y += p.vy
    if (p.y < -30) {
      p.y = h + 10
      p.x = Math.random() * w
      p.text = CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)] ?? '</>'
    }
  }
  heroAnimId = requestAnimationFrame(animateHeroCanvas)
}

function startHeroCanvas() {
  const canvas = heroCanvasRef.value
  if (!canvas) return
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  heroParticles = initHeroParticles(canvas.width, canvas.height, isDark.value)
  animateHeroCanvas()
}

function resizeHeroCanvas() {
  if (heroAnimId !== null) {
    cancelAnimationFrame(heroAnimId)
    heroAnimId = null
  }
  startHeroCanvas()
}

// ---- Scroll hint (mobile) ----
const SCROLL_HINT_BREAKPOINT = 640
const mobileProjectsRef = ref<HTMLElement | null>(null)
const didDismissProjectsHint = ref(false)
const showProjectsScrollHint = ref(false)

// ---- Scroll spy ----
const { activeSection } = useScrollSpy()

// ---- Navegação ----
type NavLink = {
  label: string
  href: string
  external?: boolean
}

const navLinks: NavLink[] = [
  { label: 'Sobre Mim', href: '#about' },
  { label: 'Experiências', href: '#experience' },
  { label: 'Conhecimentos', href: '#skills' },
  { label: 'Certificados', href: '#certificates' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Fale Comigo', href: '#contact' },
]

const scrollToSection = (link: NavLink) => {
  if (link.external) {
    window.open(link.href, '_blank', 'noopener,noreferrer')
  } else {
    const el = document.querySelector(link.href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  isMenuOpen.value = false
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

// ---- Skills mobile highlight ----
const activateMobileSkill = (skillName: string) => {
  mobileActiveSkill.value = skillName
  if (mobileActiveSkillTimer !== null) clearTimeout(mobileActiveSkillTimer)
  // Simula hover touch: limpa o destaque após 700ms.
  mobileActiveSkillTimer = setTimeout(() => {
    if (mobileActiveSkill.value === skillName) mobileActiveSkill.value = null
  }, 700)
}

// ---- Mobile projects scroll hint ----
const updateProjectsScrollHint = () => {
  const el = mobileProjectsRef.value
  if (!el || didDismissProjectsHint.value || window.innerWidth >= SCROLL_HINT_BREAKPOINT) {
    showProjectsScrollHint.value = false
    return
  }
  // Só exibe se o overflow for perceptível (> 24px).
  showProjectsScrollHint.value = el.scrollWidth - el.clientWidth > 24
}

const dismissProjectsScrollHint = () => {
  didDismissProjectsHint.value = true
  showProjectsScrollHint.value = false
}

const onMobileProjectsScroll = () => {
  if (!mobileProjectsRef.value) return
  if (mobileProjectsRef.value.scrollLeft > 16) dismissProjectsScrollHint()
}

onMounted(() => {
  nextTick(() => {
    updateProjectsScrollHint()
    startHeroCanvas()
    if (heroCanvasRef.value) {
      heroObserver = new IntersectionObserver(
        (entries) => {
          const isIntersecting = entries[0]?.isIntersecting ?? false
          if (isIntersecting) {
            if (heroAnimId === null) startHeroCanvas()
          } else {
            if (heroAnimId !== null) {
              cancelAnimationFrame(heroAnimId)
              heroAnimId = null
            }
          }
        },
        { threshold: 0 }
      )
      heroObserver.observe(heroCanvasRef.value)
    }
  })
  window.addEventListener('resize', updateProjectsScrollHint, { passive: true })
  window.addEventListener('resize', resizeHeroCanvas, { passive: true })
  window.addEventListener('resize', updateCertScrollState, { passive: true })
  nextTick(updateCertScrollState)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateProjectsScrollHint)
  window.removeEventListener('resize', resizeHeroCanvas)
  window.removeEventListener('resize', updateCertScrollState)
  if (heroAnimId !== null) cancelAnimationFrame(heroAnimId)
  if (mobileActiveSkillTimer !== null) clearTimeout(mobileActiveSkillTimer)
  heroObserver?.disconnect()
})

watch(isDark, () => {
  if (heroAnimId !== null) {
    cancelAnimationFrame(heroAnimId)
    heroAnimId = null
  }
  startHeroCanvas()
})
// ---- Carousel ----
const carouselTrackRef = ref<HTMLElement | null>(null)
const {
  carouselOffset,
  carouselIsDragging,
  onMouseDown: onCarouselMouseDown,
  onTouchStart: onCarouselTouchStart,
  onTouchMove: onCarouselTouchMove,
  onTouchEnd: onCarouselTouchEnd,
  onTouchCancel: onCarouselTouchCancel,
} = useCarousel(carouselTrackRef)

// ---- Cert carousel drag-scroll (factory) ----
function useCertCarouselDrag(carouselRef: ReturnType<typeof ref<HTMLElement | null>>) {
  let dragging = false
  let dragStartX = 0
  let dragScrollLeft = 0
  const isDragging = ref(false)

  const onMouseDown = (e: MouseEvent) => {
    isDragging.value = true
    dragging = true
    dragStartX = e.pageX - (carouselRef.value?.offsetLeft ?? 0)
    dragScrollLeft = carouselRef.value?.scrollLeft ?? 0
  }
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging || !carouselRef.value) return
    e.preventDefault()
    const x = e.pageX - carouselRef.value.offsetLeft
    carouselRef.value.scrollLeft = dragScrollLeft - (x - dragStartX)
  }
  const onMouseUp = () => {
    isDragging.value = false
    dragging = false
  }

  return { isDragging, onMouseDown, onMouseMove, onMouseUp }
}

const certCarouselRef = ref<HTMLElement | null>(null)
const certCarousel2Ref = ref<HTMLElement | null>(null)

// ---- Cert scroll overflow detection ----
const cert1CanScroll = ref(false)
const cert2CanScroll = ref(false)

function updateCertScrollState() {
  if (certCarouselRef.value) {
    cert1CanScroll.value = certCarouselRef.value.scrollWidth > certCarouselRef.value.clientWidth + 4
  }
  if (certCarousel2Ref.value) {
    cert2CanScroll.value = certCarousel2Ref.value.scrollWidth > certCarousel2Ref.value.clientWidth + 4
  }
}

const {
  isDragging: certIsDragging,
  onMouseDown: onCertMouseDownTrack,
  onMouseMove: onCertMouseMoveTrack,
  onMouseUp: onCertMouseUpTrack,
} = useCertCarouselDrag(certCarouselRef)

const {
  isDragging: certIsDragging2,
  onMouseDown: onCertMouseDownTrack2,
  onMouseMove: onCertMouseMoveTrack2,
  onMouseUp: onCertMouseUpTrack2,
} = useCertCarouselDrag(certCarousel2Ref)

// ---- Projects Pagination ----
const ITEMS_PER_PAGE = 4
const currentPage = ref(0)
const totalPages = computed(() => Math.ceil(projects.length / ITEMS_PER_PAGE))
const paginatedProjects = computed(() =>
  projects.slice(currentPage.value * ITEMS_PER_PAGE, (currentPage.value + 1) * ITEMS_PER_PAGE)
)

// ---- Project Modal ----
const {
  selectedProject,
  modalImageIndex,
  modalImages,
  openModal,
  closeModal,
  modalPrev,
  modalNext,
  openProjectLink,
} = useProjectModal()

// ---- Typing Animation ----
const { typedLine1, typedLine2, typingPhase, showCursor } = useTypingAnimation()
</script>
<template>
  <main
    class="min-h-screen w-full overflow-x-hidden"
    :class="isDark ? 'bg-[#0D0D0D] text-slate-100' : 'bg-white text-gray-900'"
  >
    <!-- Navbar flutuante -->
    <div class="fixed top-3 right-0 left-0 z-100 flex justify-center px-4">
      <nav
        class="nav-bar w-full max-w-5xl overflow-hidden rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        :class="isDark ? 'nav-bar-dark' : 'nav-bar-light'"
      >
        <!-- Top accent line -->
        <div class="nav-top-accent h-px w-full" :class="isDark ? 'nav-top-accent-dark' : 'nav-top-accent-light'" />

        <div class="flex h-11 items-center justify-between px-5">
          <!-- Logo: terminal style -->
          <button
            class="group flex items-center gap-1 font-mono select-none focus:outline-none"
            @click="scrollToTop()"
          >
            <span class="text-xs text-emerald-600/70 dark:text-yellow-500/60 transition-colors group-hover:text-emerald-500 dark:group-hover:text-yellow-400"
              >&gt;_</span
            >
            <span class="ml-1 text-sm font-black tracking-tight text-gray-900 dark:text-white">
              lucas<span class="text-emerald-500 dark:text-yellow-400">X</span>
            </span>
            <span
              class="ml-0.5 inline-block h-3 w-[2px] animate-[blink_1.1s_step-end_infinite] bg-emerald-500 dark:bg-yellow-400 opacity-80"
            />
          </button>

          <!-- Desktop links (centered) -->
          <ul class="absolute left-1/2 hidden -translate-x-1/2 flex-nowrap items-center gap-0.5 md:flex">
            <li v-for="link in navLinks" :key="link.label">
              <button
                class="nav-link group relative rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-wider whitespace-nowrap transition-all duration-200 lg:px-3 lg:text-[11px]"
                :class="
                  !link.external && activeSection === link.href.replace('#', '')
                    ? 'nav-link-active text-emerald-600 dark:text-yellow-400'
                    : 'text-gray-2900 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-200'
                "
                @click="scrollToSection(link)"
              >
                <span
                  class="mr-0.5 transition-colors duration-200"
                  :class="
                    !link.external && activeSection === link.href.replace('#', '')
                      ? 'text-emerald-700 dark:text-yellow-600'
                      : 'text-gray-300 dark:text-slate-700 group-hover:text-emerald-600/50 dark:group-hover:text-yellow-600/50'
                  "
                  >//&nbsp;</span
                >{{ link.label.toLowerCase() }}
              </button>
            </li>
          </ul>

          <div class="flex items-center gap-2">
            <!-- theme toggle -->
            <button
              class="flex h-7 w-7 items-center justify-center rounded border border-gray-200 dark:border-white/10 text-gray-600 dark:text-slate-500 transition hover:border-emerald-400/40 hover:text-emerald-600 dark:hover:border-yellow-400/40 dark:hover:text-yellow-400 focus-visible:ring-2 focus-visible:ring-emerald-400/60 dark:focus-visible:ring-yellow-400/60 focus-visible:outline-none"
              aria-label="Alternar tema"
              @click="toggleDarkMode"
            >
              <svg
                v-if="isDark"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm10-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM5 12a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm14.364 6.95a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414ZM6.757 6.757a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 1 1 6.05 4.636l.707.707a1 1 0 0 1 0 1.414Zm12.607 0a1 1 0 0 1-1.414 0 1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707ZM6.757 17.243a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 14.5A8.5 8.5 0 1 1 9.5 3a.75.75 0 0 1 .89.97A7 7 0 0 0 20.03 13.6a.75.75 0 0 1 .97.9Z"
                />
              </svg>
            </button>

            <!-- Hamburger (mobile only) -->
            <button
              class="flex h-7 w-7 flex-col items-center justify-center gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:focus-visible:ring-yellow-400/70 md:hidden"
              :aria-expanded="isMenuOpen"
              aria-label="Abrir menu"
              @click="isMenuOpen = !isMenuOpen"
            >
              <span
                class="block h-px w-5 origin-center bg-gray-400 dark:bg-slate-400 transition-all duration-300"
                :class="isMenuOpen ? 'translate-y-[6px] rotate-45 bg-emerald-500 dark:bg-yellow-400' : ''"
              />
              <span
                class="block h-px w-5 bg-gray-400 dark:bg-slate-400 transition-all duration-300"
                :class="isMenuOpen ? 'opacity-0' : ''"
              />
              <span
                class="block h-px w-5 origin-center bg-gray-400 dark:bg-slate-400 transition-all duration-300"
                :class="isMenuOpen ? '-translate-y-[6px] -rotate-45 bg-emerald-500 dark:bg-yellow-400' : ''"
              />
            </button>
          </div>
        </div>

        <!-- Mobile dropdown -->
        <div
          class="overflow-hidden transition-all duration-300 md:hidden"
          :class="isMenuOpen ? 'max-h-80' : 'max-h-0'"
        >
          <ul class="flex flex-col border-t border-gray-100 dark:border-white/6 py-2 font-mono">
            <li v-for="link in navLinks" :key="link.label">
              <button
                class="w-full px-5 py-2 text-left text-xs tracking-wider transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:focus-visible:ring-yellow-400/70 focus-visible:outline-none"
                :class="
                  !link.external && activeSection === link.href.replace('#', '')
                    ? 'text-emerald-600 dark:text-yellow-400'
                    : 'text-gray-500 dark:text-slate-500 hover:text-gray-800 dark:hover:text-slate-200'
                "
                @click="scrollToSection(link)"
              >
                <span class="mr-0.5 text-gray-300 dark:text-slate-700">//&nbsp;</span>{{ link.label.toLowerCase() }}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- Hero / Bem vindo -->
    <section class="relative h-screen w-full overflow-hidden">
      <!-- Canvas: floating code tokens -->
      <canvas
        ref="heroCanvasRef"
        class="pointer-events-none absolute inset-0 h-full w-full select-none"
        aria-hidden="true"
      />

      <!-- Dot-grid overlay -->
      <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

      <!-- Radial glow -->
      <div
        class="pointer-events-none absolute inset-0"
        :style="isDark ? 'background: radial-gradient(ellipse 65% 55% at 62% 50%, rgba(234, 179, 8, 0.07) 0%, transparent 65%)' : 'background: radial-gradient(ellipse 65% 55% at 62% 50%, rgba(16, 185, 129, 0.07) 0%, transparent 65%)'"
        aria-hidden="true"
      />

      <!-- Content -->
      <div
        class="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-8 md:flex-row md:gap-16 md:px-24"
      >
        <!-- Left: Coding Image (desktop) -->
        <div class="hidden md:flex md:shrink-0 md:items-center md:justify-center">
          <div class="relative">
            <div
              class="absolute -inset-6 rounded-full opacity-25 blur-xl"
              :style="isDark ? 'background: radial-gradient(circle, #eab308 0%, transparent 70%)' : 'background: radial-gradient(circle, #10b981 0%, transparent 70%)'"
              aria-hidden="true"
            />
            <img
              src="/images/coding-image.png"
              alt="Ilustração de programação"
              class="relative w-60 opacity-90 drop-shadow-2xl transition-transform duration-300 hover:scale-[1.1] lg:w-65 xl:w-72"
              fetchpriority="high"
            />
          </div>
        </div>

        <!-- Right: Text block -->
        <div class="flex flex-col items-center gap-4 md:items-start">
          <!-- Badge "Full Stack Developer" -->
          <div
            class="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/8 dark:border-yellow-500/30 dark:bg-yellow-500/8 px-4 py-1.5 transition-all duration-700"
            :class="typingPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'"
          >
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-yellow-400" />
            <span class="text-xs font-semibold tracking-[0.2em] text-emerald-700 dark:text-yellow-300 uppercase"
              >Full Stack Developer</span
            >
          </div>

          <!-- Line 1: "Hello World!" (typing) -->
          <p
            class="text-sm font-bold tracking-[0.35em] text-gray-500 dark:text-slate-400 uppercase"
            style="font-family: 'Courier New', monospace; min-height: 1.5em"
          >
            {{ typedLine1
            }}<span v-if="typingPhase === 0 && showCursor" class="cursor text-emerald-500 dark:text-yellow-400">|</span>
          </p>

          <!-- Line 2: "Bem vindo(a)!" (typing, big) -->
          <p
            class="text-4xl font-black tracking-tight text-gray-900 dark:text-white transition-all duration-700 sm:text-5xl lg:text-6xl"
            :class="typingPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
            style="font-family: 'Courier New', monospace"
          >
            {{ typedLine2
            }}<span v-if="typingPhase === 1 && showCursor" class="cursor text-emerald-500 dark:text-yellow-400">|</span>
          </p>

          <!-- Name -->
          <p
            class="text-base font-semibold tracking-widest text-gray-700 dark:text-slate-300 transition-all delay-75 duration-700 sm:text-lg"
            :class="typingPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'"
          >
            Eu sou o <span class="font-black text-emerald-600 dark:text-yellow-400">Lucas Xavier</span>
          </p>

          <!-- Stack label -->
          <p
            class="text-sm tracking-wide text-gray-500 dark:text-slate-500 transition-all delay-100 duration-700 md:text-base"
            :class="typingPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'"
          >
            JS &nbsp;·&nbsp; TypeScript &nbsp;·&nbsp; Vue &nbsp;·&nbsp; NestJS &nbsp;·&nbsp; .NET
            &nbsp;·&nbsp; SQL
          </p>

          <!-- CTA buttons -->
          <div
            class="mt-2 flex flex-wrap gap-3 transition-all delay-200 duration-700"
            :class="typingPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'"
          >
            <button
              class="hero-btn-primary rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white dark:bg-yellow-500 dark:text-black transition-all duration-200 hover:bg-emerald-400 dark:hover:bg-yellow-400 active:scale-95"
              @click="scrollToSection({ label: 'Projetos', href: '#projects' })"
            >
              Ver Projetos
            </button>
            <button
              class="rounded-lg border border-gray-300 dark:border-white/20 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-300 transition-all duration-200 hover:border-gray-400 dark:hover:border-white/40 hover:text-gray-900 dark:hover:text-white active:scale-95"
              @click="scrollToSection({ label: 'Fale Comigo', href: '#contact' })"
            >
              Fale Comigo
            </button>
          </div>
        </div>

        <!-- Coding image (mobile only) -->
        <div class="mt-2 block md:hidden">
          <img
            src="/images/coding-image.png"
            alt="Ilustração de programação"
            class="w-50 opacity-80 drop-shadow-2xl transition-transform duration-300 hover:scale-[1.1]"
          />
        </div>
      </div>

      <!-- Scroll down -->
      <div
        class="absolute bottom-8 left-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-500"
        :class="typingPhase === 2 ? 'opacity-100' : 'opacity-0'"
        style="transform: translate3d(-50%, 0, 0)"
      >
        <span class="text-[10px] tracking-[0.25em] text-gray-400 dark:text-slate-600 uppercase">Role para baixo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 animate-bounce text-gray-400 dark:text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>

    <section
      id="about"
      class="relative z-[1] overflow-hidden px-4 py-12 sm:px-8 md:px-15 md:py-16 lg:py-20"
    >
      <!-- Dot-grid (same as hero) -->
      <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

      <!-- Radial glow: left side -->
      <div
        class="pointer-events-none absolute inset-0"
        :style="isDark ? 'background: radial-gradient(ellipse 55% 50% at 20% 55%, rgba(234, 179, 8, 0.06) 0%, transparent 65%)' : 'background: radial-gradient(ellipse 55% 50% at 20% 55%, rgba(16, 185, 129, 0.06) 0%, transparent 65%)'"
        aria-hidden="true"
      />

      <div
        class="relative mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-16"
      >
        <!-- Left: Photo -->
        <div class="shrink-0">
          <div class="group relative w-52 sm:w-64 md:w-72" style="aspect-ratio: 4/5">
            <!-- Glow ring behind photo -->
            <div
              class="absolute -inset-4 rounded-3xl opacity-20 blur-xl"
              :style="isDark ? 'background: radial-gradient(circle, #eab308 0%, transparent 70%)' : 'background: radial-gradient(circle, #10b981 0%, transparent 70%)'"
              aria-hidden="true"
            />
            <img
              src="/images/aboutme-photo.jpg"
              alt="Lucas Xavier na formatura"
              class="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-2xl ring-1 ring-gray-200 dark:ring-white/10 transition-[opacity,transform] duration-300 will-change-transform group-hover:scale-[1.02] group-hover:opacity-0"
            />
            <img
              src="/images/aboutme-photo-2.png"
              alt="Lucas Xavier"
              class="absolute inset-0 h-full w-full rounded-2xl object-cover object-top opacity-0 shadow-2xl ring-1 ring-gray-200 dark:ring-white/10 transition-[opacity,transform] duration-300 will-change-transform group-hover:scale-[1.02] group-hover:opacity-100"
            />
            <!-- Badge "Disponível" -->
            <div
              class="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-emerald-500/35 dark:border-yellow-500/30 bg-white dark:bg-[#0D0D0D] px-3 py-1 shadow-lg"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-yellow-400" />
              <span
                class="text-[10px] font-semibold tracking-[0.15em] whitespace-nowrap text-emerald-700 dark:text-yellow-300 uppercase"
                >Disponível</span
              >
            </div>
          </div>
        </div>

        <!-- Right: Content -->
        <div class="flex w-full flex-col gap-5">
          <!-- Label -->
          <p class="font-mono text-xs tracking-[0.3em] text-gray-400 dark:text-slate-600 uppercase">// sobre mim</p>

          <!-- Name heading -->
          <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Lucas <span class="text-emerald-600 dark:text-yellow-400">Xavier</span>
          </h2>

          <!-- Bio -->
          <p class="text-sm leading-relaxed text-gray-600 dark:text-slate-400 sm:text-base">
            Desenvolvedor Full Stack com experiência no ciclo completo de aplicações web — do
            levantamento de requisitos à entrega. Perfil proativo, com busca contínua por evolução
            técnica e soluções que agreguem eficiência real aos sistemas.
          </p>

          <!-- Terminal card -->
          <div
            class="about-terminal rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3 p-4 font-mono text-xs leading-relaxed sm:text-sm"
          >
            <!-- Terminal top bar -->
            <div class="mb-3 flex items-center gap-1.5">
              <span class="h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
              <span class="h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
              <span class="h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
              <span class="ml-2 text-[10px] tracking-wider text-gray-400 dark:text-slate-600">lucas.ts</span>
            </div>
            <!-- Code -->
            <p>
              <span class="text-purple-400">const</span> <span class="text-teal-600 dark:text-yellow-300">lucas</span>
              <span class="text-gray-500 dark:text-slate-400">=</span> <span class="text-gray-500 dark:text-slate-400">{</span>
            </p>
            <p class="pl-4">
              <span class="text-sky-400">role</span><span class="text-gray-500 dark:text-slate-400">:</span>
              <span class="text-green-400">'Full Stack Developer'</span
              ><span class="text-gray-500 dark:text-slate-400">,</span>
            </p>
            <p class="pl-4">
              <span class="text-sky-400">formação</span><span class="text-gray-500 dark:text-slate-400">:</span>
              <span class="text-green-400">'ADS – Análise e Desenvolvimento de Sistemas'</span
              ><span class="text-gray-500 dark:text-slate-400">,</span>
            </p>
            <p class="pl-4">
              <span class="text-sky-400">stack</span><span class="text-gray-500 dark:text-slate-400">:</span>
              <span class="text-gray-500 dark:text-slate-400">[</span><span class="text-green-400">'JS'</span
              ><span class="text-gray-500 dark:text-slate-400">,</span> <span class="text-green-400">'TypeScript'</span
              ><span class="text-gray-500 dark:text-slate-400">,</span> <span class="text-green-400">'Vue'</span
              ><span class="text-gray-500 dark:text-slate-400">,</span> <span class="text-green-400">'NestJS'</span
              ><span class="text-gray-500 dark:text-slate-400">,</span> <span class="text-green-400">'.NET'</span
              ><span class="text-gray-500 dark:text-slate-400">,</span> <span class="text-green-400">'SQL'</span
              ><span class="text-gray-500 dark:text-slate-400">],</span>
            </p>
            <p class="pl-4">
              <span class="text-sky-400">foco</span><span class="text-gray-500 dark:text-slate-400">:</span>
              <span class="text-green-400">'boas práticas &amp; qualidade de código'</span
              ><span class="text-gray-500 dark:text-slate-400">,</span>
            </p>
            <p class="pl-4">
              <span class="text-sky-400">disponível</span><span class="text-gray-500 dark:text-slate-400">:</span>
              <span class="text-emerald-600 dark:text-yellow-400">true</span><span class="text-gray-500 dark:text-slate-400">,</span>
            </p>
            <p><span class="text-gray-500 dark:text-slate-400">}</span></p>
          </div>

          <!-- Chips -->
          <div class="flex flex-wrap gap-2">
            <span :class="isDark? 'about-chip-dark' : 'about-chip'">Ciclo completo</span>
            <span :class="isDark? 'about-chip-dark' : 'about-chip'">Boas práticas</span>
            <span :class="isDark? 'about-chip-dark' : 'about-chip'">Trabalho em equipe</span>
            <span :class="isDark? 'about-chip-dark' : 'about-chip'">Perfil proativo</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Experiências -->
    <section
      id="experience"
      class="relative z-[1] overflow-hidden px-4 py-12 sm:px-6 md:px-10 md:py-16"
    >
      <!-- Dot-grid -->
      <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Glow right -->
      <div
        class="pointer-events-none absolute inset-0"
        :style="isDark ? 'background: radial-gradient(ellipse 50% 45% at 75% 40%, rgba(234, 179, 8, 0.06) 0%, transparent 65%)' : 'background: radial-gradient(ellipse 50% 45% at 75% 40%, rgba(16, 185, 129, 0.06) 0%, transparent 65%)'"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-4xl">
        <!-- Header -->
        <div class="mb-10 flex flex-col items-center gap-2">
          <p class="font-mono text-xs tracking-[0.3em] text-gray-400 dark:text-slate-600 uppercase">// experiencias</p>
          <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Onde eu <span class="text-emerald-600 dark:text-yellow-400">trabalhei</span>
          </h2>
        </div>

        <!-- Cards side by side on desktop, stacked on mobile -->
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <!-- PRODABEL -->
          <div
            class="exp-card group rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/2 p-6 transition-[border-color,background-color] duration-300 hover:border-emerald-500/25 dark:hover:border-yellow-500/20 hover:bg-gray-100 dark:hover:bg-white/3"
          >
            <!-- Header row -->
            <div class="mb-1 flex items-start justify-between gap-3">
              <div>
                <p class="text-[11px] font-semibold tracking-widest text-emerald-600/90 dark:text-yellow-500/80 uppercase">
                  Prodabel
                </p>
                <h3 class="mt-1 text-base leading-snug font-bold text-gray-900 dark:text-white">
                  Estagiário de Desenvolvimento
                </h3>
              </div>
              <span
                class="shrink-0 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/4 px-2.5 py-1 font-mono text-[10px] text-gray-500 dark:text-slate-500"
              >
                2024 – 2025
              </span>
            </div>
            <p class="mb-4 text-[11px] text-gray-400 dark:text-slate-600">Belo Horizonte, MG</p>

            <!-- Bullets -->
            <ul class="flex flex-col gap-2.5">
              <li class="flex gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/60 dark:bg-yellow-500/60" />
                Desenvolvimento de sistemas web modernos, participando de todo o ciclo — do código
                ao ambiente de produção.
              </li>
              <li class="flex gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/60 dark:bg-yellow-500/60" />
                Atuação em equipe multidisciplinar com metodologia ágil (Scrum), contribuindo em
                cerimônias e entregas.
              </li>
              <li class="flex gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/60 dark:bg-yellow-500/60" />
                Levantamento e validação de requisitos com stakeholders, traduzindo necessidades de
                negócio em soluções técnicas.
              </li>
            </ul>

            <!-- Stack -->
            <div class="mt-5 flex flex-wrap gap-1.5">
              <span
                v-for="tech in ['Vue.js', 'Node.js', 'TypeScript', 'NestJS', 'Oracle']"
                :key="tech"
                :class="isDark? 'about-chip-dark' : 'about-chip'"
                >{{ tech }}</span
              >
            </div>
          </div>

          <!-- CARDIESEL -->
          <div
            class="exp-card group rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/2 p-6 transition-[border-color,background-color] duration-300 hover:border-emerald-500/25 dark:hover:border-yellow-500/20 hover:bg-gray-100 dark:hover:bg-white/3"
          >
            <!-- Header row -->
            <div class="mb-1 flex items-start justify-between gap-3">
              <div>
                <p class="text-[11px] font-semibold tracking-widest text-gray-500 dark:text-slate-500 uppercase">
                  Cardiesel
                </p>
                <h3 class="mt-1 text-base leading-snug font-bold text-gray-900 dark:text-white">
                  Jovem Aprendiz — TI
                </h3>
                <p class="mt-0.5 text-[11px] text-gray-400 dark:text-slate-600">Concessionária Mercedes-Benz</p>
              </div>
              <span
                class="shrink-0 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/4 px-2.5 py-1 font-mono text-[10px] text-gray-500 dark:text-slate-500"
              >
                2022 – 2023
              </span>
            </div>
            <p class="mb-4 text-[11px] text-gray-400 dark:text-slate-600">Belo Horizonte, MG</p>

            <!-- Bullets -->
            <ul class="flex flex-col gap-2.5">
              <li class="flex gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300 dark:bg-white/25" />
                Participação na implantação de novo sistema interno, sendo ponto de contato entre
                equipe técnica e usuários finais.
              </li>
              <li class="flex gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300 dark:bg-white/25" />
                Suporte técnico e atendimento a colaboradores via Service Desk, auxiliando na
                resolução de problemas do dia a dia.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section
      id="skills"
      class="relative z-[1] overflow-hidden py-12 md:py-16"
    >
      <!-- Dot-grid -->
      <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Glow center -->
      <div
        class="pointer-events-none absolute inset-0"
        :style="isDark ? 'background: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(234, 179, 8, 0.05) 0%, transparent 65%)' : 'background: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 65%)'"
        aria-hidden="true"
      />

      <div class="relative px-4 sm:px-6">
        <!-- Header -->
        <div class="mb-12 flex flex-col items-center gap-2">
          <p class="font-mono text-xs tracking-[0.3em] text-gray-400 dark:text-slate-600 uppercase">
            // conhecimentos
          </p>
          <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Minha <span class="text-emerald-600 dark:text-yellow-400">Stack</span>
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-slate-500">Tecnologias que uso no dia a dia</p>
        </div>

        <!-- Mobile: Grid -->
        <div class="px-0 sm:hidden">
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="group flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3 p-3 text-center transition-all duration-300 active:scale-[1.03] active:border-emerald-500/30 dark:active:border-yellow-500/30"
              role="button"
              tabindex="0"
              :aria-label="`Destacar habilidade ${skill.name}`"
              @touchstart.passive="activateMobileSkill(skill.name)"
              @click="activateMobileSkill(skill.name)"
              @keydown.enter.prevent="activateMobileSkill(skill.name)"
              @keydown.space.prevent="activateMobileSkill(skill.name)"
            >
              <img
                :src="skill.icon"
                :alt="skill.name"
                class="h-10 w-10 object-contain transition-transform duration-300 ease-out group-active:scale-110"
                :class="mobileActiveSkill === skill.name ? 'scale-110' : ''"
                draggable="false"
              />
              <span class="text-xs leading-tight font-semibold text-gray-700 dark:text-slate-300">{{
                skill.name
              }}</span>
            </div>
          </div>
        </div>

        <!-- Carousel (sm+) -->
        <div
          ref="carouselTrackRef"
          class="hidden [touch-action:pan-y] gap-20 will-change-transform sm:flex"
          :style="{
            transform: `translateX(${carouselOffset}px)`,
            cursor: carouselIsDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
          }"
          @mousedown="onCarouselMouseDown"
          @touchstart.passive="onCarouselTouchStart"
          @touchmove.passive="onCarouselTouchMove"
          @touchend="onCarouselTouchEnd"
          @touchcancel="onCarouselTouchCancel"
        >
          <template v-for="set in 3" :key="set">
            <SkillCard v-for="skill in skills" :key="`${set}-${skill.name}`" :skill="skill" />
          </template>
        </div>
      </div>
    </section>

    <!-- Certificados -->
    <section
      id="certificates"
      class="relative z-[1] overflow-hidden px-4 pt-12 pb-16 sm:px-6 md:px-15 md:pt-16 md:pb-20"
    >
      <!-- Dot-grid -->
      <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Glow left -->
      <div
        class="pointer-events-none absolute inset-0"
        :style="isDark ? 'background: radial-gradient(ellipse 55% 45% at 20% 40%, rgba(234, 179, 8, 0.05) 0%, transparent 65%)' : 'background: radial-gradient(ellipse 55% 45% at 20% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 65%)'"
        aria-hidden="true"
      />

      <div class="relative mx-auto w-full max-w-7xl">
        <!-- Header -->
        <div class="mb-12 flex flex-col items-center gap-2">
          <p class="font-mono text-xs tracking-[0.3em] text-gray-400 dark:text-slate-600 uppercase">// certificados</p>
          <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Minhas <span class="text-emerald-600 dark:text-yellow-400">Certificações</span>
          </h2>
        </div>

        <!-- Linha 1: Destaques -->
        <div class="mb-8 ">
          <p class="mb-3 font-mono text-[10px] tracking-[0.25em] text-gray-400 dark:text-slate-600 uppercase text-center">
            ★ destaques acadêmicos
          </p>
          <!-- Gradient fade wrapper -->
          <div class="relative">
          <div
            ref="certCarouselRef"
            class="carousel -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2"
            style="justify-content: safe center; touch-action: pan-x pan-y;"
            :style="{ cursor: certIsDragging ? 'grabbing' : 'grab', userSelect: 'none' }"
            @mousedown="onCertMouseDownTrack"
            @mousemove="onCertMouseMoveTrack"
            @mouseup="onCertMouseUpTrack"
            @mouseleave="onCertMouseUpTrack"
            @scroll.passive="updateCertScrollState"
          >
          <div
            v-for="cert in featuredCertificates"
            :key="`feat-${cert.title}`"
            class="cert-inline-featured group relative flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-emerald-500/25 dark:border-yellow-500/20 bg-gray-50 dark:bg-white/3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/55 dark:hover:border-yellow-500/50"
          >
            <div class="pointer-events-none absolute top-2 left-2 z-10">
              <span
                class="inline-flex items-center gap-1 rounded-full border border-emerald-500/70 dark:border-yellow-400/60 bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 dark:text-yellow-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-2 w-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                Destaque
              </span>
            </div>
            <div class="aspect-[4/3] w-full overflow-hidden bg-gray-200 dark:bg-zinc-900">
              <img
                :src="cert.image"
                :alt="cert.title"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="flex flex-1 flex-col gap-1.5 p-2.5">
              <h3 class="line-clamp-2 text-[11px] leading-snug font-bold text-gray-900 dark:text-white">
                {{ cert.title }}
              </h3>
              <p class="line-clamp-3 flex-1 text-[10px] leading-relaxed text-gray-600 dark:text-slate-400">
                {{ cert.description }}
              </p>
              <a
                v-if="cert.link"
                :href="cert.link"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-1 inline-flex items-center gap-1 self-start rounded border border-emerald-500/40 dark:border-yellow-500/40 bg-emerald-500/8 dark:bg-yellow-500/8 px-2 py-1 text-[9px] font-semibold text-emerald-700 dark:text-yellow-400 transition-all duration-200 hover:border-emerald-500/60 dark:hover:border-yellow-500/60 hover:bg-emerald-500/15 dark:hover:bg-yellow-500/15 hover:text-emerald-800 dark:hover:text-yellow-300"
                @mousedown.stop
              >
                Ver certificado
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
          </div>
          </div>
          </div>
          <!-- Drag indicator row 1 -->
          <div
            v-if="cert1CanScroll"
            class="mt-3 flex items-center justify-center gap-2"
          >
            <span class="h-px w-8 bg-emerald-500/20 dark:bg-yellow-500/20" />
            <span class="flex items-center gap-1.5 rounded-full border border-emerald-500/25 dark:border-yellow-500/20 bg-emerald-500/6 dark:bg-yellow-500/6 px-3 py-1 text-[10px] font-medium text-emerald-600/70 dark:text-yellow-400/70">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 animate-[slide-left_1.4s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              arraste para ver mais
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 animate-[slide-right_1.4s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span class="h-px w-8 bg-emerald-500/20 dark:bg-yellow-500/20" />
          </div>
        </div>

        <!-- Linha 2: Demais certificados -->
        <div>
          <p class="mb-3 font-mono text-[10px] tracking-[0.25em] text-gray-400 dark:text-slate-600 uppercase text-center">
            // demais certificados
          </p>
          <!-- Gradient fade wrapper -->
          <div class="relative">
          <div
            ref="certCarousel2Ref"
            class="carousel -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2"
            style="justify-content: safe center; touch-action: pan-x pan-y;"
            :style="{ cursor: certIsDragging2 ? 'grabbing' : 'grab', userSelect: 'none' }"
            @mousedown="onCertMouseDownTrack2"
            @mousemove="onCertMouseMoveTrack2"
            @mouseup="onCertMouseUpTrack2"
            @mouseleave="onCertMouseUpTrack2"
            @scroll.passive="updateCertScrollState"
          >
          <!-- Alura -->
          <a
            v-for="cert in aluraCertificates"
            :key="`alura-${cert.title}`"
            :href="cert.link"
            target="_blank"
            rel="noopener noreferrer"
            class="cert-inline-alura group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/35"
            style="text-decoration: none"
            @mousedown.stop
          >
            <div class="relative aspect-[4/3] w-full overflow-hidden bg-gray-200 dark:bg-zinc-900">
              <div class="pointer-events-none absolute top-2 left-2 z-10">
                <span
                  class="inline-flex items-center gap-1 rounded-full border border-sky-400/60 bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-sky-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-2 w-2 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342m-7.482 0c.338-.134.68-.265 1.028-.391m-1.028.391a50.717 50.717 0 0 0-3.741 1.342m7.482 0a50.717 50.717 0 0 0 3.741 1.342"
                    />
                  </svg>
                  Alura
                </span>
              </div>
              <img
                :src="cert.image"
                :alt="cert.title"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="flex flex-1 flex-col gap-1.5 p-2.5">
              <h3 class="line-clamp-2 text-[11px] leading-snug font-bold text-gray-900 dark:text-white">
                {{ cert.title }}
              </h3>
              <p class="line-clamp-3 flex-1 text-[10px] leading-relaxed text-gray-600 dark:text-slate-400">
                {{ cert.description }}
              </p>
              <div
                class="mt-1 inline-flex items-center gap-1 self-start rounded border border-sky-500/30 bg-sky-500/8 px-2 py-1 text-[9px] font-semibold text-sky-400 transition-all duration-200 group-hover:border-sky-500/50 group-hover:bg-sky-500/15 group-hover:text-sky-300"
              >
                Ver certificado
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </div>
            </div>
          </a>
          </div>
          </div>
          <!-- Drag indicator row 2 -->
          <div
            v-if="cert2CanScroll"
            class="mt-3 flex items-center justify-center gap-2"
          >
            <span class="h-px w-8 bg-sky-500/20" />
            <span class="flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/6 px-3 py-1 text-[10px] font-medium text-sky-400/70">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 animate-[slide-left_1.4s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              arraste para ver mais
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 animate-[slide-right_1.4s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span class="h-px w-8 bg-sky-500/20" />
          </div>
        </div>
      </div>
    </section>

    <section
      id="projects"
      class="relative z-[1] overflow-hidden px-4 pt-12 pb-16 sm:px-6 md:px-15 md:pt-16 md:pb-20"
    >
      <!-- Dot-grid -->
      <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Glow right -->
      <div
        class="pointer-events-none absolute inset-0"
        :style="isDark ? 'background: radial-gradient(ellipse 55% 45% at 80% 30%, rgba(234, 179, 8, 0.05) 0%, transparent 65%)' : 'background: radial-gradient(ellipse 55% 45% at 80% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 65%)'"
        aria-hidden="true"
      />

      <div class="relative mx-auto w-full max-w-7xl">
        <!-- Header -->
        <div class="mb-12 flex flex-col items-center gap-2">
          <p class="font-mono text-xs tracking-[0.3em] text-gray-400 dark:text-slate-600 uppercase">// projetos</p>
          <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            O que eu <span class="text-emerald-600 dark:text-yellow-400">construí</span>
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-slate-500">Clique em um projeto para ver os detalhes</p>
        </div>

        <!-- Mobile: Carrossel horizontal (< sm) -->
        <div class="relative sm:hidden">
          <Transition
            enter-active-class="transition-all duration-400"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition-all duration-250"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-1 opacity-0"
          >
            <div
              v-if="showProjectsScrollHint"
              class="mb-4 flex items-center justify-center gap-2 text-xs font-semibold tracking-wide text-slate-500"
              aria-live="polite"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 animate-[slide-hint_1.1s_ease-in-out_infinite]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Arraste para ver mais
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 animate-[slide-hint_1.1s_ease-in-out_infinite]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Transition>

          <div
            ref="mobileProjectsRef"
            class="carousel -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
            @scroll.passive="onMobileProjectsScroll"
            @touchstart.passive="dismissProjectsScrollHint"
          >
            <div
              v-for="project in projects"
              :key="project.title"
              class="project-card flex w-[85%] shrink-0 cursor-pointer snap-start flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3"
              role="button"
              tabindex="0"
              @click="openModal(project)"
              @keydown.enter="openModal(project)"
              @keydown.space.prevent="openModal(project)"
            >
              <!-- Terminal bar -->
              <div class="flex items-center gap-1.5 border-b border-gray-200 dark:border-white/8 bg-gray-100 dark:bg-white/3 px-3 py-2">
                <span class="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/10" />
                <span class="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/10" />
                <span class="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/10" />
                <span class="ml-1 truncate font-mono text-[9px] tracking-wider text-gray-400 dark:text-slate-600"
                  >{{ project.title.toLowerCase().replace(/\s/g, '-') }}.ts</span
                >
              </div>
              <!-- Image 16:9 -->
              <div class="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-white/5">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="h-full w-full object-cover transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <!-- Content -->
              <div class="flex flex-1 flex-col gap-2 p-3">
                <h3 class="text-sm font-bold text-gray-900 dark:text-white">{{ project.title }}</h3>
                <p class="flex-1 text-xs leading-relaxed text-gray-600 dark:text-slate-400">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:border-yellow-500/20 dark:bg-yellow-500/8 dark:text-yellow-400"
                  >
                    {{ tech }}
                  </span>
                </div>
                <span class="mt-1 inline-flex items-center gap-1 text-xs font-medium text-sky-400">
                  Ver detalhes
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop: Grid (>= sm) -->
        <div class="hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <div
            v-for="project in paginatedProjects"
            :key="project.title"
            class="project-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-emerald-500/35 dark:hover:border-yellow-500/35"
            role="button"
            tabindex="0"
            @click="openModal(project)"
            @keydown.enter="openModal(project)"
            @keydown.space.prevent="openModal(project)"
          >
            <!-- Terminal bar -->
            <div class="flex items-center gap-1.5 border-b border-gray-200 dark:border-white/8 bg-gray-100 dark:bg-white/3 px-3 py-2">
              <span
                class="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/10 transition-colors duration-200 group-hover:bg-emerald-500/40 dark:group-hover:bg-yellow-500/40"
              />
              <span class="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/10" />
              <span class="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/10" />
              <span class="ml-1 truncate font-mono text-[9px] tracking-wider text-gray-400 dark:text-slate-600"
                >{{ project.title.toLowerCase().replace(/\s/g, '-') }}.ts</span
              >
            </div>
            <!-- Image 16:9 -->
            <div class="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-white/5">
              <img
                :src="project.image"
                :alt="project.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <!-- Content -->
            <div class="flex flex-1 flex-col gap-2 p-3">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">{{ project.title }}</h3>
              <p class="flex-1 text-xs leading-relaxed text-gray-600 dark:text-slate-400">{{ project.description }}</p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:border-yellow-500/20 dark:bg-yellow-500/8 dark:text-yellow-400"
                >
                  {{ tech }}
                </span>
              </div>
              <span
                class="mt-1 inline-flex items-center gap-1 text-xs font-medium text-sky-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                Ver detalhes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <!-- Paginação (desktop only) -->
        <ProjectsPagination
          v-if="totalPages > 1"
          class="mt-10 hidden sm:flex"
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:current-page="currentPage = $event"
        />
      </div>
    </section>

    <div
      v-if="selectedProject"
      class="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes do projeto"
        class="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-2xl sm:flex-row"
      >
        <!-- LEFT: Image panel -->
        <div class="relative flex aspect-square shrink-0 flex-col bg-zinc-900 sm:w-[42%]">
          <!-- Close button -->
          <button
            class="absolute top-3 right-3 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-slate-300 backdrop-blur-sm transition hover:border-yellow-400/70 hover:text-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-400/70 focus-visible:outline-none"
            aria-label="Fechar detalhes do projeto"
            @click="closeModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Main image viewer -->
          <div class="relative min-h-0 flex-1 overflow-hidden">
            <!-- Blurred bg fill -->
            <div
              class="absolute inset-0 scale-110 blur-lg"
              :style="{
                backgroundImage: `url(${modalImages[modalImageIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            />
            <div class="absolute inset-0 bg-black/50" />
            <img
              :src="modalImages[modalImageIndex]"
              :alt="selectedProject.title"
              class="relative z-10 h-full w-full object-contain transition-all duration-300"
            />
            <!-- Prev/Next arrows -->
            <template v-if="modalImages.length > 1">
              <button
                class="absolute top-1/2 left-2 z-30 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80 focus-visible:outline-none"
                aria-label="Imagem anterior"
                @click.stop="modalPrev"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                class="absolute top-1/2 right-2 z-30 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80 focus-visible:outline-none"
                aria-label="Próxima imagem"
                @click.stop="modalNext"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <!-- Dot indicators -->
              <div class="absolute right-0 bottom-2 left-0 z-30 flex justify-center gap-1.5">
                <button
                  v-for="(_, i) in modalImages"
                  :key="i"
                  class="h-1.5 rounded-full transition-all duration-200 focus-visible:outline-none"
                  :class="
                    i === modalImageIndex
                      ? 'w-4 bg-yellow-400'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  "
                  :aria-label="`Ir para imagem ${i + 1}`"
                  @click.stop="modalImageIndex = i"
                />
              </div>
            </template>
          </div>

          <!-- Thumbnail strip -->
          <div
            v-if="modalImages.length > 1"
            class="flex shrink-0 gap-1.5 overflow-x-auto bg-gray-200/80 dark:bg-zinc-900/80 p-2"
          >
            <button
              v-for="(img, i) in modalImages"
              :key="i"
              class="h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-gray-300 dark:bg-zinc-800 transition-all duration-200 focus-visible:outline-none"
              :class="
                i === modalImageIndex
                  ? 'border-yellow-400 opacity-100'
                  : 'border-gray-300 dark:border-white/10 opacity-50 hover:opacity-80'
              "
              :aria-label="`Visualizar imagem ${i + 1}`"
              @click="modalImageIndex = i"
            >
              <img :src="img" :alt="`Imagem ${i + 1}`" class="h-full w-full object-contain" />
            </button>
          </div>
        </div>

        <!-- RIGHT: Content + actions -->
        <div class="flex min-h-0 flex-1 flex-col overflow-hidden">
          <!-- Header: title + badges -->
          <div class="shrink-0 border-b border-gray-200 dark:border-white/10 px-5 pt-5 pb-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedProject.title }}</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-if="selectedProject.year"
                class="rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/10 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-slate-300"
              >
                {{ selectedProject.year }}
              </span>
              <span
                v-if="selectedProject.status"
                class="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400"
              >
                {{ selectedProject.status }}
              </span>
            </div>
          </div>

          <!-- Scrollable body -->
          <div class="flex flex-col gap-4 overflow-y-auto px-5 py-4">
            <!-- Description -->
            <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ selectedProject.longDescription ?? selectedProject.description }}
            </p>

            <!-- Highlights list -->
            <div v-if="selectedProject.highlights?.length">
              <h4 class="mb-3 text-xs font-semibold tracking-widest text-emerald-600 dark:text-yellow-500 uppercase">
                O que foi implementado
              </h4>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="item in selectedProject.highlights"
                  :key="item"
                  class="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-yellow-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- Tech stack -->
            <div>
              <h4 class="mb-3 text-xs font-semibold tracking-widest text-emerald-600 dark:text-yellow-500 uppercase">
                Stack utilizada
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in selectedProject.tech"
                  :key="tech"
                  class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-yellow-600/30 dark:bg-yellow-500/10 dark:text-yellow-300"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>

          <!-- Footer actions -->
          <footer
            class="flex shrink-0 items-center justify-between gap-3 border-t border-gray-200 dark:border-white/10 px-5 py-4"
          >
            <button
              class="rounded-lg border border-gray-300 dark:border-white/15 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 transition hover:border-gray-400 dark:hover:border-white/40 hover:text-gray-900 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:focus-visible:ring-yellow-400/70 focus-visible:outline-none"
              @click="closeModal"
            >
              Fechar
            </button>
            <div class="flex gap-2">
              <button
                v-if="selectedProject.liveLink"
                class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:outline-none"
                @click="openProjectLink(selectedProject.liveLink!)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Ver demo
              </button>
              <button
                class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:border-yellow-500/50 dark:bg-yellow-500/10 dark:text-yellow-300 transition hover:bg-emerald-500/20 dark:hover:bg-yellow-500/20 focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:focus-visible:ring-yellow-400/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="selectedProject.link === '#'"
                @click="openProjectLink(selectedProject.link)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
                  />
                </svg>
                Ver no GitHub
              </button>
            </div>
          </footer>
        </div>
      </section>
    </div>

    <!-- Fale Comigo -->
    <footer
      id="contact"
      class="relative z-[1] overflow-hidden px-4 pt-12 pb-0 sm:px-6 md:px-10 md:pt-16"
    >
      <!-- Dot-grid -->
      <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <!-- Glow left -->
      <!-- Glow left -->
      <div
        class="pointer-events-none absolute inset-0"
        :style="isDark ? 'background: radial-gradient(ellipse 50% 45% at 25% 40%, rgba(234, 179, 8, 0.06) 0%, transparent 65%)' : 'background: radial-gradient(ellipse 50% 45% at 25% 40%, rgba(16, 185, 129, 0.06) 0%, transparent 65%)'"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-4xl">
        <!-- Header -->
        <div class="mb-12 flex flex-col items-center gap-2">
          <p class="font-mono text-xs tracking-[0.3em] text-gray-400 dark:text-slate-600 uppercase">// contato</p>
          <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Fale <span class="text-emerald-600 dark:text-yellow-400">comigo</span>
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-slate-500">Aberto a novas oportunidades e colaborações</p>
        </div>

        <!-- Contact links -->
        <div class="flex flex-wrap items-stretch justify-center gap-4 sm:gap-5">
          <ContactLink :href="contactPhoneHref" :label="CONTACT.phoneLabel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
          </ContactLink>

          <ContactLink :href="contactEmailHref" :label="CONTACT.email">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </ContactLink>

          <ContactLink :href="CONTACT.github" :label="CONTACT.githubLabel" :external="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 transition-transform duration-200 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.303 24 12 24 5.373 18.627 0 12 0Z"
              />
            </svg>
          </ContactLink>

          <ContactLink :href="CONTACT.linkedin" :label="CONTACT.linkedinLabel" :external="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 transition-transform duration-200 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"
              />
            </svg>
          </ContactLink>
        </div>

        <!-- Bottom divider + copyright -->
        <div class="mt-16 border-t border-gray-200 dark:border-white/8 py-6">
          <p class="text-center font-mono text-[10px] tracking-widest text-gray-400 dark:text-slate-700">
            &copy; 2026 — <span class="text-gray-400 dark:text-slate-600">Lucas Bebiano Xavier</span>
          </p>
        </div>
      </div>
    </footer>
  </main>
</template>
<style scoped>
/* ─── Navbar ────────────────────────────── */
.nav-bar {
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.nav-bar-light {
  background: rgba(248, 250, 252, 0.92);
  border-color: rgba(0, 0, 0, 0.08);
  border-top-color: rgba(16, 185, 129, 0.3);
}

.nav-bar-dark {
  background: rgba(13, 13, 13, 0.85);
  border-color: rgba(255, 255, 255, 0.07);
  border-top-color: rgba(234, 179, 8, 0.18);
}

.nav-top-accent-light {
  background: linear-gradient(90deg, transparent 5%, rgba(16, 185, 129, 0.45) 50%, transparent 95%);
}

.nav-top-accent-dark {
  background: linear-gradient(90deg, transparent 5%, rgba(234, 179, 8, 0.35) 50%, transparent 95%);
}

.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: rgba(16, 185, 129, 0.6);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

:global(html.dark) .nav-link::after {
  background: rgba(234, 179, 8, 0.5);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link-active {
  background: rgba(16, 185, 129, 0.07);
}

:global(html.dark) .nav-link-active {
  background: rgba(234, 179, 8, 0.05);
}

.nav-link-active::after {
  transform: scaleX(1);
}

/* Hero background dot grid */
.hero-grid-overlay {
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
}

:global(html.dark) .hero-grid-overlay {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
}

/* Primary CTA glow on hover */
.hero-btn-primary:hover {
  box-shadow: 0 0 22px rgba(16, 185, 129, 0.5);
}

:global(html.dark) .hero-btn-primary:hover {
  box-shadow: 0 0 22px rgba(234, 179, 8, 0.45);
}

/* About section */
.about-terminal {
  backdrop-filter: blur(4px);
}

.about-chip {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(16, 185, 129, 0.3);
  background: rgba(16, 185, 129, 0.07);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #065f46;
  text-transform: uppercase;
}

.about-chip-dark {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(234, 179, 8, 0.2);
  background: rgba(234, 179, 8, 0.06);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #fde68a;
  text-transform: uppercase;
}


/* Project cards */
.project-card:hover {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(16, 185, 129, 0.25);
}

:global(html.dark) .project-card:hover {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(234, 179, 8, 0.15);
}

/* Certificate cards (inline section) */
.cert-inline-featured:hover {
  box-shadow:
    0 10px 28px rgba(16, 185, 129, 0.15),
    0 0 0 1px rgba(16, 185, 129, 0.28);
}

:global(html.dark) .cert-inline-featured:hover {
  box-shadow:
    0 10px 28px rgba(234, 179, 8, 0.15),
    0 0 0 1px rgba(234, 179, 8, 0.25);
}

.cert-inline-alura:hover {
  box-shadow:
    0 10px 28px rgba(14, 165, 233, 0.1),
    0 0 0 1px rgba(14, 165, 233, 0.2);
}

/* Experience timeline */
.exp-timeline-line {
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(234, 179, 8, 0.2) 15%,
    rgba(234, 179, 8, 0.2) 85%,
    transparent
  );
}

.exp-card {
  backdrop-filter: blur(4px);
}

.exp-card:hover {
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(16, 185, 129, 0.22);
}

:global(html.dark) .exp-card:hover {
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(234, 179, 8, 0.1);
}

.carousel {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.carousel::-webkit-scrollbar {
  display: none;
}
.cursor {
  display: inline-block;
  font-weight: 100;
  animation: blink 0.65s step-end infinite;
}
.blink-text {
  animation: blink-text 1.4s ease-in-out infinite;
}
@keyframes slide-hint {
  0%,
  100% {
    transform: translateX(0);
    opacity: 0.75;
  }
  50% {
    transform: translateX(3px);
    opacity: 1;
  }
}
@keyframes slide-left {
  0%,
  100% {
    transform: translateX(0);
    opacity: 0.6;
  }
  50% {
    transform: translateX(-3px);
    opacity: 1;
  }
}
@keyframes slide-right {
  0%,
  100% {
    transform: translateX(0);
    opacity: 0.6;
  }
  50% {
    transform: translateX(3px);
    opacity: 1;
  }
}
@keyframes blink-text {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
