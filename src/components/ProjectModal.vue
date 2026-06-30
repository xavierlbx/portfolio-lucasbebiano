<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '../data/projects'

const props = defineProps<{
  project: Project
  images: string[]
  imageIndex: number
  showGallery: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'prev'): void
  (e: 'next'): void
  (e: 'set-image', index: number): void
  (e: 'open-link', link: string): void
  (e: 'open-gallery'): void
  (e: 'close-gallery'): void
}>()

// Resolves the effective device type for the current image.
// When project.device is 'both', falls back to imageDevices[index], then 'desktop'.
const currentImageDevice = computed<'desktop' | 'mobile'>(() => {
  if (props.project.device !== 'both') return props.project.device
  return props.project.imageDevices?.[props.imageIndex] ?? 'desktop'
})

// Touch/swipe support for gallery
const touchStartX = ref(0)
const touchStartY = ref(0)

const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0]?.clientX ?? 0
  touchStartY.value = e.changedTouches[0]?.clientY ?? 0
}

const onTouchEnd = (e: TouchEvent) => {
  const endX = e.changedTouches[0]?.clientX ?? touchStartX.value
  const endY = e.changedTouches[0]?.clientY ?? touchStartY.value
  const deltaX = touchStartX.value - endX
  const deltaY = Math.abs(touchStartY.value - endY)
  // Only treat as horizontal swipe if X movement dominates
  if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > deltaY) {
    if (deltaX > 0) emit('next')
    else emit('prev')
  }
}

</script>

<template>
  <!-- ── MODAL BACKDROP ─────────────────────────────────────────────────── -->
  <div
    class="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <section
      role="dialog"
      aria-modal="true"
      aria-label="Detalhes do projeto"
      class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-2xl"
    >
      <!-- HEADER: title + badges + close -->
      <div class="relative shrink-0 border-b border-gray-200 dark:border-white/10 px-5 pt-5 pb-4">
        <button
          class="absolute top-4 right-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-slate-400 transition hover:border-yellow-400/70 dark:hover:border-yellow-400/70 hover:text-gray-900 dark:hover:text-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-400/70 focus-visible:outline-none"
          aria-label="Fechar detalhes do projeto"
          @click="emit('close')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 class="pr-10 text-xl font-bold text-gray-900 dark:text-white">{{ project.title }}</h3>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-if="project.year"
            class="rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/10 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-slate-300"
          >
            {{ project.year }}
          </span>
          <span
            v-if="project.status"
            class="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400"
          >
            {{ project.status }}
          </span>
          <!-- Device badge -->
          <span
            v-if="project.device === 'mobile'"
            class="rounded-full border border-sky-500/40 bg-sky-500/10 px-2.5 py-0.5 text-xs font-semibold text-sky-400"
          >
            📱 Mobile
          </span>
          <span
            v-else-if="project.device === 'desktop'"
            class="rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-400"
          >
            🖥️ Desktop
          </span>
          <template v-else>
            <span class="rounded-full border border-sky-500/40 bg-sky-500/10 px-2.5 py-0.5 text-xs font-semibold text-sky-400">
              📱 Mobile
            </span>
            <span class="rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-400">
              🖥️ Web
            </span>
          </template>
        </div>
      </div>

      <!-- SCROLLABLE BODY -->
      <div class="flex flex-col gap-4 overflow-y-auto px-5 py-4">

        <!-- ── GALLERY CTA CARD ─────────────────────────────────────────── -->
        <div
          v-if="images.length > 0"
          class="gallery-cta group relative block min-h-[9.5rem] w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70"
          role="button"
          tabindex="0"
          :class="{
            'border-sky-500/40 hover:border-sky-400/80': project.device === 'mobile',
            'border-violet-500/40 hover:border-violet-400/80': project.device === 'desktop',
            'border-emerald-500/40 hover:border-emerald-400/80': project.device === 'both',
          }"
          @click="emit('open-gallery')"
          @keydown.enter="emit('open-gallery')"
          @keydown.space.prevent="emit('open-gallery')"
        >
          <!-- Animated gradient bg -->
          <div
            class="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-60"
            :class="{
              'bg-gradient-to-br from-sky-500/20 via-cyan-500/10 to-transparent': project.device === 'mobile',
              'bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-transparent': project.device === 'desktop',
              'bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent': project.device === 'both',
            }"
          />

          <!-- Top row: icon + text + arrow -->
          <div class="relative flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
            <!-- Device icon(s) -->
            <div class="flex shrink-0 items-center">
              <!-- Mobile only -->
              <div
                v-if="project.device === 'mobile'"
                class="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/40 bg-sky-500/15 transition-transform duration-300 group-hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <rect x="5" y="2" width="14" height="20" rx="3" />
                  <circle cx="12" cy="18.5" r="0.5" fill="currentColor" />
                  <line x1="9" y1="5.5" x2="15" y2="5.5" stroke-linecap="round" />
                </svg>
              </div>
              <!-- Desktop only -->
              <div
                v-else-if="project.device === 'desktop'"
                class="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/40 bg-violet-500/15 transition-transform duration-300 group-hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path stroke-linecap="round" d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <!-- Both -->
              <div v-else class="flex items-center transition-transform duration-300 group-hover:scale-110">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/40 bg-violet-500/15">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path stroke-linecap="round" d="M8 21h8M12 17v4" />
                  </svg>
                </div>
                <div class="-ml-2 flex h-9 w-9 items-center justify-center rounded-xl border border-sky-500/40 bg-sky-500/15">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <rect x="5" y="2" width="14" height="20" rx="3" />
                    <circle cx="12" cy="18.5" r="0.5" fill="currentColor" />
                    <line x1="9" y1="5.5" x2="15" y2="5.5" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Text content -->
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-sm font-bold text-gray-900 dark:text-white">Ver galeria de telas</span>
                <span
                  class="inline-flex animate-pulse items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  :class="{
                    'bg-sky-500/20 text-sky-300': project.device === 'mobile',
                    'bg-violet-500/20 text-violet-300': project.device === 'desktop',
                    'bg-emerald-500/20 text-emerald-300': project.device === 'both',
                  }"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="{
                      'bg-sky-400': project.device === 'mobile',
                      'bg-violet-400': project.device === 'desktop',
                      'bg-emerald-400': project.device === 'both',
                    }"
                  />
                  {{ images.length }} tela{{ images.length !== 1 ? 's' : '' }}
                </span>
              </div>
              <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                <template v-if="project.device === 'mobile'">Prints do app exibidos sem corte</template>
                <template v-else-if="project.device === 'desktop'">Capturas do sistema exibidas sem corte</template>
                <template v-else>Telas web e mobile exibidas em sua proporção original</template>
              </p>
            </div>

            <!-- Arrow -->
            <div class="flex shrink-0 items-center transition-all duration-300 group-hover:translate-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          <!-- Thumbnail strip preview -->
          <div class="relative flex min-h-[4.25rem] gap-1.5 px-4 pb-3.5 sm:min-h-[4.75rem] sm:px-5 sm:pb-4">
            <template v-for="(img, i) in images.slice(0, 4)" :key="i">
              <div
                v-if="i < 3"
                class="relative overflow-hidden rounded-md border border-white/10 bg-zinc-800"
                :class="[
                  // When 'both': use imageDevices for individual aspect, fallback to a square
                  project.device === 'both'
                    ? (project.imageDevices?.[i] === 'mobile' ? 'h-[4.25rem] w-10 sm:h-[4.75rem] sm:w-11' : 'min-h-[4.25rem] flex-1 sm:min-h-[4.75rem]')
                    : project.device === 'mobile'
                      ? 'h-[4.25rem] w-10 sm:h-[4.75rem] sm:w-11'
                      : 'min-h-[4.25rem] flex-1 sm:min-h-[4.75rem]',
                ]"
              >
                <img :src="img" :alt="`Preview ${i + 1}`" class="h-full w-full object-contain opacity-80 transition-opacity group-hover:opacity-100" loading="lazy" decoding="async" />
              </div>
            </template>
            <div
              v-if="images.length > 3"
              class="flex items-center justify-center rounded-md border border-white/10 bg-zinc-900/80 text-xs font-bold text-slate-400"
              :class="
                project.device === 'mobile' || project.imageDevices?.[3] === 'mobile'
                  ? 'h-[4.25rem] w-10 sm:h-[4.75rem] sm:w-11'
                  : 'min-h-[4.25rem] flex-1 sm:min-h-[4.75rem]'
              "
            >
              +{{ images.length - 3 }}
            </div>
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
          {{ project.longDescription ?? project.description }}
        </p>

        <!-- Highlights -->
        <div v-if="project.highlights?.length">
          <h4 class="mb-3 text-xs font-semibold tracking-widest text-emerald-600 dark:text-yellow-500 uppercase">
            O que foi implementado
          </h4>
          <ul class="flex flex-col gap-2">
            <li v-for="item in project.highlights" :key="item" class="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
              v-for="tech in project.tech"
              :key="tech"
              class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-yellow-600/30 dark:bg-yellow-500/10 dark:text-yellow-300"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <!-- FOOTER ACTIONS -->
      <footer class="flex shrink-0 flex-col gap-3 border-t border-gray-200 dark:border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          class="rounded-lg border border-gray-300 dark:border-white/15 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 transition hover:border-gray-400 dark:hover:border-white/40 hover:text-gray-900 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:focus-visible:ring-yellow-400/70 focus-visible:outline-none"
          @click="emit('close')"
        >
          Fechar
        </button>
        <div class="flex gap-2">
          <button
            v-if="project.liveLink"
            class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:outline-none"
            @click="emit('open-link', project.liveLink!)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Ver demo
          </button>
          <button
            class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:border-yellow-500/50 dark:bg-yellow-500/10 dark:text-yellow-300 transition hover:bg-emerald-500/20 dark:hover:bg-yellow-500/20 focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:focus-visible:ring-yellow-400/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="project.link === '#'"
            @click="emit('open-link', project.link)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            Ver no GitHub
          </button>
        </div>
      </footer>
    </section>
  </div>

  <!-- ── GALLERY LIGHTBOX (Teleport to body) ───────────────────────────── -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-[0.98]"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-[0.98]"
    >
      <div
        v-if="showGallery"
        class="gallery-lightbox fixed inset-0 z-[200] flex flex-col overflow-hidden bg-black/95 backdrop-blur-md"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <!-- ── TOP BAR ── -->
        <div class="flex shrink-0 items-center justify-between gap-4 border-b border-white/5 px-4 py-3 sm:px-6">
          <div class="flex items-center gap-3">
            <!-- Dynamic device icon for current image -->
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
              :class="currentImageDevice === 'mobile' ? 'border-sky-500/40 bg-sky-500/15' : 'border-violet-500/40 bg-violet-500/15'"
            >
              <svg v-if="currentImageDevice === 'mobile'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <circle cx="12" cy="18.5" r="0.5" fill="currentColor" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path stroke-linecap="round" d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <div class="min-w-0">
              <p class="truncate text-sm font-bold text-white leading-tight">{{ project.title }}</p>
              <p class="text-[11px] text-slate-500">{{ imageIndex + 1 }} / {{ images.length }}</p>
            </div>
          </div>
          <button
            class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8 text-slate-400 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Fechar galeria"
            @click="emit('close-gallery')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- ── MAIN DISPLAY AREA ── -->
        <div class="gallery-main relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">

          <!-- Prev button -->
          <button
            v-if="images.length > 1"
            class="absolute left-2 z-20 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-none sm:left-3"
            aria-label="Imagem anterior"
            @click.stop="emit('prev')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- ── IMAGE DISPLAY ── -->
          <div class="flex h-full w-full items-center justify-center px-14 py-4 sm:px-16">
            <img
              :src="images[imageIndex]"
              :alt="project.title"
              class="max-h-full max-w-full object-contain"
            />
          </div>

          <!-- Next button -->
          <button
            v-if="images.length > 1"
            class="absolute right-2 z-20 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-none sm:right-3"
            aria-label="Próxima imagem"
            @click.stop="emit('next')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- ── BOTTOM NAVIGATION ── always visible, adapts by breakpoint -->
        <div
          v-if="images.length > 1"
          class="gallery-nav shrink-0 border-t border-white/5 px-4 py-3 sm:px-6 sm:py-3"
          @click.stop
        >
          <!-- Dot indicators: visible on all screens, hidden on sm+ in favor of thumbnails -->
          <div class="flex items-center justify-center gap-2 sm:hidden">
            <button
              v-for="(_, i) in images"
              :key="i"
              class="rounded-full transition-all duration-200 focus-visible:outline-none"
              :class="i === imageIndex ? 'h-2.5 w-7 bg-white' : 'h-2.5 w-2.5 bg-white/30 hover:bg-white/60'"
              :aria-label="`Ir para tela ${i + 1}`"
              @click="emit('set-image', i)"
            />
          </div>

          <!-- Thumbnail strip: sm+ only -->
          <div class="hidden items-center justify-center gap-2 overflow-x-auto sm:flex">
            <button
              v-for="(img, i) in images"
              :key="i"
              class="shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 focus-visible:outline-none"
              :class="[
                // Per-image device for 'both' projects, otherwise use project.device
                (project.device === 'both' ? (project.imageDevices?.[i] ?? 'desktop') : project.device) === 'mobile'
                  ? 'h-16 w-8'
                  : 'h-12 w-20',
                i === imageIndex
                  ? ((project.device === 'both' ? (project.imageDevices?.[i] ?? 'desktop') : project.device) === 'mobile'
                      ? 'border-sky-400 opacity-100 scale-105'
                      : 'border-violet-400 opacity-100 scale-105')
                  : 'border-white/10 opacity-40 hover:opacity-75 hover:border-white/20',
              ]"
              :aria-label="`Ver tela ${i + 1}`"
              @click="emit('set-image', i)"
            >
              <img :src="img" :alt="`Tela ${i + 1}`" class="h-full w-full object-contain" loading="lazy" decoding="async" />
            </button>
          </div>

          <!-- Swipe hint: only on mobile when there are multiple images -->
          <p class="mt-2 text-center text-[10px] text-white/25 sm:hidden">
            Deslize para navegar
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

