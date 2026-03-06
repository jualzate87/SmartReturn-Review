---
name: snapshots
description: List all saved prototype snapshots. Use when the user wants to see what versions they've saved.
user-invocable: true
model: inherit
---

List all saved prototype snapshots.

Follow these steps in order:

## 1. Find All Snapshots

List all directories inside `.claude/snapshots/`.

## 2. Handle Empty State

If no snapshots exist, tell the user:

> No snapshots saved yet. Use `/snapshot <name>` to save your current prototype.

Then stop — do not continue to step 3.

## 3. Build the Snapshot List

For each snapshot directory, gather:
- **Name** — the directory name
- **Saved** — the file modification timestamp of `App.tsx` in that snapshot (use `ls -l` or `stat` to get the date)
- **Preview** — read the first 15-20 lines of the snapshot's `App.tsx` and extract a brief description:
  - Look for a comment at the top of the file (e.g., `// Dashboard prototype`)
  - Or identify the main component/layout from the JSX (e.g., "Form with text fields and dropdown")
  - Keep the preview to one short sentence

## 4. Sort and Display

Sort snapshots by date, **newest first**.

Present as a formatted list:

> **Snapshots**
>
> 1. **<name>** — <date> — <preview>
> 2. **<name>** — <date> — <preview>
> ...

## 5. Remind About Commands

After the list, add:

> Use `/restore <name>` to go back to a saved version, or `/snapshot <name>` to save a new one.

## Rules

- Sort by date, newest first
- Keep the preview brief — just enough to identify the version
- Never modify any files when listing snapshots
- If a snapshot directory is missing `App.tsx`, skip it and note it as "(incomplete snapshot)"
