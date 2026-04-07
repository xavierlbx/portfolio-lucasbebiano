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
  <main
    class="w-full bg-gradient-to-b from-amber-50 via-yellow-50 to-stone-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
  >
    <section class="flex min-h-screen items-center px-6 py-10">
      <div class="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <h1
          class="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl dark:text-slate-200"
        >
          {{ title }}
        </h1>

        <p class="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Consectetur ullamco voluptate ad eu aute et culpa velit et occaecat eu adipisicing. Fugiat pariatur occaecat exercitation sunt consequat aliquip. Sint minim est eiusmod cillum eiusmod irure aliquip in nisi sit. Cupidatat culpa sunt dolore nulla anim aliquip eu sunt Lorem quis excepteur laborum. Cillum veniam et in magna proident esse in deserunt excepteur. Cillum ea sunt velit id pariatur consequat aliqua in reprehenderit sit sunt nulla.
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

    <section class="flex min-h-screen items-center px-6 py-10">
      <div
        class="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70"
      >
        <h2 class="text-3xl font-bold text-slate-800 dark:text-slate-100">About & Experience</h2>
        <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Fugiat ea duis Lorem esse dolor in ex ea velit mollit mollit consequat magna. Cupidatat
          sint amet pariatur ipsum. Lorem amet aute incididunt est aute incididunt mollit commodo
          sunt eu. Adipisicing ullamco ullamco duis non.
        </p>
        <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Nostrud officia minim excepteur officia est Lorem nulla officia velit. Elit dolor laboris
          laborum fugiat nisi. Nisi nostrud dolor sit voluptate dolore cillum aliquip laboris qui
          ea. Tempor ea excepteur incididunt magna consequat.
        </p>
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
