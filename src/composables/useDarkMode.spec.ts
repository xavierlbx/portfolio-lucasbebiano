import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useDarkMode } from './useDarkMode'

describe('useDarkMode', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('returns reactive dark mode state', () => {
    const { isDark } = useDarkMode()

    expect(typeof isDark.value).toBe('boolean')
  })

  it('setDarkMode updates document theme class', () => {
    const { setDarkMode } = useDarkMode()
    setDarkMode(true)

    expect(document.documentElement.classList.contains('dark')).toBe(true)

    setDarkMode(false)

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
