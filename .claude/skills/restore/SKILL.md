---
name: restore
description: Restore a previously saved prototype snapshot. Use when the user wants to go back to a saved version.
argument-hint: "snapshot name to restore"
user-invocable: true
model: inherit
---

Restore a previously saved prototype snapshot: $ARGUMENTS

Follow these steps in order:

## 1. Parse the Snapshot Name

Extract the snapshot name from `$ARGUMENTS`.

## 2. Verify the Snapshot Exists

Check if `.claude/snapshots/<name>/` exists and contains `App.tsx` and `App.module.css`.

- If the snapshot does **not** exist, list all available snapshots in `.claude/snapshots/` and ask the user which one they want to restore.
- If no snapshots exist at all, tell the user: "No snapshots found. Use `/snapshot <name>` to save your current prototype first."
- Do NOT proceed until a valid snapshot is identified.

## 3. Auto-Save Current State

Before restoring, automatically save the current prototype so nothing is lost:

1. Generate a backup name using the format `before-restore-YYYY-MM-DD-HHmm` (using the current timestamp).
2. Create the directory `.claude/snapshots/<backup-name>/`
3. Read `src/App.tsx` and write its contents to `.claude/snapshots/<backup-name>/App.tsx`
4. Read `src/styles/App.module.css` and write its contents to `.claude/snapshots/<backup-name>/App.module.css`

## 4. Restore the Snapshot

1. Read `.claude/snapshots/<name>/App.tsx` and write its contents to `src/App.tsx`
2. Read `.claude/snapshots/<name>/App.module.css` and write its contents to `src/styles/App.module.css`

## 5. Check for Missing Packages

Read the restored `src/App.tsx` and look for any `@ids-ts/*` imports. Check `package.json` to see if all referenced packages are installed.

- If any packages are missing, run `yarn add <package1> <package2> ...` to install them.

## 6. Confirm

Tell the user:

> Restored snapshot **<name>**. Your previous state was auto-saved as **<backup-name>**.

## Rules

- Always auto-save before restoring — the user should never lose work
- Verify the snapshot exists before copying anything
- Check for missing packages after restore and install if needed
- Never delete any snapshots during a restore
