# React Demo – Calculator Demo

Tiny React + Vite application that consumes the **string-calculator** Node/TS library and shows the running total as you type.

---

## What it demonstrates

- Integrating a TypeScript Node package into a browser bundle
- React state + error handling
- End-to-end tests with Vitest & Testing-Library
- Lightning-fast HMR via Vite

---

## Quick start

```bash
# 1 · install demo dependencies
cd calc-demo
npm install

# 2 · link the freshly-built library (path to repo root)
npm install <repo-root> --legacy-peer-deps

# 3 · start dev server
npm run dev            # open http://localhost:5173
```

### Tests & coverage

```bash
npm test               # Vitest + jsdom
npm test -- --coverage
open coverage/lcov-report/index.html
```

---

## Available npm scripts

| Script          | Purpose                     |
| --------------- | --------------------------- |
| `npm run dev`   | Vite dev server + HMR       |
| `npm run build` | Production build to `dist/` |
| `npm test`      | Vitest UI tests             |
| `npm run lint`  | ESLint (if you wired it up) |

---

## Project layout

```
src/App.tsx                   main component
src/App.integration.test.tsx  UI tests (Vitest + RTL)
src/setupTests.ts             jest-dom matchers
vite.config.ts                Vite / Vitest config
coverage/                     generated test coverage
index.html                    Vite entry point
```

---

## Usage example (inside React)

```tsx
import { useState } from 'react';
import { StringCalculator } from 'string-calculator';

const calc = new StringCalculator();

export default function CalculatorWidget() {
  const [raw, setRaw] = useState('');
  const [sum, setSum] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setRaw(input);

    try {
      // replace literal "\n" with real new-lines for the calculator
      setSum(calc.add(input.replace(/\\n/g, '\n')));
      setErr(null);
    } catch (ex) {
      setSum(null);
      setErr((ex as Error).message);
    }
  };

  return (
    <>
      <textarea value={raw} onChange={onChange} rows={4} />
      {sum !== null && <p>Sum: {sum}</p>}
      {err && <p style={{ color: 'crimson' }}>{err}</p>}
    </>
  );
}
```

---

## License

MIT – [see root project](../README.md).
