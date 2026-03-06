---
name: wireframe
description: Generate a quick wireframe using IDS skeleton loading components. Use when the user wants a low-fidelity structural preview before building the full prototype.
argument-hint: "describe the layout (e.g., dashboard with sidebar)"
user-invocable: true
model: inherit
---

Generate a wireframe using IDS skeleton components: $ARGUMENTS

## 1. Read the Rules
Read `.cursor/rules/components/skeleton.mdc` for the Skeleton component API.
Read `.cursor/rules/design-system.mdc` for core rules.
Read `.cursor/rules/tokens/intuit/space.mdc` for spacing tokens.

## 2. Parse the Layout Description
Identify the structural elements the user wants:
- Header area
- Sidebar / navigation
- Content areas
- Cards / widgets
- Tables / lists
- Forms
- Footer

## 3. Map to Skeleton Elements
Replace content with Skeleton placeholders:

| UI Element | Skeleton Representation |
|-----------|----------------------|
| Heading | `<Skeleton variant="text" width="200px" height="32px" />` |
| Paragraph | Multiple `<Skeleton variant="text" />` lines |
| Avatar | `<Skeleton variant="circle" width="40px" height="40px" />` |
| Button | `<Skeleton variant="rect" width="120px" height="40px" />` |
| Card | `<Skeleton variant="rect" height="200px" />` |
| Image | `<Skeleton variant="rect" height="150px" />` |
| Table row | `<Skeleton variant="text" />` repeated for columns |
| Nav item | `<Skeleton variant="text" width="150px" />` |
| Input field | `<Skeleton variant="rect" height="40px" />` |

## 4. Build the Wireframe
Write the wireframe to `src/App.tsx` and `src/styles/App.module.css`.

Use:
- `@ids-ts/skeleton` for all placeholder content
- CSS Grid/Flexbox for the layout structure
- Design tokens for spacing
- Proper semantic HTML (header, nav, main, aside, footer)
- Comments in JSX marking what each skeleton represents

Example:
```tsx
{/* Header */}
<header className={styles.header}>
  <Skeleton variant="text" width="150px" height="24px" /> {/* Logo */}
  <Skeleton variant="text" width="300px" height="20px" /> {/* Nav links */}
</header>
```

## 5. Install & Preview
Install `@ids-ts/skeleton` with `yarn add` if needed, start dev server with `npm run dev`.

## 6. Explain & Offer Upgrade
Describe the wireframe structure and ask:
- "Does this layout match what you had in mind?"
- "Want me to fill in real IDS components now?"

## Rules
- Use `@ids-ts/skeleton` for all placeholder content
- Import the skeleton CSS: `import '@ids-ts/skeleton/dist/main.css'`
- Use design tokens for all spacing
- Add JSX comments explaining what each skeleton represents
- Make the wireframe responsive
- Keep it simple — the point is structure, not detail
