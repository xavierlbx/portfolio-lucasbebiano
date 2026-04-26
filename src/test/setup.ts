import { beforeEach } from 'vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('dark'),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

beforeEach(() => {
  document.documentElement.className = ''
  localStorage.clear()
})
