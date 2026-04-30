<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
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

// ---- Tema ----
const { isDark, toggleDarkMode } = useDarkMode()
const isMenuOpen = ref(false)

// ---- Mobile skill highlight ----
const mobileActiveSkill = ref<string | null>(null)
let mobileActiveSkillTimer: ReturnType<typeof setTimeout> | null = null

// ---- Mobile projects scroll hint ----
// Breakpoint 640px = `sm` do Tailwind, mesmo ponto onde o grid desktop aparece.
const SCROLL_HINT_BREAKPOINT = 640
const mobileProjectsRef = ref<HTMLElement | null>(null)
const didDismissProjectsHint = ref(false)
const showProjectsScrollHint = ref(false)

type NavLink = {
  label: string
  href: string
  external?: boolean
}

// ---- Scroll spy + parallax ----
const { scrollY, activeSection, getParallaxTransform } = useScrollSpy()

// ---- Navegação ----
const navLinks: NavLink[] = [
  { label: 'Sobre Mim', href: '#about' },
  { label: 'Conhecimentos', href: '#skills' },
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
  // Auto-limpa o destaque após 700ms para simular hover em dispositivos touch.
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
  // Exibe a dica apenas se o overflow for perceptível (> 24px de conteúdo oculto).
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
  nextTick(updateProjectsScrollHint)
  window.addEventListener('resize', updateProjectsScrollHint, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateProjectsScrollHint)
  if (mobileActiveSkillTimer !== null) clearTimeout(mobileActiveSkillTimer)
})
// ---- Skills Carousel ----
// O componente declara o ref DOM e o passa ao composable — o componente controla
// os refs de template; o composable apenas os consome para calcular a largura do ciclo.
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

// ---- Projects Pagination ----
const ITEMS_PER_PAGE = 4
const currentPage = ref(0)
const totalPages = computed(() => Math.ceil(projects.length / ITEMS_PER_PAGE))
const paginatedProjects = computed(() =>
  projects.slice(currentPage.value * ITEMS_PER_PAGE, (currentPage.value + 1) * ITEMS_PER_PAGE),
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
  <main class="min-h-screen w-full overflow-x-hidden bg-[#0D0D0D] text-slate-100">
    <!-- Navbar flutuante -->
    <div class="fixed top-3 right-0 left-0 z-100 flex justify-center px-4">
      <nav
        class="w-full max-w-5xl rounded-xl border border-white/10 bg-black/50 px-6 shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        <div class="flex h-11 items-center justify-between">
          <!-- Logo -->
          <span
            class="cursor-pointer text-base font-black tracking-[0.35em] text-white uppercase select-none"
            @click="scrollToTop()"
          >
            LB<span class="text-yellow-500">.</span>
          </span>

          <!-- Desktop links (centered) -->
          <ul class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
            <li v-for="link in navLinks" :key="link.label">
              <button
                class="group relative py-1 text-xs font-semibold tracking-wider uppercase transition-colors duration-200"
                :class="
                  !link.external && activeSection === link.href.replace('#', '')
                    ? 'text-yellow-400'
                    : 'text-slate-300 hover:text-white'
                "
                @click="scrollToSection(link)"
              >
                {{ link.label }}
                <span
                  class="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-yellow-500 transition-transform duration-300 group-hover:scale-x-100"
                  :class="
                    !link.external && activeSection === link.href.replace('#', '')
                      ? 'scale-x-100'
                      : ''
                  "
                />
              </button>
            </li>
          </ul>

          <div class="flex items-center gap-2">
            <button
              class="hidden h-8 w-8 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-yellow-400/70 hover:text-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-400/70 focus-visible:outline-none"
              aria-label="Alternar tema"
              @click="toggleDarkMode"
            >
              <svg
                v-if="isDark"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
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
                class="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 14.5A8.5 8.5 0 1 1 9.5 3a.75.75 0 0 1 .89.97A7 7 0 0 0 20.03 13.6a.75.75 0 0 1 .97.9Z"
                />
              </svg>
            </button>

            <!-- Hamburger button (mobile only) -->
            <button
              class="flex h-7 w-7 flex-col items-center justify-center gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70 md:hidden"
              :aria-expanded="isMenuOpen"
              aria-label="Abrir menu"
              @click="isMenuOpen = !isMenuOpen"
            >
              <span
                class="block h-px w-5 origin-center bg-white transition-all duration-300"
                :class="isMenuOpen ? 'translate-y-[6px] rotate-45' : ''"
              />
              <span
                class="block h-px w-5 bg-white transition-all duration-300"
                :class="isMenuOpen ? 'opacity-0' : ''"
              />
              <span
                class="block h-px w-5 origin-center bg-white transition-all duration-300"
                :class="isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''"
              />
            </button>
          </div>
        </div>

        <!-- Mobile dropdown -->
        <div
          class="overflow-hidden transition-all duration-300 md:hidden"
          :class="isMenuOpen ? 'max-h-80' : 'max-h-0'"
        >
          <ul class="flex flex-col gap-0.5 border-t border-white/10 py-3">
            <li v-for="link in navLinks" :key="link.label">
              <button
                class="w-full py-2 text-left text-xs font-semibold tracking-wider uppercase transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-yellow-400/70 focus-visible:outline-none"
                :class="
                  !link.external && activeSection === link.href.replace('#', '')
                    ? 'text-yellow-400'
                    : 'text-slate-300 hover:text-white'
                "
                @click="scrollToSection(link)"
              >
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- Bem vindo -->
    <section class="relative h-screen w-full overflow-hidden">
      <!-- Background Image | Parallax -->
      <div
        class="absolute top-0 h-full w-[max(100%,1900px)]"
        style="left: calc((100% - max(100%, 1900px)) / 2)"
      >
        <!-- bg-1: 130% height + -15% top gives buffer so iOS overscroll never exposes gaps -->
        <img
          src="/images/bg-1.png"
          alt=""
          class="absolute inset-x-0 -top-[15%] z-10 h-[130%] w-full object-cover object-top"
          fetchpriority="high"
          loading="eager"
          :style="{ transform: getParallaxTransform(0.8), willChange: 'transform' }"
        />
        <img
          src="/images/bg-2.png"
          class="absolute bottom-15 left-0 z-20 w-full"
          loading="eager"
          :style="{ transform: getParallaxTransform(0.6), willChange: 'transform' }"
        />
        <img
          src="/images/jungle2.png"
          class="absolute bottom-40 left-0 z-30 w-full"
          loading="eager"
          :style="{ transform: getParallaxTransform(0.6), willChange: 'transform' }"
        />
        <img
          src="/images/jungle3.png"
          class="absolute bottom-15 left-0 z-40 w-full"
          loading="eager"
          :style="{ transform: getParallaxTransform(0.4), willChange: 'transform' }"
        />
        <img
          src="/images/jungle4.png"
          class="absolute bottom-8 left-0 z-50 w-full"
          loading="eager"
          :style="{ transform: getParallaxTransform(0.4), willChange: 'transform' }"
        />
        <img
          src="/images/man_on_mountain.png"
          class="absolute bottom-0 -left-20 z-70 w-full"
          loading="eager"
          style="transform: translate3d(0, 0, 0)"
        />
        <img
          src="/images/jungle5.png"
          class="absolute bottom-0 left-0 z-70 w-full"
          loading="eager"
          :style="{ transform: getParallaxTransform(0.01), willChange: 'transform' }"
        />
      </div>

      <!-- Main Text -->
      <div
        class="relative z-30 flex h-full flex-col items-center justify-center gap-4 px-10 md:flex-row md:gap-10 md:px-20"
        :style="{ transform: getParallaxTransform(0.9) }"
      >
        <!-- Left: Coding Image (desktop only) -->
        <div class="hidden md:mb-70 md:block">
          <img
            src="/images/coding-image.png"
            alt="Ilustração de programação"
            class="w-25 opacity-90 drop-shadow-2xl lg:w-36 xl:w-46"
          />
        </div>

        <!-- Right: Text -->
        <div class="flex flex-col items-start md:mb-70">
          <!-- Greeting -->
          <p
            class="text-md mb-2 font-bold tracking-[0.35em] text-white uppercase text-shadow-2xs"
            :class="typingPhase >= 2 ? 'blink-text' : ''"
            style="font-family: 'Courier New', monospace"
          >
            {{ typedLine1
            }}<span v-if="typingPhase === 0 && showCursor" class="cursor text-slate-300">|</span>
          </p>

          <!-- Bem vindo -->
          <p
            class="mt-2 text-2xl font-bold tracking-[0.2em] text-white transition-all duration-700 sm:text-3xl"
            :class="typingPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
            style="font-family: 'Courier New', monospace"
          >
            {{ typedLine2
            }}<span v-if="typingPhase === 1 && showCursor" class="cursor text-slate-300">|</span>
          </p>
        </div>

        <!-- Coding Image (mobile only, below text) -->
        <div class="mt-2 block md:hidden">
          <img
            src="/images/coding-image.png"
            alt="Ilustração de programação"
            class="w-24 opacity-90 drop-shadow-2xl"
          />
        </div>
      </div>

      <!-- Scroll down -->
      <div
        class="absolute bottom-25 left-1/2 z-65 flex flex-col items-center gap-2 transition-all duration-500"
        :class="typingPhase === 2 ? 'opacity-100' : 'opacity-0'"
        :style="{ transform: `translate3d(-50%, ${scrollY * 0.6}px, 0)` }"
      >
        <span class="text-xs tracking-[0.25em] text-slate-500 uppercase">Role para baixo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 animate-bounce text-slate-400"
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
      class="flex items-center justify-center px-4 py-14 sm:px-8 md:px-15 md:py-24 lg:py-32"
      style="background: linear-gradient(to bottom, #210002 0%, #0d0d0d 60%)"
    >
      <div
        class="mx-auto flex max-w-5xl flex-col items-center gap-14 md:flex-row md:items-center md:gap-20"
      >
        <!-- Left: Photo -->
        <div class="group relative w-56 shrink-0 sm:w-64 md:w-80" style="aspect-ratio: 4/5">
          <img
            src="/images/aboutme-photo.jpg"
            alt="Imagem do Lucas vestindo a beca em uma formatura"
            class="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-xl ring-1 shadow-black/50 ring-white/10 transition-all duration-200 group-hover:scale-101 group-hover:opacity-0"
          />
          <img
            src="/images/aboutme-photo-2.png"
            alt="Segunda foto do Lucas"
            class="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-xl ring-1 shadow-black/50 ring-white/10 opacity-0 transition-all duration-200 group-hover:scale-102 group-hover:opacity-100 object-top"
          />
        </div>

        <!-- Right: Sobre mim -->
        <div class="w-full">
          <h2
            class="mb-5 text-center text-2xl font-bold text-yellow-400 sm:text-3xl md:text-left md:text-4xl lg:text-5xl"
          >
            Sou o Lucas Bebiano,
          </h2>
          <p class="text-center text-base leading-relaxed text-slate-300 sm:text-lg md:text-left">
            Desenvolvedor Full Stack graduado em Análise e Desenvolvimento de Sistemas, com
            experiência no desenvolvimento e manutenção de aplicações web, atuando em todo o ciclo
            de vida, do levantamento de requisitos à entrega. Foco em boas práticas de
            desenvolvimento, qualidade de código e colaboração em equipe. Perfil proativo, com busca
            contínua por evolução técnica e adoção de soluções que agreguem eficiência aos sistemas.
          </p>
        </div>
      </div>
    </section>

    <section
      id="skills"
      class="overflow-hidden py-12 md:py-16 lg:py-20"
      style="
        background: linear-gradient(to bottom, #0d0d0d 0%, #18181b 25%, #18181b 85%, #0d0d0d 100%);
      "
    >
      <!-- Title -->
      <h2
        class="m-0 mb-10 p-0 text-center text-2xl font-bold text-yellow-400 sm:text-3xl md:text-4xl lg:text-5xl"
      >
        Conhecimentos
      </h2>

      <!-- Mobile: Grid -->
      <div class="px-4 sm:hidden">
        <p class="mb-4 text-center text-xs tracking-wide text-slate-500 dark:text-slate-400">
          Toque nos icones para destacar as tecnologias.
        </p>
        <div class="grid grid-cols-3 gap-3">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-all duration-300 active:scale-[1.03]"
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
            <span class="text-xs leading-tight font-semibold text-slate-200">{{ skill.name }}</span>
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

      <div class="mt-8 flex flex-col items-center justify-center gap-6">
        <hr class="w-24 border-slate-300 dark:border-white/20" />
        <a
          href="https://drive.google.com/drive/folders/12R09riJtxIafUOd8BM_FxmYydnODgxjG?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative inline-block font-medium text-yellow-400 transition-colors duration-300 hover:text-yellow-300"
        >
          <span class="flex items-center gap-1">
            Ver certificados
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <span
            class="absolute bottom-0 left-0 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"
          ></span>
        </a>
      </div>
    </section>

    <section
      id="projects"
      class="px-4 pt-12 pb-16 sm:px-6 md:px-15 md:pt-20 md:pb-24 lg:pb-28"
      style="background: #0d0d0d"
    >
      <div class="mx-auto w-full max-w-7xl">
        <!-- Title -->
        <h2 class="mb-12 text-center text-3xl font-bold text-yellow-400 sm:text-4xl md:text-5xl">
          Projetos
        </h2>

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
              class="mb-4 flex items-center justify-center gap-2 text-xs font-semibold tracking-wide text-slate-400"
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
              Arraste para o lado para ver mais projetos
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
            class="carousel -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4"
            @scroll.passive="onMobileProjectsScroll"
            @touchstart.passive="dismissProjectsScrollHint"
          >
            <div
              v-for="project in projects"
              :key="project.title"
              class="flex w-[82%] shrink-0 cursor-pointer snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm"
              role="button"
              tabindex="0"
              @click="openModal(project)"
              @keydown.enter="openModal(project)"
              @keydown.space.prevent="openModal(project)"
            >
              <!-- Imagem -->
              <div class="aspect-square w-full overflow-hidden bg-white/5">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <!-- Conteúdo -->
              <div class="flex flex-1 flex-col gap-2 p-3">
                <h3 class="text-sm font-bold text-white">{{ project.title }}</h3>
                <p class="flex-1 text-xs leading-relaxed text-slate-400">
                  {{ project.description }}
                </p>

                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="rounded-full border border-yellow-700/20 px-2 py-0.5 text-[10px] font-medium text-yellow-400"
                  >
                    {{ tech }}
                  </span>
                </div>

                <span
                  class="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-blue-400"
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
        </div>

        <!-- Desktop: Grid (>= sm) -->
        <div class="hidden sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <div
            v-for="project in paginatedProjects"
            :key="project.title"
            class="flex cursor-pointer flex-col overflow-hidden border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40 hover:shadow-yellow-500/10"
            :style="{ borderRadius: '5px 5px 20px 5px' }"
            role="button"
            tabindex="0"
            @click="openModal(project)"
            @keydown.enter="openModal(project)"
            @keydown.space.prevent="openModal(project)"
          >
            <!-- Imagem -->
            <div class="aspect-square w-full overflow-hidden bg-white/5">
              <img
                :src="project.image"
                :alt="project.title"
                class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>

            <!-- Conteúdo -->
            <div class="flex flex-1 flex-col gap-2 p-3">
              <h3 class="text-sm font-bold text-white">{{ project.title }}</h3>
              <p class="flex-1 text-xs leading-relaxed text-slate-400">{{ project.description }}</p>

              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="rounded-full border border-yellow-200/70 bg-yellow-500/20 px-2 py-0.5 text-[10px] font-medium text-white/90"
                >
                  {{ tech }}
                </span>
              </div>

              <span class="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-blue-400">
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
        class="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl sm:flex-row"
      >
        <!-- LEFT: Image panel -->
        <div class="relative flex h-56 shrink-0 flex-col bg-zinc-900 sm:h-auto sm:w-[42%]">
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
            class="flex shrink-0 gap-1.5 overflow-x-auto bg-zinc-900/80 p-2"
          >
            <button
              v-for="(img, i) in modalImages"
              :key="i"
              class="h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-zinc-800 transition-all duration-200 focus-visible:outline-none"
              :class="
                i === modalImageIndex
                  ? 'border-yellow-400 opacity-100'
                  : 'border-white/10 opacity-50 hover:opacity-80'
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
          <div class="shrink-0 border-b border-white/10 px-5 pt-5 pb-4">
            <h3 class="text-xl font-bold text-white">{{ selectedProject.title }}</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-if="selectedProject.year"
                class="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-slate-300"
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
            <p class="text-sm leading-relaxed text-slate-300">
              {{ selectedProject.longDescription ?? selectedProject.description }}
            </p>

            <!-- Highlights list -->
            <div v-if="selectedProject.highlights?.length">
              <h4 class="mb-3 text-xs font-semibold tracking-widest text-yellow-500 uppercase">
                O que foi implementado
              </h4>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="item in selectedProject.highlights"
                  :key="item"
                  class="flex items-start gap-2 text-sm text-slate-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-0.5 h-4 w-4 shrink-0 text-yellow-400"
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
              <h4 class="mb-3 text-xs font-semibold tracking-widest text-yellow-500 uppercase">
                Stack utilizada
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in selectedProject.tech"
                  :key="tech"
                  class="rounded-full border border-yellow-600/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>

          <!-- Footer actions -->
          <footer
            class="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 px-5 py-4"
          >
            <button
              class="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-white/40 hover:text-white focus-visible:ring-2 focus-visible:ring-yellow-400/70 focus-visible:outline-none"
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
                class="inline-flex items-center gap-1.5 rounded-lg border border-yellow-500/50 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/20 focus-visible:ring-2 focus-visible:ring-yellow-400/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
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
      class="px-4 pt-12 pb-0 sm:px-6 md:px-10 md:pt-16 lg:pt-20"
      style="background: #18181b"
    >
      <div class="mx-auto max-w-4xl">
        <!-- Title -->
        <h2 class="mb-12 text-center text-2xl font-bold text-yellow-400 sm:text-3xl md:text-4xl">
          Fale comigo
        </h2>

        <!-- Contact links row -->
        <div class="flex flex-wrap items-start justify-center gap-10 sm:gap-16">
          <!-- Phone -->
          <ContactLink :href="contactPhoneHref" :label="CONTACT.phoneLabel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
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

          <!-- Email -->
          <ContactLink :href="contactEmailHref" :label="CONTACT.email">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
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

          <!-- GitHub -->
          <ContactLink :href="CONTACT.github" :label="CONTACT.githubLabel" :external="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.303 24 12 24 5.373 18.627 0 12 0Z"
              />
            </svg>
          </ContactLink>

          <!-- LinkedIn -->
          <ContactLink :href="CONTACT.linkedin" :label="CONTACT.linkedinLabel" :external="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
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
        <div class="mt-8 border-t border-white/10 py-6">
          <p class="text-center text-xs text-slate-600">@2026 - Lucas Bebiano</p>
        </div>
      </div>
    </footer>
  </main>
</template>
<style scoped>
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
