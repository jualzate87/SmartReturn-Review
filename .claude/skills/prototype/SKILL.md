---
name: prototype
description: Build an IDS prototype from a text description. Use when the user describes a UI they want built with Intuit Design System components.
argument-hint: "describe the UI you want to build"
user-invocable: true
model: inherit
---

Build an IDS prototype from this description: $ARGUMENTS

Follow these steps in order:

## 1. Understand the Request
Read the description carefully. Identify what UI elements, layouts, and interactions are needed. If the description is vague, ask one clarifying question before proceeding.

## 2. Read the Rules
Read `.cursor/rules/design-system.mdc` to refresh the core IDS rules.

## 3. Identify Components
Figure out which `@ids-ts/*` components are needed. For each one, read its rule file at `.cursor/rules/components/<name>.mdc` to understand its props and usage.

## 4. Identify Tokens
If specific colors, spacing, or typography are mentioned, read the relevant token files:
- Colors: `.cursor/rules/tokens/intuit/color.mdc`
- Spacing: `.cursor/rules/tokens/intuit/space.mdc`
- Font sizes: `.cursor/rules/tokens/intuit/fontSize.mdc`
- Font weights: `.cursor/rules/tokens/intuit/fontWeight.mdc`
- Border radius: `.cursor/rules/tokens/intuit/radius.mdc`
- Elevation/shadows: `.cursor/rules/tokens/intuit/elevation.mdc`

For a full overview of available token categories, read `.cursor/rules/tokens.mdc`.

## 5. Build the Prototype
Write the code in `src/App.tsx` and styles in `src/styles/App.module.css`.

Rules to follow:
- Use `@ids-ts/*` components directly (no wrappers)
- Import each component's CSS: `import '@ids-ts/<name>/dist/main.css'`
- Use CSS Modules with design tokens for all custom styling
- Use `@design-systems/icons` for any icons (read `.cursor/rules/icons.mdc` if needed)
- Use Flexbox/Grid for layout
- Keep everything in `App.tsx` — this is a prototype, not a production app

## 6. Install Missing Packages
If any `@ids-ts/*` packages are used but not in `package.json`, install them:
```
yarn add @ids-ts/<package-name>
```

## 7. Start the Dev Server
Run `npm run dev` to start the preview at `http://localhost:5174`.

## 8. Explain What You Built
Give a brief, plain-language summary:
- What components were used and why
- What design tokens were applied
- Any notes about interactions or responsive behavior
- If anything was missing from IDS and had to be custom-built, flag it

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
