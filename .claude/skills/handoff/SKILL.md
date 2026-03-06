---
name: handoff
description: Generate a design handoff specification for the current prototype. Use when the user wants a component inventory, token list, and implementation notes for developers.
user-invocable: true
model: inherit
---

Generate a design handoff specification for the current prototype.

## 1. Read the Current Prototype
Read `src/App.tsx` and `src/styles/App.module.css`.

## 2. Read the Design System Rules
Read `.cursor/rules/design-system.mdc` for reference.
Read `.cursor/rules/tokens.mdc` for token categories.

## 3. Extract the Component Inventory
For each `@ids-ts/*` component used:
- **Component name** and package
- **Props** configured in the code
- **Variant** being used (if applicable)
- **Count** — how many instances

## 4. Extract the Token Inventory
For each design token used in `src/styles/App.module.css`:
- **Token name** (CSS variable)
- **Category** (color, space, font, etc.)
- **Property** it's applied to
- **Semantic meaning** (what it's styling)

## 5. Extract the Icon Inventory
For each `@design-systems/icons` icon:
- **Icon name**
- **Size** being used
- **Context** (what it represents)

## 6. Document Layout Structure
Describe the layout:
- Grid/Flexbox structure
- Responsive breakpoints and behavior
- Component hierarchy (what nests inside what)

## 7. Generate the Handoff Document

```
## Design Handoff Specification

### Overview
[One paragraph describing the prototype]

### Component Inventory
| Component | Package | Props | Instances |
|-----------|---------|-------|-----------|

### Token Inventory
| Token | Category | Applied To | Purpose |
|-------|----------|-----------|---------|

### Icon Inventory
| Icon | Size | Context |
|------|------|---------|

### Layout Structure
[Description of the layout with breakpoint behavior]

### Dependencies
```
yarn add @ids-ts/button @ids-ts/... @design-systems/icons
```

### Implementation Notes
- [Key architectural decisions]
- [Any custom CSS beyond tokens]
- [Interaction behavior]
- [Accessibility requirements]

### Files
- `src/App.tsx` — Component code
- `src/styles/App.module.css` — Styles
```

## Rules
- Read the actual code — extract real values, don't guess
- Include every component, token, and icon — nothing left undocumented
- List exact props and values, not just component names
- Note anything custom that isn't provided by IDS
- Keep it developer-friendly — this is a spec, not a tutorial
