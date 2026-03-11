---
description: Reset the prototype to a clean starting point (multi-page architecture)
---

Reset the prototype to the pre-onboarding state — the same state a fresh clone has before the user picks any frameworks.

## Step 1 — Confirm Before Destroying

**Always ask for confirmation first.** Say exactly this to the designer:

> "This will reset the prototype back to the onboarding flow and cannot be undone. Any pages, components, or scaffolding you've added will be removed. Do you want to continue?"

Wait for an explicit "yes" or "continue" before proceeding. If the designer says no or is unsure, stop and do not make any changes.

## Step 2 — Run Unscaffold Scripts

Run both unscaffold scripts to cleanly reverse any scaffolding. These are idempotent — safe to run even if the scaffold was never applied.

```bash
yarn unscaffold:appshell && yarn unscaffold:genux
```

This removes AppShell components, contexts, navigation, assets, GenUX pages/styles, and restores App.tsx from backup if one exists.

## Step 3 — Restore App.tsx to the Base Version with Onboarding

After unscaffolding, replace `src/App.tsx` with the standard base version that includes onboarding. This is the canonical pre-scaffold App.tsx:

```tsx
// App.tsx — Router shell. Skills manage the imports and PAGES array. Do not edit manually.
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import HomePage from './pages/HomePage'
import OnboardingPage from './pages/OnboardingPage'
import WorkspacePage from './pages/WorkspacePage'

const PAGES = [
  { label: 'Home', path: '/home', component: HomePage },
  { label: 'Onboarding', path: '/onboarding', component: OnboardingPage },
  { label: 'Workspace', path: '/workspace', component: WorkspacePage },
]

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          {PAGES.map(({ path, component: Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  )
}
```

## Step 4 — Delete Prototype Pages and Styles

Delete all files in `src/pages/` **except** these core files:

- `HomePage.tsx`
- `OnboardingPage.tsx`
- `WorkspacePage.tsx`

Delete all `*.module.css` files in `src/styles/` **except** these core files:

- `App.module.css`
- `HomePage.module.css`
- `OnboardingPage.module.css`
- `WorkspacePage.module.css`

Use the Glob tool to find the files, then delete them individually. Do **not** delete `ErrorBoundary.tsx`, `main.tsx`, `vite-env.d.ts`, `config.ts`, `index.css`, `fonts.css`, or `intuit.css`.

Also remove the `App.original.tsx` backup file if it still exists:

```bash
rm -f src/App.original.tsx
```

## Step 5 — Clear localStorage Config

Tell the designer:

> "To fully reset, open your browser's developer console and run: `localStorage.removeItem('ids-prototype-config')` — or just refresh the page and the onboarding flow will appear."

## Step 6 — Confirm Reset Complete

Tell the designer:

> "Reset complete! Refresh your browser to see the onboarding flow. From there you can pick a theme, select AppShell or GenUX, and start fresh."

Then remind them: use `/prototype` to build from a description, `/figma` to build from a Figma design, or `/layout` to start with a layout structure.
