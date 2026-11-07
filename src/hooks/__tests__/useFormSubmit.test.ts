import { renderHook, act } from '@testing-library/react'
import { useFormSubmit } from '@/hooks/useFormSubmit'

describe('useFormSubmit - Performance Fix', () => {
  it('handleSubmit estable entre renders si name no cambia', () => {
    const save = vi.fn()
    const { result, rerender } = renderHook(({ name }) => useFormSubmit(save), {
      initialProps: { name: 'Javier' }
    })

    const firstSubmit = result.current.handleSubmit
    
    rerender({ name: 'Javier' }) // mismo nombre
    expect(result.current.handleSubmit).toBe(firstSubmit) // misma referencia
  })

  it('handleSubmit cambia solo cuando name cambia', () => {
    const save = vi.fn()
    const { result, rerender } = renderHook(({ name }) => useFormSubmit(save), {
      initialProps: { name: 'Javier' }
    })

    const firstSubmit = result.current.handleSubmit
    
    rerender({ name: 'Javier Ruiz' }) // nombre diferente
    expect(result.current.handleSubmit).not.toBe(firstSubmit) // nueva referencia
  })

  it('options siempre misma referencia (memo vacío)', () => {
    const save = vi.fn()
    const { result, rerender } = renderHook(() => useFormSubmit(save))

    const firstOptions = result.current.options
    rerender()
    expect(result.current.options).toBe(firstOptions)
  })
})
