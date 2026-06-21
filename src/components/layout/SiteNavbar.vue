<script setup lang="ts">
import { ref } from 'vue'
import { useDarkMode } from '../../composables/useDarkMode'
import { useScrollSpy } from '../../composables/useScrollSpy'

type NavLink = {
  label: string
  href: string
  external?: boolean
}

const NAV_LINKS: NavLink[] = [
  { label: 'Sobre Mim', href: '#about' },
  { label: 'Experiências', href: '#experience' },
  { label: 'Conhecimentos', href: '#skills' },
  { label: 'Certificados', href: '#certificates' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Fale Comigo', href: '#contact' },
]

const { isDark, toggleDarkMode } = useDarkMode()
const { activeSection } = useScrollSpy()

const isMenuOpen = ref(false)

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
</script>

<template>
  <div class="fixed top-3 right-0 left-0 z-[100] flex justify-center px-4">
    <nav
      class="nav-bar w-full max-w-5xl overflow-hidden rounded-xl shadow-[0_6px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      :class="isDark ? 'nav-bar-dark' : 'nav-bar-light'"
    >
      <!-- Top accent line -->
      <div
        class="nav-top-accent h-px w-full"
        :class="isDark ? 'nav-top-accent-dark' : 'nav-top-accent-light'"
      />

      <div class="flex h-11 items-center justify-between px-5">
        <!-- Logo: terminal style -->
        <button
          class="group flex items-center gap-1 font-mono select-none focus:outline-none"
          @click="scrollToTop"
        >
          <span
            class="text-xs text-teal-700/80 dark:text-yellow-500/60 transition-colors group-hover:text-teal-600 dark:group-hover:text-yellow-400"
            >&gt;_</span
          >
          <span class="ml-1 text-sm font-black tracking-tight text-gray-900 dark:text-white">
            lucas<span class="text-teal-600 dark:text-yellow-400">X</span>
          </span>
          <span
            class="ml-0.5 inline-block h-3 w-[2px] animate-[blink_1.1s_step-end_infinite] bg-teal-600 dark:bg-yellow-400 opacity-80"
          />
        </button>

        <!-- Desktop links (centered) — visible at md (768px) to match project grid breakpoint -->
        <ul class="absolute left-1/2 hidden -translate-x-1/2 flex-nowrap items-center gap-0.5 md:flex">
          <li v-for="link in NAV_LINKS" :key="link.label">
            <button
              class="nav-link group relative rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-wider whitespace-nowrap transition-all duration-200 lg:px-3 lg:text-[11px]"
              :class="
                !link.external && activeSection === link.href.replace('#', '')
                  ? 'nav-link-active text-teal-900 dark:text-yellow-400'
                  : 'text-slate-800 dark:text-slate-300 hover:text-teal-950 dark:hover:text-slate-200'
              "
              @click="scrollToSection(link)"
            >
              <span
                class="mr-0.5 transition-colors duration-200"
                :class="
                  !link.external && activeSection === link.href.replace('#', '')
                    ? 'text-teal-800 dark:text-yellow-600'
                    : 'text-stone-400 dark:text-slate-600 group-hover:text-teal-700/65 dark:group-hover:text-yellow-600/50'
                "
                >//&nbsp;</span
              >{{ link.label.toLowerCase() }}
            </button>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <!-- Theme toggle -->
          <button
            class="flex h-7 w-7 items-center justify-center rounded border border-slate-300/80 bg-white/45 dark:border-white/10 dark:bg-transparent text-slate-700 dark:text-slate-500 transition hover:border-teal-600/45 hover:bg-white/75 hover:text-teal-700 dark:hover:border-yellow-400/40 dark:hover:bg-transparent dark:hover:text-yellow-400 focus-visible:ring-2 focus-visible:ring-teal-500/45 dark:focus-visible:ring-yellow-400/60 focus-visible:outline-none"
            aria-label="Alternar tema"
            @click="toggleDarkMode"
          >
            <!-- Sun icon (dark mode) -->
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
            <!-- Moon icon (light mode) -->
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

          <!-- Hamburger (mobile only, hidden at md) -->
          <button
            class="flex h-7 w-7 flex-col items-center justify-center gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:focus-visible:ring-yellow-400/70 md:hidden"
            :aria-expanded="isMenuOpen"
            aria-label="Abrir menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span
              class="block h-px w-5 origin-center bg-slate-600 dark:bg-slate-400 transition-all duration-300"
              :class="isMenuOpen ? 'translate-y-[6px] rotate-45 bg-emerald-500 dark:bg-yellow-400' : ''"
            />
            <span
              class="block h-px w-5 bg-slate-600 dark:bg-slate-400 transition-all duration-300"
              :class="isMenuOpen ? 'opacity-0' : ''"
            />
            <span
              class="block h-px w-5 origin-center bg-slate-600 dark:bg-slate-400 transition-all duration-300"
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
        <ul class="flex flex-col border-t border-stone-200 dark:border-white/6 py-2 font-mono">
          <li v-for="link in NAV_LINKS" :key="link.label">
            <button
              class="w-full px-5 py-2 text-left text-xs tracking-wider transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:focus-visible:ring-yellow-400/70 focus-visible:outline-none"
              :class="
                !link.external && activeSection === link.href.replace('#', '')
                  ? 'text-teal-700 dark:text-yellow-400'
                  : 'text-slate-700 dark:text-slate-500 hover:text-teal-950 dark:hover:text-slate-200'
              "
              @click="scrollToSection(link)"
            >
              <span class="mr-0.5 text-stone-400 dark:text-slate-700">//&nbsp;</span>{{ link.label.toLowerCase() }}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.nav-bar {
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.nav-bar-light {
  background: linear-gradient(135deg, rgba(255, 251, 245, 0.94), rgba(240, 249, 245, 0.9));
  border-color: rgba(15, 23, 42, 0.1);
  border-top-color: rgba(13, 148, 136, 0.42);
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
}

.nav-bar-dark {
  background: rgba(13, 13, 13, 0.85);
  border-color: rgba(255, 255, 255, 0.07);
  border-top-color: rgba(234, 179, 8, 0.18);
}

.nav-top-accent-light {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(13, 148, 136, 0.18) 18%,
    rgba(20, 184, 166, 0.7) 50%,
    rgba(245, 158, 11, 0.24) 82%,
    transparent 100%
  );
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
  background: rgba(13, 148, 136, 0.72);
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
  background: linear-gradient(180deg, rgba(20, 184, 166, 0.16), rgba(13, 148, 136, 0.08));
  box-shadow: inset 0 0 0 1px rgba(13, 148, 136, 0.1);
}

:global(html.dark) .nav-link-active {
  background: rgba(234, 179, 8, 0.05);
  box-shadow: inset 0 0 0 1px rgba(234, 179, 8, 0.16);
}

.nav-link-active::after {
  transform: scaleX(1);
}
</style>
