import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next.js Bug Fix Examples',
  description: 'Ejemplos reales de bugs comunes en Next.js/React/TypeScript y sus fixes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
