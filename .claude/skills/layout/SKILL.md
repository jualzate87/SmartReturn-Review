---
name: layout
description: Generate a page layout structure using IDS components and tokens. Use when the user wants a sidebar, dashboard, split-view, or other layout pattern.
argument-hint: "layout type (sidebar, dashboard, split-view, centered, holy-grail)"
user-invocable: true
model: inherit
---

Generate an IDS layout: $ARGUMENTS

## 1. Read the Layout Templates
Read `.claude/skills/layout/templates/layouts.md` for available layout patterns and their implementations.

## 2. Read the Rules
Read `.cursor/rules/design-system.mdc` for core IDS rules.
Read `.cursor/rules/tokens/intuit/space.mdc` for spacing tokens.
Read `.cursor/rules/tokens/intuit/color.mdc` for background and border color tokens.

## 3. Match the Request to a Layout Pattern
Identify which layout pattern best matches the user's request:
- **sidebar** — fixed sidebar + scrollable content area
- **dashboard** — header + sidebar + grid of cards/widgets
- **header-content** — sticky header + full-width content
- **split-view** — two equal or proportional panels side by side
- **centered** — centered content with max-width container
- **holy-grail** — header + sidebar + content + right sidebar + footer

If the request doesn't match exactly, pick the closest and adapt.

## 4. Identify Components
Determine which IDS components are needed for the layout. Common ones:
- `@ids-ts/product-header` for app headers
- `@ids-ts/left-navigation` for sidebars
- `@ids-ts/panel` for content sections
- `@ids-ts/cards` for dashboard widgets
- `@ids-ts/tabs` for content switching

Read each component's rule file at `.cursor/rules/components/<name>.mdc`.

## 5. Build the Layout
Write the layout to `src/App.tsx` and `src/styles/App.module.css`.
- Use CSS Grid or Flexbox for the layout structure
- Use design tokens for all spacing, colors, and sizing
- Make it responsive (mobile-first with tablet and desktop breakpoints)
- Include placeholder content so the structure is visible

## 6. Install & Preview
Install missing packages with `yarn add`, start the dev server with `npm run dev`.

## 7. Explain & Offer Customization
Describe the layout structure and offer to customize it (swap sections, adjust proportions, add components).

## Evaluation Criteria
1. All components from `@ids-ts/*` only
2. Every component CSS imported
3. All visual values via design tokens
4. CSS Grid/Flexbox for layout — no absolute positioning
5. Responsive at 320px, 768px, 1200px
6. Semantic HTML structure (header, nav, main, aside, footer)
