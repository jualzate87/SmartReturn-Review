---
name: compose
description: Help combining multiple IDS components together. Use when the user wants to compose several components into a cohesive UI pattern.
argument-hint: "components to combine"
user-invocable: true
model: inherit
---

Help compose these IDS components together: $ARGUMENTS

## 1. Identify the Components
Parse the user's request to identify which `@ids-ts/*` components they want to combine. If the names are ambiguous, clarify.

## 2. Read Component Rules
For each component, read its rule file at `.cursor/rules/components/<name>.mdc`. Pay attention to:
- Required props
- Children/slot patterns
- Composition constraints (what can nest inside what)

## 3. Read the Design System Rules
Read `.cursor/rules/design-system.mdc` for overall composition patterns.

## 4. Design the Composition
Figure out how the components fit together:
- **Nesting:** Which component is the parent, which are children?
- **Layout:** How should they be arranged? (Flexbox/Grid)
- **Spacing:** What tokens should control gaps between components?
- **Interactions:** Do any components need to share state?

## 5. Generate the Code
Write a working composition example showing:
- All required imports (components + CSS)
- The JSX with correct nesting and props
- Any CSS needed for layout (using tokens)

## 6. Offer to Add
Ask if the designer wants this composition added to their prototype in `src/App.tsx` and `src/styles/App.module.css`.

## Example Compositions
- **Card with actions:** `Cards` → `Typography` + `Button`
- **Form field with validation:** `TextField` + `InlineValidationMessage`
- **Navigation with badges:** `Tabs` + `Badge`
- **Header with dropdown:** `ProductHeader` + `DropdownButton`
- **Modal with form:** `ModalDialog` → `TextField` + `Dropdown` + `Button`

## Evaluation Criteria
1. All components from `@ids-ts/*` only
2. Every component CSS imported
3. All spacing/styling via design tokens
4. No wrapper components — use IDS components directly
5. Correct nesting and prop usage per `.mdc` files
