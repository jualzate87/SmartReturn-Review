# SmartReturn Prototype — Handoff Doc

> **Start every new session by reading this file.** Then read the specific page files listed in each screen entry before touching anything.

---

## Orientation

**Product:** ProConnect Tax — SmartReturn AI-assisted tax prep flow  
**Tech:** React + TypeScript + Vite + CSS Modules  
**UI Libraries:** `@ids-ts/*` (IDS), `@cgds/*` (CGDS), `@design-systems/icons`  
**Dev server:** `http://localhost:5174` (run `npm run dev`)  
**Router:** HashRouter → routes are `/#/path`  
**Repo:** `github.intuit.com/agupta69/SmartReturn-prototype` (branch: `main`)  
**Project root:** `/Users/agupta69/Desktop/ClaudeXFigma/ids-starter/`

---

## Screen Inventory

| # | Screen Name | Route | Key Files | Status |
|---|-------------|-------|-----------|--------|
| 1 | SmartReturn (ready for review) | `/#/smart-return` | `SmartReturnPage.tsx`, `SmartReturnPage.module.css` | ✅ Done |
| 2 | Data Review (1040 + W-2 panel) | `/#/data-review` | `DataReviewPage.tsx`, `LeftPanel1040.tsx`, `ReviewTab.tsx`, `DocumentPreview.tsx`, `DetailFields.tsx` | ✅ Done |
| 2.5 | Agent Loading | (state inside DataReviewPage) | `AgentLoadingPane.tsx` | ✅ Done |
| 3 | Tax Prep Agent Report | (state inside DataReviewPage) | `AgentReportPane.tsx` | ✅ Done |
| 4 | YoY Analysis expanded | (state inside DataReviewPage, `yoyExpanded=true`) | `AgentReportPane.tsx`, `LeftPanel1040.tsx` | ✅ Done |
| 5 | W-2 Detail + cross-highlight | (state inside DataReviewPage, `selectedField='wages'`) | `DetailFields.tsx`, `LeftPanel1040.tsx`, `SourcesToast.tsx` | ✅ Done |
| 6–8 | W-2 / 1099-INT / K-1 tabs | `/#/data-review` (tab switching) | `DetailFields1099.tsx`, `DetailFieldsK1.tsx`, `DocumentPreview.tsx` | ✅ Done |
| 33 | Check Return | `/#/check-return` | `CheckReturnPage.tsx`, `CheckReturnPage.module.css` | ✅ Done |
| 34 | Return Insights | `/#/check-return/insights` | `ReturnInsightsPage.tsx`, `ReturnInsightsPage.module.css` | ✅ Done |

**Popout route:** `/#/data-review-popout` → `DataReviewPopout.tsx` (standalone W-2/doc viewer in new window)

---

## Architecture — How It All Fits

### Shell layout (all screens share)
- **`LeftNavPTO.tsx`** — ProConnect left nav (icons + labels, "Tax returns" item active). Uses Figma asset URLs for icons — **these expire every 7 days**. If icons look broken, re-fetch from Figma via `get_design_context` on the LeftNavPTO node.
- **`SmartReturnHeader.tsx`** — top tab bar (SmartReturn / Check return). Accepts `activeTab?: 'smartreturn' | 'checkreturns'` prop for highlighting. Tab clicks use `useNavigate`.

### DataReviewPage state machine
```
agentView: 'idle' → 'loading' → 'report' → 'closing' → 'idle'
```
- `idle`: normal 2-panel layout (left=1040, right=W2 preview+fields), width ratio controlled by drag handle
- `loading`: left panel expands to 80%, `AgentLoadingPane` fills right (Intuit Assist GIF, 5s timer)
- `report`: left 80%, `AgentReportPane` fills right (slide-in from right)
- `closing`: right panel slides out (350ms), then snaps back to `idle`
- `yoyExpanded`: boolean — when true, pink highlight + CGDS "-15%" badge appear on 1040 line 1a
- `selectedField`: string | null — drives cross-document highlight between 1040 overlay and W-2 detail

**Entry via URL param:** `/#/data-review?agent=true` auto-triggers `agentView='loading'` on mount (used by SmartReturn "Review the return" button which opens this URL in a new tab).

### Cross-document highlighting
- `selectedField='wages'` → pink highlight appears on 1040 at `left:82.4%, top:56.9%`
- `SourcesToast` appears via `getBoundingClientRect` on `highlightRef` (fixed positioning)
- 1040 overlays use `container-type: inline-size` + `cqw` units so they scale with zoom

### Zoom on 1040 and W-2
- 1040: default 50% zoom, zoom controls in toolbar. Uses `ZOOM_LEVELS = [0.5, 0.75, 1.0, 1.25, 1.5]`, `useState(0)` = 50%
- W-2 (DocumentPreview): same pattern, `useState(0)` = 50% default

---

## Critical Rules & Gotchas

### IDS Button goes green
Every page with IDS Buttons needs this useEffect:
```tsx
useEffect(() => {
  const el = document.documentElement
  el.setAttribute('data-theme', 'intuit')
  el.style.setProperty('--color-action-standard', '#205ea3')
  el.style.setProperty('--color-action-standard-hover', '#174d87')
  el.style.setProperty('--color-action-standard-active', '#174d87')
  return () => {
    el.style.removeProperty('--color-action-standard')
    // etc.
  }
}, [])
```
Without this, localStorage can save a non-intuit theme and buttons render green.

### Font family — exact string matters
```css
font-family: var(--font-name-body, 'Avenir Next forINTUIT', sans-serif);
```
`'AvenirNext forINTUIT'` (no space) breaks font rendering. Always use the token.

### Background color — page secondary
```css
background: var(--page\/background\/secondary, #f0f4f6);
```
The fallback `#f0f4f6` is correct. `#f4f5f8` and `#ffffff` are wrong for page backgrounds.

### CGDS Badge vs IDS Badge
- For colored status badges (e.g., attention/red "-15%"): use `@cgds/badge` with `status="attention"`
- For neutral counts/labels: `@ids-ts/badge` is fine

### IDS Button CSS import
Every file using `@ids-ts/button` needs:
```tsx
import '@ids-ts/button/dist/main.css'
```

### Figma asset URLs expire in 7 days
`LeftNavPTO.tsx` uses hardcoded Figma asset URLs (for nav icons). If they break, run `get_design_context` on the LeftNavPTO Figma node to get fresh URLs.

### `setSelectedField(null)` on mount
`DataReviewPage.tsx` has `useEffect(() => { setSelectedField(null) }, [])` to prevent HMR state bleed showing the pink highlight on initial load.

### `layoutSizingHorizontal/Vertical = 'FILL'` (Figma plugin only)
Must be set AFTER `parent.appendChild(child)`. Not relevant to app code but relevant if using `use_figma`.

---

## Key Design Tokens in Use

```css
/* Colors */
--color-action-standard: #205ea3          /* IDS blue */
--page\/background\/secondary: #f0f4f6    /* page bg */
--page\/background\/primary: #ffffff      /* card/panel bg */
--text\/primary: #21262a                  /* body text */

/* Typography */
--font-name-body: 'Avenir Next forINTUIT' /* always use token, not raw string */

/* Animation */
--duration-transform-fast: 350ms          /* panel slide in/out */
--duration-appear-emphasize-fast: 500ms   /* right panel slide-from-left */
--ease-appear-emphasize: ...              /* elastic overshoot on panel appear */
```

---

## CSS Animation Patterns

### Agent panel slide in (right → center)
```css
@keyframes panelSlideIn {
  from { opacity: 0; transform: translateX(100%); }
}
```

### Agent panel slide out (center → right)
```css
@keyframes panelSlideOut {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(100%); }
}
.panelClosing { animation: panelSlideOut var(--duration-transform-fast, 350ms) ... }
```

### Right panel re-appear (left sweep with elastic)
```css
@keyframes rightPanelSlideFromLeft {
  from { opacity: 0; transform: translateX(-60px); box-shadow: -8px 0 24px rgba(0,0,0,0.15); }
}
.rightPanelFadeIn { animation: rightPanelSlideFromLeft var(--duration-appear-emphasize-fast, 500ms) ... }
```

---

## File Structure Quick Reference

```
src/
├── App.tsx                          ← Routes (add new routes here)
├── pages/
│   ├── SmartReturnPage.tsx          ← Screen 1
│   ├── SmartReturnHeader.tsx        ← Shared tab header
│   ├── CheckReturnPage.tsx          ← Screen 33
│   ├── ReturnInsightsPage.tsx       ← Screen 34
│   ├── DataReviewPage.tsx           ← Screen 2-8 orchestrator
│   ├── DataReviewPopout.tsx         ← Popout window (standalone)
│   └── data-review/
│       ├── LeftNavPTO.tsx           ← ProConnect left nav (shared)
│       ├── LeftPanel1040.tsx        ← 1040 PDF viewer with overlays
│       ├── ReviewTab.tsx            ← W-2 / 1099 / K-1 top tabs
│       ├── DocumentPreview.tsx      ← W-2 / 1099 / K-1 image viewer
│       ├── DetailFields.tsx         ← W-2 editable field rows
│       ├── DetailFields1099.tsx     ← 1099-INT field rows
│       ├── DetailFieldsK1.tsx       ← K-1 field rows
│       ├── AgentLoadingPane.tsx     ← Loading screen (Intuit Assist GIF)
│       ├── AgentReportPane.tsx      ← Tax Prep Agent report panel
│       ├── SourcesToast.tsx         ← Hover toast on 1040 pink highlight
│       └── SubTab.tsx               ← Bing Equipment / Tech Circle sub-tabs
├── styles/
│   ├── SmartReturnPage.module.css
│   ├── CheckReturnPage.module.css
│   ├── ReturnInsightsPage.module.css
│   └── data-review/
│       ├── DataReviewPage.module.css
│       ├── AgentReportPane.module.css
│       ├── AgentLoadingPane.module.css
│       ├── LeftPanel1040.module.css
│       ├── DocumentPreview.module.css
│       ├── DetailFields.module.css
│       ├── ReviewTab.module.css
│       ├── DragHandle.module.css
│       └── SourcesToast.module.css
└── assets/
    ├── w2-bing-equipment.png
    ├── w2-tech-circle.png
    ├── 1099-int-megabank.png
    ├── k1-easy-money.png
    ├── intuit-assist-loading.gif
    └── icons/
        └── intuit-assist.svg
```

---

## What's Left / Potential Next Steps

Based on where we stopped, these are possible next screens:

- **Screen 9+** — More data review sub-flows (after W-2 review, moving to 1099/K-1 deeper review)
- **Data Review continued** — Any remaining screens in the Tax Prep Agent flow that weren't built
- **Check Return deeper** — The Check Navigation items (Federal Tax Summary rows expandable, California Tax Summary, etc.)
- **Return Insights scroll** — Figma image already in place; may need to verify image is current (7-day expiry on Figma asset URL in ReturnInsightsPage.tsx)

**Ask the user** what screen to build next and get the Figma URL before starting anything.

---

## How to Start a New Session

1. Read this file (`HANDOFF.md`)
2. Ask user: "Which screen are we working on next? Share the Figma URL."
3. Run `get_design_context` on the Figma node — always before building
4. Check if any IDS/CGDS components are needed that aren't already imported
5. Build, then visually verify with preview screenshot
6. Commit when done

**Never assume colors, spacing, or font weights. Always get Figma design context first.**
