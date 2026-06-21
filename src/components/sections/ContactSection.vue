<script setup lang="ts">
import { useDarkMode } from '../../composables/useDarkMode'
import { CONTACT, contactPhoneHref, contactEmailHref } from '../../data/contact'
import ContactLink from '../ContactLink.vue'

const { isDark } = useDarkMode()
</script>

<template>
  <footer
    id="contact"
    class="relative z-[1] overflow-hidden px-4 pt-12 pb-0 sm:px-6 md:px-10 md:pt-16"
  >
    <!-- Dot-grid -->
    <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

    <!-- Radial glow: left -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="
        isDark
          ? 'background: radial-gradient(ellipse 50% 45% at 25% 40%, rgba(234, 179, 8, 0.06) 0%, transparent 65%)'
          : 'background: radial-gradient(ellipse 50% 45% at 25% 40%, rgba(16, 185, 129, 0.06) 0%, transparent 65%)'
      "
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-12 flex flex-col items-center gap-2">
        <p class="font-mono text-xs tracking-[0.3em] text-gray-400 dark:text-slate-600 uppercase">
          // contato
        </p>
        <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Fale <span class="text-emerald-600 dark:text-yellow-400">comigo</span>
        </h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-slate-500">
          Aberto a novas oportunidades e colaborações
        </p>
      </div>

      <!-- Contact links -->
      <div class="flex flex-wrap items-stretch justify-center gap-4 sm:gap-5">
        <!-- Phone / WhatsApp -->
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

        <!-- Email -->
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

        <!-- GitHub -->
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

        <!-- LinkedIn -->
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
      <div class="mt-16 border-t border-stone-300 dark:border-white/8 py-6">
        <p class="text-center font-mono text-[10px] tracking-widest text-slate-500 dark:text-slate-700">
          &copy; 2026 — <span class="text-slate-500 dark:text-slate-600">Lucas Bebiano Xavier</span>
        </p>
      </div>
    </div>
  </footer>
</template>
