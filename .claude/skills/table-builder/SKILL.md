---
name: table-builder
description: Build a data table with IDS components from a list of columns. Use when the user wants to create a table with data, sorting, pagination, or row actions.
argument-hint: "column names (e.g., name, email, status, date)"
user-invocable: true
model: inherit
---

Build an IDS data table with these columns: $ARGUMENTS

## 1. Read the Table Patterns
Read `.claude/skills/table-builder/templates/table-patterns.md` for column type mapping, sample data patterns, and configuration options.

## 2. Read Component Rules
Read the rule files for table-related components:
- `.cursor/rules/components/table.mdc`
- `.cursor/rules/components/pagination.mdc`
- `.cursor/rules/components/badge.mdc` (for status columns)
- `.cursor/rules/components/button.mdc` (for actions)
- `.cursor/rules/components/dropdownbutton.mdc` (for row action menus)
- `.cursor/rules/components/textfield.mdc` (for search)
- `.cursor/rules/components/chip.mdc` (for filters)
- `.cursor/rules/components/typography.mdc`

Read `.cursor/rules/design-system.mdc` for core rules.

## 3. Parse the Column List
For each column the user listed, determine:
- **Column type:** text, email, status, date, number, currency, actions
- **Header label:** Human-readable header from the column name
- **Sortable:** Should this column be sortable?
- **Cell renderer:** Plain text, Badge, Link, formatted date, etc.

Use the column type mapping from `table-patterns.md`.

## 4. Build the Table
Write the table to `src/App.tsx` and `src/styles/App.module.css`.

Include:
- Table header with column labels
- 5-10 rows of realistic sample data
- Status columns rendered as `Badge` components
- A search/filter bar above the table
- Pagination below the table
- Row actions (view, edit, delete) via `DropdownButton`
- Responsive behavior (horizontal scroll on mobile)

## 5. Install & Preview
Install missing packages with `yarn add`, start the dev server with `npm run dev`.

## 6. Explain & Customize
List the columns, their types, and rendering. Offer to:
- Add more columns
- Change column types
- Add/remove sorting
- Adjust sample data
- Add bulk actions

## Evaluation Criteria
1. Table uses `@ids-ts/table`
2. Every component CSS imported
3. All styling via design tokens
4. Status columns use `@ids-ts/badge`
5. Pagination uses `@ids-ts/pagination`
6. Responsive with horizontal scroll on mobile
7. Realistic sample data
