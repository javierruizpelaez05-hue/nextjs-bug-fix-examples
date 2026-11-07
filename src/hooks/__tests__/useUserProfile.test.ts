import { renderHook, act, waitFor } from '@testing-library/react'
import { useUserProfile } from '@/hooks/useUserProfile'

const mockUser = { id: '1', name: 'Javier', email: 'javier@test.com' }
const mockUserUpdated = { id: '1', name: 'Javier Ruiz', email: 'javier@test.com' }

vi.mock('@/hooks/useUserProfile', () => ({
  fetchUser: vi.fn(),
}))

describe('useUserProfile - Stale Closure Fix', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    global.fetch = vi.fn()
  })

  it('fetch inicial carga usuario', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    })

    const { result } = renderHook(() => useUserProfile('1'))
    
    await waitFor(() => expect(result.current.user).toEqual(mockUser))
  })

  it('refresh usa valor actual via functional update (no stale)', async () => {
    ;(fetch as any)
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockUser) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockUserUpdated) })

    const { result } = renderHook(() => useUserProfile('1'))
    
    await waitFor(() => expect(result.current.user).toEqual(mockUser))

    await act(async () => {
      await result.current.refresh()
    })

    await waitFor(() => expect(result.current.user).toEqual(mockUserUpdated))
  })
})
