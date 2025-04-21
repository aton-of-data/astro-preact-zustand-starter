  # ⚡ Astro + Preact + Zustand Boilerplate

  [![Node >= 18](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
  [![Astro 5](https://img.shields.io/badge/astro-5.x-fd1d7c)](https://astro.build)
  [![Vite 5](https://img.shields.io/badge/vite-5.x-946dfc)](https://vitejs.dev)
  [![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

  > **Zero‑config DX, microscopic production bundle**  
  > &lt; 16kB gzip / &lt;

  ---

  ## 📦 Production Stats (example)

| Arquivo                                  | Raw (kB) | Gzip (kB) |
|------------------------------------------|---------:|----------:|
| `dist/_astro/pt.CvA52SRl.js`             |     0.86 |      0.54 |
| `dist/_astro/client.DRhvI7f3.js`         |     1.19 |      0.70 |
| `dist/_astro/signals.module.DiwRiHzE.js` |    10.34 |      3.92 |
| `dist/_astro/preload-helper.BigyefsC.js` |    12.52 |      5.25 |
| `dist/_astro/Home.BdT2eaEd.js`           |    14.79 |      6.28 |
| **TOTAL (first load)**                   | **39.70**| **16.69** |


  ---

  ## 🚀 Why “batteries‑included”?

  | Area            | What you get                                            | Why it matters                                                                      |
  |-----------------|---------------------------------------------------------|-------------------------------------------------------------------------------------|
  | **UI & State**  | `preact`, `@astrojs/preact`, `zustand`                  | React‑compatible runtime (~9 kB) + tiny, tree‑shakable global state (~3 kB)          |
  | **i18n**        | **Rosetta** (+ `@preact/signals`)                       | Ultra‑small (~0.3 kB) runtime, reactive locale switch, JSONs are lazy‑loaded per language |
  | **Tooling**     | **Astro 5 + Vite 5**                                    | Islands architecture + lightning‑fast ESBuild bundling                              |
  | **Type Safety** | TypeScript (strict)                                     | Safer code, autocomplete, zero runtime cost                                         |
  | **Code Quality**| ESLint (TypeScript + Astro) & Prettier                  | One‑shot `npm run lint` / `npm run format`                                          |
  | **Tests**       | Vitest + Testing Library for Preact                     | Unit + component tests in ≈ 50 ms                                                   |
  | **Commits**     | Husky v9 hooks + Commitlint + Commitizen                | Conventional Commits enforced locally before every push                             |
  | **Perf**        | `vite-plugin-compression` (Brotli + Gzip)               | Pre‑compressed assets on first visit                                                |
  | **Security**    | Jscrambler CLI (optional)                               | Production JS is obfuscated automatically during build                              |

  ---

  ## 🗂 Project Structure

  ```text
  .
  ├── .husky/               → Git hooks (pre‑commit + commit‑msg)
  ├── public/               → Static assets
  ├── src/
  │   ├── i18n/             → en.json, pt.json, index.ts
  │   ├── components/       → Preact islands
  │   ├── pages/            → .astro or .mdx routes
  │   └── store/            → Zustand stores
  ├── astro.config.mjs
  ├── vite.config.ts
  ├── vitest.config.ts
  ├── .eslintrc.cjs / .prettierrc
  ├── .jscramblerrc         → Obfuscation recipe (prod only)
  └── package.json
  ```

  ---

  ## 🌍 Internationalization in 3 Steps

  ### 1. Core

  ```ts
  // src/i18n/index.ts
  import rosetta from 'rosetta';
  import { signal } from '@preact/signals';

  export type Locale = 'en' | 'pt';
  export const locale = signal<Locale>('en');

  const i18n = rosetta({});

  // preload English for SSR
  import en from './en.json';
  i18n.set('en', en);

  export async function setLocale(l: Locale) {
    if (l === locale.value) return;
    const messages = (await import(`./${l}.json`)).default; // code‑split ⚡
    i18n.set(l, messages);
    locale.value = l;
  }

  export const t = (key: string, params?: Record<string, unknown>) =>
    i18n.t(key, params, locale.value) as string;
  ```

  ### 2. Use inside an island or Astro page

  ```astro
  ---
  import { t } from '../i18n';
  ---
  <h1>{t('app.title')}</h1>
  ```

  ### 3. Switch languages on demand

  ```tsx
  import { setLocale, locale } from '../i18n';

  export default function LangSwitcher() {
    return (
      <select
        value={locale.value}
        onChange={(e) => setLocale(e.currentTarget.value as any)}
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    );
  }
  ```

  *Only ~0.3 kB of Rosetta is included in the initial bundle; the JSON of the
  new language is downloaded on demand.*

  ---

  ## 🏎️ How the Build Stays Tiny

  ### Astro ships **zero JS by default**

  ```mermaid
  graph LR
    HTML[index.html] -->|static| Browser
    style HTML fill:#7fdbca,stroke:#333
  ```

  Unless you add `client:*`, no JavaScript (not even Preact) is sent.

  ### Preact runtime only on islands

  ```mermaid
  sequenceDiagram
    actor User
    participant Server
    User->>Server: GET /
    Server-->>User: index.html (0 kB JS)
    Server-->>User: loader.js (≈ 5 kB)
    User->>Server: import island
    Server-->>User: hello-Island.js (≈ 6 kB incl. Preact)
  ```

  Static routes deliver **0 kB JS**.  
  Routes with islands are still under 30 kB gzip (loader + vendor).

  ```text
  dist/assets/index‑xxx.js      9.4 kB gzip   ← loader + your code
  dist/assets/vendor‑xxx.js    21.3 kB gzip   ← Preact runtime
  TOTAL (first route)          ~30.7 kB gzip
  ```

  ---

  ## 🔍 Build Pipeline

  ```mermaid
  flowchart TD
    subgraph Build
      A[Astro] -->|HMR & pre‑bundle| B[Vite + ESBuild]
      B -->|Rollup output| C(dist/assets/*.js)
      C -->|CLI obfuscation| D[Jscrambler]:::opt
    end
    classDef opt fill:#e2e8f0,stroke:#333,stroke-width:1px;
  ```

  ---

  ## ⚙ NPM Scripts

  | Command              | Description                                                          |
  |----------------------|----------------------------------------------------------------------|
  | `dev`                | Astro dev server + instant HMR                                       |
  | `build`              | `astro build` → Brotli/Gzip → **(opt.)** `jscrambler`                |
  | `preview`            | Serve built site locally                                             |
  | `test`, `test:watch` | Run Vitest once or in watch mode                                     |
  | `lint`, `format`     | ESLint / Prettier                                                    |
  | **Git hooks**        | `pre‑commit` → lint + tests · `commit‑msg` → commitlint              |

---

  ## 🔐 Jscrambler (optional)

  ```mermaid
  pie showData
    title Bundle size increase (gzip)
    "Original" : 16kb
    "After Scramble (+~18%)"
  ```
  ---

  ## 🛠 Customize

  | Goal                    | Command / Action                                 |
  |-------------------------|--------------------------------------------------|
  | **Add SSG**             | `npx astro add sitemap` + use `astro:build:static` |
  | **Add MDX support**     | `npx astro add mdx`                              |
  | **Deploy**              | Drop `dist/` to Netlify / Cloudflare / Render or add an SSR adapter |

  ---

  ## ⚡ Quick Start

  ```bash
  git clone https://github.com/YOUR-ORG/astro-preact-zustand-starter
  cd astro-preact-zustand-starter
  npm i          # or: yarn
  npm run dev    # or: yarn dev
  ```

  ---

  Open a PR and follow the CODEOWNERS template.

  ---

  ## 📄 License

  MIT © 2025 Aton Bertini Dornfeld
