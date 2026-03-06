---
name: token-preview
description: Render a visual preview of IDS design tokens in the prototype. Use when the user wants to see colors, spacing, or typography tokens as a visual reference.
argument-hint: "token category (colors, spacing, typography, all)"
user-invocable: true
model: inherit
---

Render a visual token preview: $ARGUMENTS

1. **Determine the category** from `$ARGUMENTS`:
   - "colors" or "color" → color token swatches
   - "spacing" or "space" → spacing scale visualization
   - "typography" or "type" or "fonts" → typography samples
   - "elevation" or "shadows" → elevation/shadow preview
   - "radius" or "border-radius" → border radius preview
   - "all" or no argument → show all categories

2. **Read the relevant token files:**
   - Colors: `.cursor/rules/tokens/intuit/color.mdc`
   - Spacing: `.cursor/rules/tokens/intuit/space.mdc`
   - Typography: `.cursor/rules/tokens/intuit/fontSize.mdc`, `fontWeight.mdc`, `fontFamily.mdc`, `lineHeight.mdc`
   - Elevation: `.cursor/rules/tokens/intuit/elevation.mdc`
   - Radius: `.cursor/rules/tokens/intuit/radius.mdc`

3. **Generate a visual preview page** in `src/App.tsx` and `src/styles/App.module.css` that renders token swatches:

   - **Color tokens:** Rows of colored squares with token name and value below each
   - **Spacing tokens:** Bars of increasing width showing each space token
   - **Typography tokens:** Sample text at each font size with the token name
   - **Elevation tokens:** Cards with each elevation level applied
   - **Radius tokens:** Boxes with each border-radius applied

   Use the actual CSS custom properties (e.g., `var(--color-text-primary)`) so the preview is live and theme-aware.

4. **Auto-save the current prototype first** — before overwriting App.tsx, save the current state as a snapshot named `before-token-preview` (create `.claude/snapshots/before-token-preview/` and copy the files).

5. **Start the dev server** with `npm run dev`.

6. **Remind the user** they can run `/restore before-token-preview` to get back to their prototype.

Rules:
- Use only `var(--token-name)` syntax — the preview should be live, not hardcoded values
- Group tokens by category with clear headings
- Keep the layout clean and scannable
- Always auto-save before overwriting the prototype
