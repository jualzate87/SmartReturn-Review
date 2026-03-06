---
name: page
description: Generate a complete page prototype from a page type. Use when the user wants a settings page, form page, list page, table page, detail page, empty state, error page, or onboarding page.
argument-hint: "page type (settings, form, list, table, detail, empty-state, error, onboarding)"
user-invocable: true
model: inherit
---

Generate an IDS page prototype: $ARGUMENTS

## 1. Read the Page Templates
Read `.claude/skills/page/templates/page-templates.md` for available page patterns and their component compositions.

## 2. Read the Rules
Read `.cursor/rules/design-system.mdc` for core IDS rules.
Read `.cursor/rules/tokens.mdc` for token overview.

## 3. Match the Request to a Page Type
Identify which page template best matches:
- **settings** — toggle switches, sections, save button
- **form** — input fields, validation, submit action
- **list** — scrollable list with items, search, filters
- **table** — data table with columns, sorting, pagination
- **detail** — single item view with metadata and actions
- **empty-state** — placeholder when no data exists
- **error** — error page (404, 500, permission denied)
- **onboarding** — step-flow with guided setup

## 4. Identify Components
For the chosen page type, determine which `@ids-ts/*` components are needed. Read each component's rule file at `.cursor/rules/components/<name>.mdc`.

## 5. Build the Page
Write the page to `src/App.tsx` and `src/styles/App.module.css`.
- Include realistic placeholder content (names, dates, descriptions)
- Wire up basic interactions (toggles toggle, buttons have hover states)
- Make it responsive
- Use semantic HTML structure

## 6. Install & Preview
Install missing packages with `yarn add`, start the dev server with `npm run dev`.

## 7. Explain & Customize
Describe what was built, what components are used, and offer to customize content, add sections, or adjust the layout.

## Evaluation Criteria
1. All components from `@ids-ts/*` only
2. Every component CSS imported
3. All visual values via design tokens
4. Semantic tokens preferred over primitives
5. Icons from `@design-systems/icons` only
6. No wrapper components
7. CSS Modules only
8. Flexbox/Grid for layout
9. Semantic HTML
10. Responsive at 320px, 768px, 1200px
