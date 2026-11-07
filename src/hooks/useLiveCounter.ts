import { useState, useEffect } from 'react'

export function useLiveCounter(initial = 0, intervalMs = 1000) {
  const [count, setCount] = useState(initial)

  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return count
}
