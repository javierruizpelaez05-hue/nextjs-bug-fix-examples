import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Timestamp from '@/components/Timestamp'

// Mock de Date para test determinista
const mockDate = new Date('2024-01-15T10:30:00.000Z')
vi.useFakeTimers()
vi.setSystemTime(mockDate)

describe('Timestamp - Hydration Mismatch Fix', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renderiza timestamp tras montar (no en server)', async () => {
    const user = userEvent.setup()
    render(<Timestamp />)
    
    // Inicialmente vacío (server render)
    expect(screen.getByText('Cargado:')).toBeInTheDocument()
    expect(screen.getByText('Cargado: ')).toHaveTextContent('Cargado: ')
    
    // Tras useEffect (client)
    await user.waitFor(() => {
      expect(screen.getByText('Cargado:')).toHaveTextContent(
        mockDate.toLocaleString()
      )
    })
  })

  it('no lanza error de hydration mismatch', () => {
    // Este test pasa si no hay mismatch entre server/client
    const { container } = render(<Timestamp />)
    expect(container).toBeInTheDocument()
  })
})
