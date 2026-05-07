import { ref, onMounted, onUnmounted } from 'vue'

const TYPING_SPEED_MS = 70
const TYPING_START_DELAY_MS = 400
const TYPING_LINE_GAP_MS = 150
// Após concluir a digitação, o cursor permanece visível brevemente antes de
// desaparecer e a animação blink-text assumir o controle visual.
const CURSOR_HIDE_DELAY_MS = 2500

const LINE_1 = 'Hello World!'
const LINE_2 = 'Bem vindo(a)!'

export function useTypingAnimation() {
  const typedLine1 = ref('')
  const typedLine2 = ref('')
  // typingPhase controla qual cursor piscante está ativo e qual transição aplicar:
  // 0 = digitando linha 1  |  1 = digitando linha 2  |  2 = concluído (blink-text)
  const typingPhase = ref(0)
  const showCursor = ref(true)

  // Rastreia todos os timeouts para cancelamento seguro no unmount,
  // evitando updates de estado em componente já desmontado.
  const pendingTimeouts: Array<ReturnType<typeof setTimeout>> = []

  const schedule = (callback: () => void, delayMs: number) => {
    const id = setTimeout(callback, delayMs)
    pendingTimeouts.push(id)
  }

  onMounted(() => {
    let i = 0
    let j = 0

    const typeLine2 = () => {
      if (j < LINE_2.length) {
        typedLine2.value += LINE_2[j++]
        schedule(typeLine2, TYPING_SPEED_MS)
      } else {
        typingPhase.value = 2
        schedule(() => {
          showCursor.value = false
        }, CURSOR_HIDE_DELAY_MS)
      }
    }

    const typeLine1 = () => {
      if (i < LINE_1.length) {
        typedLine1.value += LINE_1[i++]
        schedule(typeLine1, TYPING_SPEED_MS)
      } else {
        typingPhase.value = 1
        schedule(typeLine2, TYPING_LINE_GAP_MS)
      }
    }

    schedule(typeLine1, TYPING_START_DELAY_MS)
  })

  onUnmounted(() => {
    for (const id of pendingTimeouts) clearTimeout(id)
  })

  return { typedLine1, typedLine2, typingPhase, showCursor }
}
