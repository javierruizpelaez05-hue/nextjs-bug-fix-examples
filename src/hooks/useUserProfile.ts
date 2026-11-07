import { useState, useEffect, useCallback } from 'react'

interface User { id: string; name: string; email: string }

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}

export function useUserProfile(userId: string) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId])

  const refresh = useCallback(() => {
    fetchUser(userId).then(data => {
      setUser(prev => {
        console.log('Usuario actual antes de refresh:', prev)
        return data
      })
    })
  }, [userId])

  return { user, refresh }
}
