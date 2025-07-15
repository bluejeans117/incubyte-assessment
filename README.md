# String Calculator – Incubyte Assessment (TypeScript + Node)

Implementation of Roy Osherove’s String-Calculator kata for the **Incubyte Software Craftsperson (Node / React)** assessment.

## CI status & coverage

[![CI](https://github.com/bluejeans117/incubyte-assessment/actions/workflows/ci.yml/badge.svg)](https://github.com/bluejeans117/incubyte-assessment/actions)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](badge-link-from-Codecov-or-Coveralls)

## Features

- Empty string ⇒ 0
- Any number of values separated by comma or newline
- Single custom delimiter `//;\n`
- Lists **all** negatives and throws
- Ignores numbers > 1000 (1000 itself is counted)
- Delimiter of **any** length `//[***]\n`
- Multiple delimiters `//[*][%]\n`
- Multiple **multi-char** delimiters `//[***][%%]\n`

Extra edge-case tests: regex meta-char delimiters “.\*”, mixed single-/multi-char, dangling comma, long list (1-100 ⇒ 5050).

## Tech stack

- TypeScript 5
- Jest 29 + ts-jest
- ESLint 9 (flat config) + Prettier 3
- GitHub Actions CI
- Standard npm scripts

## Quick start

```bash
git clone https://github.com/bluejeans117/incubyte-assessment.git
cd incubyte-assessment
npm install          # install dev deps

npm test             # run Jest
npm run coverage     # generates ./coverage
npm run lint         # ESLint (0 warnings enforced)
npm run build        # transpile to ./dist
```

## Project layout

```
src/StringCalculator.ts      library code
src/index.ts                 export barrel
src/__tests__/…              Jest specs
dist/                        created by npm run build
coverage/                    created by npm run coverage
eslint.config.js             ESLint flat rules
jest.config.js               Jest setup
tsconfig*.json               TypeScript configs
calc-demo/                   tiny React demo with tests(optional)
```

## TDD workflow

1. **Red** – write a failing test
2. **Green** – minimal code to pass
3. **Refactor** – remove duplication, keep tests green

See commit history for the full red → green → refactor narrative.

## API usage

```ts
import { StringCalculator } from 'string-calculator';

const calc = new StringCalculator();
console.log(calc.add('1,2')); // 3
```

## Future improvements

- (-) `getCalledCount()` to expose invocation count
- (-) Pluggable `ILogger` for testable logging
- (-) Property-based tests with fast-check
- (✓) React demo with tests (input → sum) to showcase Node–React integration

## License

MIT © 2025 Vishnu R
