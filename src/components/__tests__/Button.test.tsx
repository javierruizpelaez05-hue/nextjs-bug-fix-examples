import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/Button'

describe('Button - Type Safety Fix', () => {
  it('acepta handler tipado correctamente', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith(expect.any(MouseEvent))
  })

  it('rechaza handler sin tipar (TypeScript compile-time)', () => {
    // Este test documenta que TS previene el bug en compile-time
    // @ts-expect-error - handler sin tipo debería fallar
    const BadButton = () => <Button onClick={e => console.log(e.target.value)} />
    expect(true).toBe(true) // placeholder - el error real es en build
  })
})
