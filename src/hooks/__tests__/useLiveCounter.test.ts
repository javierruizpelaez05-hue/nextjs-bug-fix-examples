import { renderHook, act } from '@testing-library/react'
import { useLiveCounter } from '@/hooks/useLiveCounter'

describe('useLiveCounter - Memory Leak Fix', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('incrementa contador cada segundo', () => {
    const { result } = renderHook(() => useLiveCounter())
    
    expect(result.current).toBe(0)
    
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current).toBe(1)
    
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current).toBe(3)
  })

  it('limpia interval al desmontar (no memory leak)', () => {
    const { result, unmount } = renderHook(() => useLiveCounter())
    
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current).toBe(1)
    
    // Unmount = cleanup
    unmount()
    
    // Avanzar tiempo no debería afectar (interval limpiado)
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(result.current).toBe(1) // sigue en 1
  })
})
