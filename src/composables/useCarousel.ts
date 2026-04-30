import { ref, onMounted, onUnmounted, type Ref } from 'vue'

const CAROUSEL_SPEED = 0.25
// Tempo de espera após soltar o drag antes de retomar o autoplay,
// para evitar que o carrossel "arranque" imediatamente após a interação.
const CAROUSEL_RESUME_DELAY_MS = 1500

export function useCarousel(carouselTrackRef: Ref<HTMLElement | null>) {
  const carouselOffset = ref(0)
  const carouselIsDragging = ref(false)
  const carouselDragStartX = ref(0)
  const carouselDragStartOffset = ref(0)
  const carouselAutoplay = ref(true)
  let carouselRafId: number | null = null
  let carouselResumeTimer: ReturnType<typeof setTimeout> | null = null

  // O track contém 3 cópias idênticas dos itens. Dividir o scrollWidth por 3
  // retorna a largura de um único "set". Quando o offset atinge -setWidth,
  // resetamos para 0 — o salto é imperceptível porque o próximo set é idêntico.
  const getSetWidth = (): number => {
    if (!carouselTrackRef.value) return 0
    return carouselTrackRef.value.scrollWidth / 3
  }

  const tick = () => {
    if (carouselAutoplay.value) {
      carouselOffset.value -= CAROUSEL_SPEED
      const setWidth = getSetWidth()
      if (setWidth > 0 && carouselOffset.value <= -setWidth) {
        carouselOffset.value += setWidth
      }
    }
    carouselRafId = requestAnimationFrame(tick)
  }

  const pointerStart = (clientX: number) => {
    carouselIsDragging.value = true
    carouselAutoplay.value = false
    carouselDragStartX.value = clientX
    carouselDragStartOffset.value = carouselOffset.value
    // Cancela retomada pendente caso o usuário comece a arrastar de novo antes do delay.
    if (carouselResumeTimer !== null) clearTimeout(carouselResumeTimer)
  }

  const pointerMove = (clientX: number) => {
    if (!carouselIsDragging.value) return
    const delta = clientX - carouselDragStartX.value
    let next = carouselDragStartOffset.value + delta
    const setWidth = getSetWidth()
    // Mantém o offset dentro de [-setWidth, 0] para que o loop não pule sets.
    if (setWidth > 0) {
      while (next <= -setWidth) next += setWidth
      while (next > 0) next -= setWidth
    }
    carouselOffset.value = next
  }

  const pointerEnd = () => {
    if (!carouselIsDragging.value) return
    carouselIsDragging.value = false
    carouselResumeTimer = setTimeout(() => {
      carouselAutoplay.value = true
    }, CAROUSEL_RESUME_DELAY_MS)
  }

  const onMouseDown = (e: MouseEvent) => pointerStart(e.clientX)

  // Os handlers de mousemove e mouseup precisam ser globais (window) para não perder
  // o drag quando o cursor sair rapidamente do elemento durante o arraste.
  const onGlobalMouseMove = (e: MouseEvent) => pointerMove(e.clientX)
  const onGlobalMouseUp = () => pointerEnd()

  const getTouchClientX = (e: TouchEvent): number | null => {
    const primaryTouch = e.touches[0] ?? e.changedTouches[0]
    return primaryTouch ? primaryTouch.clientX : null
  }

  const onTouchStart = (e: TouchEvent) => {
    const clientX = getTouchClientX(e)
    if (clientX !== null) pointerStart(clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    const clientX = getTouchClientX(e)
    if (clientX !== null) pointerMove(clientX)
  }

  const onTouchEnd = () => pointerEnd()
  const onTouchCancel = () => pointerEnd()

  onMounted(() => {
    window.addEventListener('mousemove', onGlobalMouseMove)
    window.addEventListener('mouseup', onGlobalMouseUp)
    carouselRafId = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onGlobalMouseMove)
    window.removeEventListener('mouseup', onGlobalMouseUp)
    if (carouselRafId !== null) cancelAnimationFrame(carouselRafId)
    if (carouselResumeTimer !== null) clearTimeout(carouselResumeTimer)
  })

  return {
    carouselOffset,
    carouselIsDragging,
    onMouseDown,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
  }
}
