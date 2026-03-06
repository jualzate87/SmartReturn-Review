---
name: explain
description: Explain the current prototype in plain language. Use when the user wants to understand what components, tokens, and patterns are in their current prototype.
user-invocable: true
model: inherit
---

Explain the current prototype in plain language.

## 1. Read the Current Prototype
Read `src/App.tsx` and `src/styles/App.module.css`.

## 2. Identify Everything in Use
- **Components:** List every `@ids-ts/*` component and what it's used for
- **Icons:** List every `@design-systems/icons` icon and its purpose
- **Tokens:** List design tokens used in `App.module.css` and what they control
- **Layout:** Describe the overall layout structure (Flexbox/Grid patterns)

## 3. Present the Explanation

Write a designer-friendly explanation structured as:

### What This Prototype Does
One paragraph describing the overall UI and its purpose.

### Components Used
| Component | Package | Purpose |
|-----------|---------|---------|
| (for each component) |

### Design Tokens Applied
| Token | Property | Purpose |
|-------|----------|---------|
| (for key tokens used) |

### Layout Structure
Describe the layout in plain language — "sidebar on the left, main content on the right, header across the top" etc.

### Interactions
List any interactive behaviors — button clicks, dropdowns opening, form submissions, etc.

### What's Custom vs. IDS
Note anything that's custom CSS vs. provided by IDS components.

## Rules
- Read the actual code — don't guess
- Use designer-friendly language — avoid React jargon
- Be concise but complete — don't skip components or tokens
- If the prototype is empty or minimal, say so clearly
