export default function Home() {
  return (
    <main>
      <h1>Next.js Bug Fix Examples</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        5 bugs reales en producción → fixes mínimos + tests de regresión.
        Cada tarjeta muestra: <span className="tag tag-bug">Bug</span> código roto →
        <span className="tag tag-fix">Fix</span> solución + test.
      </p>

      <section>
        <h2>1. Hydration Mismatch en Server/Client</h2>
        <div className="card bug">
          <h3><span className="tag tag-bug">Bug</span> Fecha renderizada en servidor ≠ cliente</h3>
          <pre><code>{`// ❌ Bug: new Date() en render produce mismatch
export default function Timestamp() {
  return <span>Cargado: {new Date().toLocaleString()}</span>
}`}
</code></pre>
        </div>
        <div className="card fix">
          <h3><span className="tag tag-fix">Fix</span> useEffect + estado para solo cliente</h3>
          <pre><code>{`// ✅ Fix: useEffect evita hydration mismatch
'use client'
import { useState, useEffect } from 'react'

export default function Timestamp() {
  const [time, setTime] = useState('')
  useEffect(() => {
    setTime(new Date().toLocaleString())
  }, [])
  return <span>Cargado: {time}</span>
}`}
</code></pre>
        </div>
      </section>

      <section>
        <h2>2. Type Error: Event Handler Inline</h2>
        <div className="card bug">
          <h3><span className="tag tag-bug">Bug</span> onClick con tipo implícito 'any'</h3>
          <pre><code>{`// ❌ Bug: handler sin tipo → error TS7006
function Button({ onClick }) {
  return <button onClick={onClick}>Click</button>
}

// Uso:
<Button onClick={e => console.log(e.target.value)} />`}
</code></pre>
        </div>
        <div className="card fix">
          <h3><span className="tag tag-fix">Fix</span> Tipado explícito + React.MouseEvent</h3>
          <pre><code>{`// ✅ Fix: tipado estricto del handler
interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Click</button>
}`}
</code></pre>
        </div>
      </section>

      <section>
        <h2>3. Memory Leak: Suscripción sin Cleanup</h2>
        <div className="card bug">
          <h3><span className="tag tag-bug">Bug</span> setInterval sin clearInterval en unmount</h3>
          <pre><code>{`// ❌ Bug: leak de memoria + warnings en consola
function LiveCounter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000)
    // ¡Falta cleanup!
  }, [])
  return <div>{count}</div>
}`}
</code></pre>
        </div>
        <div className="card fix">
          <h3><span className="tag tag-fix">Fix</span> Return cleanup function en useEffect</h3>
          <pre><code>{`// ✅ Fix: cleanup correcto
function LiveCounter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000)
    return () => clearInterval(id) // ← cleanup
  }, [])
  return <div>{count}</div>
}`}
</code></pre>
        </div>
      </section>

      <section>
        <h2>4. Stale Closure en useEffect</h2>
        <div className="card bug">
          <h3><span className="tag tag-bug">Bug</span> Valor desactualizado en callback async</h3>
          <pre><code>{`// ❌ Bug: 'user' siempre es valor inicial
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetchUser(userId).then(data => setUser(data))
  }, [userId])

  const handleRefresh = () => {
    fetchUser(userId).then(data => {
      // ⚠️ 'user' aquí es stale (valor viejo)
      console.log('Usuario actual:', user) 
      setUser(data)
    })
  }
}`}
</code></pre>
        </div>
        <div className="card fix">
          <h3><span className="tag tag-fix">Fix</span> useRef o functional update</h3>
          <pre><code>{`// ✅ Fix: functional setState evita stale closure
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetchUser(userId).then(data => setUser(data))
  }, [userId])

  const handleRefresh = () => {
    fetchUser(userId).then(data => {
      setUser(prev => { // ← usa valor actual
        console.log('Usuario actual:', prev)
        return data
      })
    })
  }
}`}
</code></pre>
        </div>
      </section>

      <section>
        <h2>5. Performance: Re-renders Innecesarios</h2>
        <div className="card bug">
          <h3><span className="tag tag-bug">Bug</span> Nueva función/objeto en cada render</h3>
          <pre><code>{`// ❌ Bug: handleSubmit y options nuevos cada render
function Form() {
  const [name, setName] = useState('')

  const handleSubmit = (e) => { // ❌ nueva fn cada render
    e.preventDefault()
    save(name)
  }

  const options = { // ❌ nuevo obj cada render
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }

  return <form onSubmit={handleSubmit}>...</form>
}`}
</code></pre>
        </div>
        <div className="card fix">
          <h3><span className="tag tag-fix">Fix</span> useCallback + useMemo</h3>
          <pre><code>{`// ✅ Fix: memoización estable
function Form() {
  const [name, setName] = useState('')

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    save(name)
  }, [name]) // ← solo cambia si 'name' cambia

  const options = useMemo(() => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }), []) // ← nunca cambia

  return <form onSubmit={handleSubmit}>...</form>
}`}
</code></pre>
        </div>
      </section>
    </main>
  )
}
