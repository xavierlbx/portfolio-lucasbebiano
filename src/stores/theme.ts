import { defineStore } from 'pinia'

type ThemePreference = 'dark' | 'light' | null

const STORAGE_KEY = 'theme'

const applyHtmlThemeClass = (isDark: boolean) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', isDark)
  document.body.classList.toggle('dark', isDark)

  const bgColor = isDark ? '#0d0d0d' : '#f8fafc'
  const textColor = isDark ? '#f8fafc' : '#111827'

  document.documentElement.style.backgroundColor = bgColor
  document.body.style.backgroundColor = bgColor
  document.body.style.color = textColor
}

const loadPreference = (): ThemePreference => {
  if (typeof localStorage === 'undefined') return null
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  return null
}

const savePreference = (preference: ThemePreference) => {
  if (typeof localStorage === 'undefined') return
  if (preference) localStorage.setItem(STORAGE_KEY, preference)
  else localStorage.removeItem(STORAGE_KEY)
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: true as boolean,
    preference: null as ThemePreference,
    initialized: false as boolean,
  }),

  actions: {
    init() {
      if (this.initialized) return
      this.initialized = true

      this.preference = loadPreference()

      this.isDark = this.preference ? this.preference === 'dark' : true

      applyHtmlThemeClass(this.isDark)
    },

    toggleDarkMode() {
      this.setDarkMode(!this.isDark)
    },

    setDarkMode(value: boolean) {
      this.isDark = value
      this.preference = value ? 'dark' : 'light'
      savePreference(this.preference)
      applyHtmlThemeClass(this.isDark)
    },

    clearThemePreference() {
      this.preference = null
      savePreference(null)
      this.isDark = true
      applyHtmlThemeClass(this.isDark)
    },
  },
})
