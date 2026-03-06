---
name: form
description: Build a form with IDS components from a list of fields. Use when the user wants to create a form with text fields, dropdowns, checkboxes, validation, or other form elements.
argument-hint: "list of form fields (e.g., name, email, message)"
user-invocable: true
model: inherit
---

Build an IDS form with these fields: $ARGUMENTS

## 1. Read the Form Patterns
Read `.claude/skills/form/templates/form-patterns.md` for field type mapping and validation patterns.

## 2. Read Component Rules
Read the rule files for form-related components:
- `.cursor/rules/components/textfield.mdc`
- `.cursor/rules/components/textarea.mdc`
- `.cursor/rules/components/dropdown.mdc`
- `.cursor/rules/components/checkbox.mdc`
- `.cursor/rules/components/radio.mdc` (if radio buttons needed)
- `.cursor/rules/components/datepicker.mdc` (if date fields needed)
- `.cursor/rules/components/switch.mdc` (if toggles needed)
- `.cursor/rules/components/inlinevalidationmessage.mdc`
- `.cursor/rules/components/button.mdc`

Read `.cursor/rules/design-system.mdc` for core rules.

## 3. Parse the Field List
For each field the user listed, determine:
- **Field type:** text, email, password, number, date, select, checkbox, radio, textarea, toggle
- **Label:** Human-readable label from the field name
- **Validation:** Required? Pattern? Min/max length?
- **IDS component:** Which `@ids-ts/*` component to use

Use the field type mapping from `form-patterns.md`.

## 4. Build the Form
Write the form to `src/App.tsx` and `src/styles/App.module.css`.

Include:
- Proper `<form>` element with `onSubmit` handler
- Labels for every field (accessibility)
- Validation messages for required fields
- Submit and cancel buttons
- Logical field grouping with spacing
- Responsive layout (single column on mobile, optionally 2-column on desktop)

## 5. Install & Preview
Install missing packages with `yarn add`, start the dev server with `npm run dev`.

## 6. Explain & Customize
List the fields created, their types, and validation rules. Offer to:
- Add more fields
- Change field types
- Adjust validation rules
- Change the layout (single/multi column)

## Evaluation Criteria
1. All form components from `@ids-ts/*`
2. Every component CSS imported
3. All spacing/styling via design tokens
4. Every field has an accessible label
5. Validation messages use `@ids-ts/inline-validation-message`
6. Form is inside a `<form>` element
7. Responsive layout
