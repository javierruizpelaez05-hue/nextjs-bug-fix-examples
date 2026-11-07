# Next.js Bug Fix Examples

> **Portfolio demostrativo**: 5 bugs reales en producción → fixes mínimos + tests de regresión.

## Qué demuestra este repo

| Bug | Tipo | Fix | Test |
|-----|------|-----|------|
| Hydration mismatch `new Date()` | Runtime | `useEffect` + estado cliente | `Timestamp.test.tsx` |
| Handler `onClick` sin tipar | TypeScript | `React.MouseEvent<HTMLButtonElement>` | `Button.test.tsx` |
| `setInterval` sin cleanup | Memory leak | Return `clearInterval` en `useEffect` | `useLiveCounter.test.ts` |
| Stale closure en callback async | Lógica | Functional `setState` / `useRef` | `useUserProfile.test.ts` |
| Re-renders por fn/obj nuevos | Performance | `useCallback` + `useMemo` | `useFormSubmit.test.ts` |

## Stack

- **Next.js 14** (App Router)
- **TypeScript 5** (strict mode)
- **React 18** + Testing Library
- **Vitest** + jsdom
- **ESLint** (Next.js core-web-vitals)
- **GitHub Actions** (CI completo)

## Comandos

```bash
npm install        # instala dependencias
npm run dev        # servidor desarrollo
npm run build      # build producción
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run test       # vitest run
```

## CI Pipeline

Cada push/PR ejecuta:
1. **Typecheck** → `tsc --noEmit`
2. **Lint** → `eslint`
3. **Tests** → `vitest run` (cobertura)
4. **Build** → `next build`

## Estructura

```
src/
├── app/page.tsx           # Demo visual de los 5 bugs/fixes
├── components/
│   ├── Timestamp.tsx      # Fix hydration mismatch
│   ├── Button.tsx         # Fix type safety
│   └── __tests__/         # Tests de componentes
├── hooks/
│   ├── useLiveCounter.ts  # Fix memory leak
│   ├── useUserProfile.ts  # Fix stale closure
│   ├── useFormSubmit.ts   # Fix performance
│   └── __tests__/         # Tests de hooks
.github/workflows/ci.yml   # Pipeline CI
```

## Para clientes potenciales

Este repo demuestra que:
- ✅ Detecto bugs sutiles (hydration, stale closures, leaks)
- ✅ Escribo fixes **mínimos y quirúrgicos** (no refactor entero)
- ✅ Añado **tests de regresión** para que no vuelvan
- ✅ Configuro **CI estricto** (types + lint + tests + build)
- ✅ Entregable: **PR limpio + explicación de causa raíz**

---

**Contacto**: [Workana](https://www.workana.com/freelancer/tuusuario) | [GitHub](https://github.com/javierruizpelaez05-hue)
