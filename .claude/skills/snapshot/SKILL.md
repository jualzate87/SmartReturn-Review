---
name: snapshot
description: Save the current prototype as a named snapshot. Use when the user wants to save their work before experimenting or making changes.
argument-hint: "snapshot name (e.g., v1, before-sidebar, working-version)"
user-invocable: true
model: inherit
---

Save the current prototype as a named snapshot: $ARGUMENTS

Follow these steps in order:

## 1. Parse the Snapshot Name

- If `$ARGUMENTS` is provided, use it as the snapshot name.
- If no name is given, generate one from the current timestamp in the format `snapshot-YYYY-MM-DD-HHmm` (e.g., `snapshot-2024-03-06-1430`).

## 2. Sanitize the Name

Clean the name to be filesystem-safe:
- Convert to lowercase
- Replace spaces with hyphens
- Remove any characters that aren't alphanumeric, hyphens, or underscores
- Trim leading/trailing hyphens

## 3. Check for Existing Snapshot

Check if `.claude/snapshots/<name>/` already exists.
- If it does, **warn the user** and ask for confirmation before overwriting.
- Do NOT proceed until they confirm.

## 4. Create the Snapshot

1. Create the directory `.claude/snapshots/<name>/`
2. Read `src/App.tsx` and write its contents to `.claude/snapshots/<name>/App.tsx`
3. Read `src/styles/App.module.css` and write its contents to `.claude/snapshots/<name>/App.module.css`

## 5. Confirm

Tell the user:

> Saved snapshot **<name>**. Use `/restore <name>` to go back to this version.

## Rules

- Only snapshot `App.tsx` and `App.module.css` — nothing else
- Never modify the current prototype files when snapshotting
- Keep snapshot names short and filesystem-safe
- Do not create any additional files or metadata
