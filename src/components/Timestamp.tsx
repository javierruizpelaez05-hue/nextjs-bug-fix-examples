'use client'
import { useState, useEffect } from 'react'

export default function Timestamp() {
  const [time, setTime] = useState('')
  useEffect(() => {
    setTime(new Date().toLocaleString())
  }, [])
  return <span>Cargado: {time}</span>
}
