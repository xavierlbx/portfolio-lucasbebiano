import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useThemeStore } from './theme'

describe('theme store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('initializes from saved preference', () => {
    localStorage.setItem('theme', 'dark')

    const themeStore = useThemeStore()
    themeStore.init()

    expect(themeStore.isDark).toBe(true)
    expect(themeStore.preference).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles and persists theme', () => {
    const themeStore = useThemeStore()
    themeStore.init()
    themeStore.setDarkMode(true)

    expect(themeStore.isDark).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')

    themeStore.toggleDarkMode()

    expect(themeStore.isDark).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('clears user preference and follows system setting', () => {
    const themeStore = useThemeStore()
    themeStore.init()
    themeStore.setDarkMode(false)

    themeStore.clearThemePreference()

    expect(themeStore.preference).toBe(null)
    expect(localStorage.getItem('theme')).toBe(null)
  })
})
