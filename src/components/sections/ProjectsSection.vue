<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useDarkMode } from '../../composables/useDarkMode'
import { projects } from '../../data/projects'
import type { Project } from '../../data/projects'
import ProjectCard from '../ProjectCard.vue'
import ProjectsPagination from '../ProjectsPagination.vue'
import { debounce } from '../../utils/debounce'

const { isDark } = useDarkMode()

const emit = defineEmits<{
  (e: 'open-modal', project: Project): void
}>()

// ---- Mobile scroll hint ----
// Aligned to md (768px) to match the nav/grid breakpoint
const SCROLL_HINT_BREAKPOINT = 768
const mobileProjectsRef = ref<HTMLElement | null>(null)
const didDismissHint = ref(false)
const showScrollHint = ref(false)

const updateScrollHint = () => {
  const el = mobileProjectsRef.value
  if (!el || didDismissHint.value || window.innerWidth >= SCROLL_HINT_BREAKPOINT) {
    showScrollHint.value = false
    return
  }
  showScrollHint.value = el.scrollWidth - el.clientWidth > 24
}

const dismissScrollHint = () => {
  didDismissHint.value = true
  showScrollHint.value = false
}

const onMobileScroll = () => {
  const el = mobileProjectsRef.value
  if (el && el.scrollLeft > 16) dismissScrollHint()
}

const debouncedResize = debounce(updateScrollHint, 150)

onMounted(() => {
  nextTick(updateScrollHint)
  window.addEventListener('resize', debouncedResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedResize)
})

// ---- Pagination (desktop only) ----
const ITEMS_PER_PAGE = 4
const currentPage = ref(0)
const totalPages = computed(() => Math.ceil(projects.length / ITEMS_PER_PAGE))
const paginatedProjects = computed(() =>
  projects.slice(currentPage.value * ITEMS_PER_PAGE, (currentPage.value + 1) * ITEMS_PER_PAGE),
)
</script>

<template>
  <section
    id="projects"
    class="relative z-[1] overflow-hidden px-4 pt-12 pb-16 sm:px-6 md:px-[3.75rem] md:pt-16 md:pb-20"
  >
    <!-- Dot-grid -->
    <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

    <!-- Radial glow: right -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="
        isDark
          ? 'background: radial-gradient(ellipse 55% 45% at 80% 30%, rgba(234, 179, 8, 0.05) 0%, transparent 65%)'
          : 'background: radial-gradient(ellipse 55% 45% at 80% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 65%)'
      "
      aria-hidden="true"
    />

    <div class="relative mx-auto w-full max-w-7xl">
      <!-- Header -->
      <div class="mb-12 flex flex-col items-center gap-2">
        <p class="font-mono text-xs tracking-[0.3em] text-slate-500 dark:text-slate-600 uppercase">
          // projetos
        </p>
        <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          O que eu <span class="text-emerald-600 dark:text-yellow-400">construí</span>
        </h2>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-500">
          Clique em um projeto para ver os detalhes
        </p>
      </div>

      <!-- Mobile: horizontal carousel (below md, aligned with nav breakpoint) -->
      <div class="relative md:hidden">
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="-translate-y-1 opacity-0"
        >
          <div
            v-if="showScrollHint"
            class="mb-4 flex items-center justify-center gap-2 text-xs font-semibold tracking-wide text-slate-600"
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
          @scroll.passive="onMobileScroll"
          @touchstart.passive="dismissScrollHint"
        >
          <div
            v-for="project in projects"
            :key="project.title"
            class="project-card flex w-[85%] shrink-0 cursor-pointer snap-start flex-col overflow-hidden rounded-2xl border border-stone-300 dark:border-white/8 bg-stone-50 dark:bg-white/3"
            role="button"
            tabindex="0"
            @click="emit('open-modal', project)"
            @keydown.enter="emit('open-modal', project)"
            @keydown.space.prevent="emit('open-modal', project)"
          >
            <ProjectCard :project="project" variant="mobile" />
          </div>
        </div>
      </div>

      <!-- Desktop: paginated grid (md+) -->
      <div class="hidden md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        <div
          v-for="project in paginatedProjects"
          :key="project.title"
          class="project-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-stone-300 dark:border-white/8 bg-stone-50 dark:bg-white/3 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-emerald-600/40 dark:hover:border-yellow-500/35"
          role="button"
          tabindex="0"
          @click="emit('open-modal', project)"
          @keydown.enter="emit('open-modal', project)"
          @keydown.space.prevent="emit('open-modal', project)"
        >
          <ProjectCard :project="project" variant="desktop" />
        </div>
      </div>

      <!-- Pagination (desktop only) -->
      <ProjectsPagination
        v-if="totalPages > 1"
        class="mt-10 hidden md:flex"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="currentPage = $event"
      />
    </div>
  </section>
</template>

<style scoped>
.project-card:hover {
  box-shadow:
    0 12px 34px rgba(15, 23, 42, 0.12),
    0 0 0 1px rgba(5, 150, 105, 0.28);
}

:global(html.dark) .project-card:hover {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(234, 179, 8, 0.15);
}
</style>
