---
description: Reset the prototype to a clean starting point (multi-page architecture)
---

Reset the prototype to a clean starting point.

## Step 1 — Confirm Before Destroying

**Always ask for confirmation first.** Say exactly this to the designer:

> "This will delete all pages and styles and cannot be undone. Do you want to continue?"

Wait for an explicit "yes" or "continue" before proceeding. If the designer says no or is unsure, stop and do not make any changes.

## Step 2 — Reset App.tsx

Replace the entire contents of `src/App.tsx` with the router shell containing only HomePage:

```tsx
// App.tsx — Router shell. Skills manage the imports and PAGES array. Do not edit manually.
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'

const PAGES = [
  { label: 'Home', path: '/home', component: HomePage },
]

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        {PAGES.map(({ path, component: Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Routes>
    </HashRouter>
  )
}
```

## Step 3 — Reset HomePage.tsx

Replace the entire contents of `src/pages/HomePage.tsx` with the clean starting state:

```tsx
import { H2, B1, B2, B3 } from '@ids-ts/typography'
import '@ids-ts/typography/dist/main.css'
import { Card, CardContent } from '@ids-ts/cards'
import '@ids-ts/cards/dist/main.css'
import styles from '../styles/HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <H2>Ready to prototype.</H2>
        <B1>Describe what you want to build and Claude will create it using real IDS components and design tokens.</B1>
      </div>
      <div className={styles.grid}>
        <Card size="standard">
          <CardContent>
            <B2 weight="demi">Build from a description</B2>
            <B3>Type /prototype followed by what you want to build.</B3>
          </CardContent>
        </Card>
        <Card size="standard">
          <CardContent>
            <B2 weight="demi">Build from Figma</B2>
            <B3>Type /figma with a Figma URL or pasted design data.</B3>
          </CardContent>
        </Card>
        <Card size="standard">
          <CardContent>
            <B2 weight="demi">Start with a layout</B2>
            <B3>Type /layout followed by the type: sidebar, dashboard, split-view, or centered.</B3>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

## Step 4 — Reset HomePage.module.css

Replace the entire contents of `src/styles/HomePage.module.css` with the clean starting styles:

```css
.page {
  min-height: 100vh;
  padding: var(--space-800);
  display: flex;
  flex-direction: column;
  gap: var(--space-600);
}

.hero {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-400);
  max-width: 900px;
}
```

## Step 5 — Delete All Other Page and Style Files

Run these two bash commands to delete all page files except HomePage.tsx, and all module CSS files except HomePage.module.css:

```bash
find /Users/shawn/Developer/ids-starter/src/pages -name "*.tsx" ! -name "HomePage.tsx" -delete
find /Users/shawn/Developer/ids-starter/src/styles -name "*.module.css" ! -name "HomePage.module.css" -delete
```

## Step 6 — Confirm Reset Complete

Tell the designer:

> "Reset complete. You're starting fresh with a clean prototype environment."

Then remind them of the next steps: `/prototype` to build from a description, `/figma` to build from a Figma design, or `/layout` to start with a layout structure.
