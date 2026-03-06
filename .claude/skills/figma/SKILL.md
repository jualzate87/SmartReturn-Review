---
name: figma
description: Build an IDS prototype from a Figma design URL or pasted Figma export. Use when the user provides a Figma link or Figma design data.
argument-hint: "Figma URL or paste design data"
user-invocable: true
model: inherit
---

Build an IDS prototype from this Figma design: $ARGUMENTS

## Prerequisites
This skill uses the Figma MCP to fetch design data. If the Figma MCP is not configured:
1. Ensure `.mcp.json` exists in the project root with the Figma MCP server URL
2. You'll need a Figma personal access token — set it as `FIGMA_API_KEY` in your environment
3. If MCP isn't available, you can paste Figma plugin HTML export directly as the argument instead of a URL

## 1. Read the Figma Workflow Rules
Read `.cursor/rules/figma.mdc` first — it defines the mandatory Figma-to-code workflow.

## 2. Fetch the Figma Design
Use the Figma MCP to fetch design data from the provided Figma URL. This retrieves the actual design data — layers, components, styles, and structure — directly from Figma.

If the Figma MCP is not available, ask the designer to paste the Figma plugin HTML export instead.

## 3. Analyze the Design
Follow the analysis workflow from `figma.mdc`:
- **Identify IDS components** — map Figma components to `@ids-ts/*` packages
- **Extract design tokens** — colors (hex values), spacing (px values), typography, border radius
- **Map tokens** — match extracted values to IDS design tokens by reading the relevant token rule files:
  - Colors: `.cursor/rules/tokens/intuit/color.mdc`
  - Spacing: `.cursor/rules/tokens/intuit/space.mdc`
  - Typography: `.cursor/rules/tokens/intuit/fontSize.mdc`, `fontWeight.mdc`, `fontFamily.mdc`, `lineHeight.mdc`
  - Radius: `.cursor/rules/tokens/intuit/radius.mdc`
  - Elevation: `.cursor/rules/tokens/intuit/elevation.mdc`

Present the analysis to the designer before writing any code:
- List of IDS components detected
- Design tokens extracted and mapped
- Any gaps (Figma elements without IDS equivalents)

## 4. Read Component Rules
For each identified `@ids-ts/*` component, read its rule file at `.cursor/rules/components/<name>.mdc`.

## 5. Build the Prototype
After the designer confirms the analysis:
- Write code in `src/App.tsx` and `src/styles/App.module.css`
- Use `@ids-ts/*` components with the correct props and variants
- Apply extracted design tokens as CSS variables
- Match the Figma layout using Flexbox/Grid
- Install any missing packages with `yarn add @ids-ts/<name>`

## 6. Start the Dev Server
Run `npm run dev` to preview at `http://localhost:5174`.

## 7. Compare & Iterate
Explain what was built and note any differences from the Figma design. Offer to adjust.

## Evaluation Criteria
Before finishing, verify:
1. All components from `@ids-ts/*` only
2. Every component CSS imported (`@ids-ts/<name>/dist/main.css`)
3. All visual values via design tokens (zero hardcoded)
4. Semantic tokens preferred over primitives
5. Icons from `@design-systems/icons` only
6. No wrapper components
7. CSS Modules only (no Tailwind/SASS/CSS-in-JS)
8. Flexbox/Grid for layout
9. Semantic HTML
10. Responsive at 320px, 768px, 1200px
