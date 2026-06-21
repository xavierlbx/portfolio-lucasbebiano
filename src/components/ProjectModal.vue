<script setup lang="ts">
import type { Project } from '../data/projects'

const props = defineProps<{
  project: Project
  images: string[]
  imageIndex: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'prev'): void
  (e: 'next'): void
  (e: 'set-image', index: number): void
  (e: 'open-link', link: string): void
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
    @click.self="emit('close')"
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
          @click="emit('close')"
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
          <!-- Blurred background -->
          <div
            class="absolute inset-0 scale-110 blur-lg"
            :style="{
              backgroundImage: `url(${images[imageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          />
          <div class="absolute inset-0 bg-black/50" />
          <img
            :src="images[imageIndex]"
            :alt="project.title"
            class="relative z-10 h-full w-full object-contain transition-all duration-300"
          />

          <!-- Prev/Next arrows -->
          <template v-if="images.length > 1">
            <button
              class="absolute top-1/2 left-2 z-30 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80 focus-visible:outline-none"
              aria-label="Imagem anterior"
              @click.stop="emit('prev')"
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
              @click.stop="emit('next')"
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
                v-for="(_, i) in images"
                :key="i"
                class="h-1.5 rounded-full transition-all duration-200 focus-visible:outline-none"
                :class="i === imageIndex ? 'w-4 bg-yellow-400' : 'w-1.5 bg-white/40 hover:bg-white/70'"
                :aria-label="`Ir para imagem ${i + 1}`"
                @click.stop="emit('set-image', i)"
              />
            </div>
          </template>
        </div>

        <!-- Thumbnail strip -->
        <div
          v-if="images.length > 1"
          class="flex shrink-0 gap-1.5 overflow-x-auto bg-gray-200/80 dark:bg-zinc-900/80 p-2"
        >
          <button
            v-for="(img, i) in images"
            :key="i"
            class="h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-gray-300 dark:bg-zinc-800 transition-all duration-200 focus-visible:outline-none"
            :class="
              i === imageIndex
                ? 'border-yellow-400 opacity-100'
                : 'border-gray-300 dark:border-white/10 opacity-50 hover:opacity-80'
            "
            :aria-label="`Visualizar imagem ${i + 1}`"
            @click="emit('set-image', i)"
          >
            <img :src="img" :alt="`Imagem ${i + 1}`" class="h-full w-full object-contain" loading="lazy" decoding="async" />
          </button>
        </div>
      </div>

      <!-- RIGHT: Content + actions -->
      <div class="flex min-h-0 flex-1 flex-col overflow-hidden">
        <!-- Header: title + badges -->
        <div class="shrink-0 border-b border-gray-200 dark:border-white/10 px-5 pt-5 pb-4">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ project.title }}</h3>
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
          </div>
        </div>

        <!-- Scrollable body -->
        <div class="flex flex-col gap-4 overflow-y-auto px-5 py-4">
          <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
            {{ project.longDescription ?? project.description }}
          </p>

          <!-- Highlights -->
          <div v-if="project.highlights?.length">
            <h4 class="mb-3 text-xs font-semibold tracking-widest text-emerald-600 dark:text-yellow-500 uppercase">
              O que foi implementado
            </h4>
            <ul class="flex flex-col gap-2">
              <li
                v-for="item in project.highlights"
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

        <!-- Footer actions — flex-col on small screens to prevent overlap at ~320px -->
        <footer
          class="flex shrink-0 flex-col gap-3 border-t border-gray-200 dark:border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
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
              :disabled="project.link === '#'"
              @click="emit('open-link', project.link)"
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
</template>
