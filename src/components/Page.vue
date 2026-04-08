<script setup lang="ts">
import { ToggleSwitch } from 'primevue'
import { ref } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
const checked = ref(isDark.value)

const handleToggle = () => {
  toggleDarkMode()
  checked.value = isDark.value
}

const title = 'Welcome to My Portfolio'
</script>
<template>
  <main class="w-full bg-[#0D0D0D]">
    <section class="flex min-h-screen items-center px-6 py-10">
      <div class="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <h1
          class="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl dark:text-slate-200"
        >
          {{ title }}
        </h1>

        <p class="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Consectetur ullamco voluptate ad eu aute et culpa velit et occaecat eu adipisicing. Fugiat
          pariatur occaecat exercitation sunt consequat aliquip. Sint minim est eiusmod cillum
          eiusmod irure aliquip in nisi sit. Cupidatat culpa sunt dolore nulla anim aliquip eu sunt
          Lorem quis excepteur laborum. Cillum veniam et in magna proident esse in deserunt
          excepteur. Cillum ea sunt velit id pariatur consequat aliqua in reprehenderit sit sunt
          nulla.
        </p>

        <div
          class="flex items-center gap-4 rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:bg-slate-800/80"
        >
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
            {{ isDark ? 'Dark Mode' : 'Light Mode' }}
          </span>
          <ToggleSwitch v-model="checked" @change="handleToggle" />
        </div>
      </div>
    </section>

    <section id="about" class="bg-[#141414]/70 px-6 py-20 text-left md:py-32">
      <div
        class="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-16"
      >
        <!-- image -->
        <div class="flex w-full shrink-0 justify-center md:w-1/2">
          <img
            src="/aboutme-photo.jpg"
            alt="Imagem do Lucas vestindo a beca em uma formatura"
            class="w-64 max-w-full rounded-2xl shadow-xl shadow-black/50 transition-all duration-[600ms] hover:scale-105 sm:w-72 md:w-full md:max-w-sm dark:shadow-black/30"
          />
        </div>

        <!-- text -->
        <div class="w-full md:w-1/2">
          <h2
            class="mb-4 font-bold text-blue-500 sm:text-3xl md:text-4xl lg:text-5xl dark:text-blue-400"
          >
            Sobre mim
          </h2>
          <p class="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Desenvolvedor Full Stack graduado em Análise e Desenvolvimento de Sistemas, com
            experiência no desenvolvimento e manutenção de aplicações web, atuando em todo o ciclo
            de vida, do levantamento de requisitos à entrega. Foco em boas práticas de
            desenvolvimento, qualidade de código e colaboração em equipe. Perfil proativo, com busca
            contínua por evolução técnica e adoção de soluções que agreguem valor e eficiência aos
            sistemas.
          </p>
        </div>
      </div>
    </section>

    <section class="flex min-h-screen items-center px-6 py-10">
      <div
        class="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70"
      >
        <h2 class="text-3xl font-bold text-slate-800 dark:text-slate-100">Projects & Skills</h2>
        <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Ut tempor minim aliquip laborum excepteur laborum laboris in ut elit esse ex. Consequat
          cillum quis ex occaecat non ea ea irure in adipisicing ipsum Lorem sint. Occaecat
          incididunt aliquip ipsum velit et excepteur qui adipisicing reprehenderit qui do ipsum
          laboris ad. Aliquip culpa pariatur sint et Lorem dolor ex eiusmod irure in ea est id.
        </p>
        <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Est est qui in dolor pariatur dolor dolore nulla aute. Anim velit ipsum consectetur
          proident nulla nisi exercitation reprehenderit ex aliquip. Dolore duis ut eiusmod do dolor
          et aliqua et excepteur aute. Labore non culpa adipisicing in esse tempor minim culpa
          cupidatat aliqua ex est eu. Pariatur nulla excepteur elit dolore occaecat voluptate mollit
          tempor cupidatat veniam ut.
        </p>
      </div>
    </section>
  </main>
</template>
<style scoped></style>
