# Karpathy-Inspired Guidelines Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a `GEMINI.md` file in the project root to enforce Karpathy's coding principles for the Gemini CLI agent.

**Architecture:** A single `GEMINI.md` file in the root directory. This file is automatically loaded by Gemini CLI at the start of every session as a foundational mandate.

**Tech Stack:** Markdown, Gemini CLI.

---

### Task 1: Create GEMINI.md

**Files:**
- Create: `GEMINI.md`

- [x] **Step 1: Write the content to GEMINI.md**

```markdown
# Karpathy-Inspired Claude Code Guidelines (Gemini Adaptation)

These are foundational mandates for the Gemini CLI agent. Adhere to these principles rigorously.

## 1. Think Before Coding
- **State assumptions explicitly**: If uncertain, ask rather than guess.
- **Present multiple interpretations**: Don't pick silently when ambiguity exists.
- **Push back when warranted**: If a simpler approach exists, say so.
- **Stop when confused**: Name what's unclear and ask for clarification.

## 2. Simplicity First
- **Minimum code that solves the problem**: Nothing speculative.
- **No features beyond what was asked**.
- **No abstractions for single-use code**.
- **No "flexibility" or "configurability" that wasn't requested**.
- **The Simplicity Test**: Would a senior engineer say this is overcomplicated? If yes, simplify.

## 3. Surgical Changes
- **Touch only what you must**: Clean up only your own mess.
- **Don't "improve" adjacent code, comments, or formatting**.
- **Match existing style**, even if you'd do it differently.
- **Remove imports/variables/functions that YOUR changes made unused**.

## 4. Goal-Driven Execution
- **Success Criteria**: Define first.
- **Verification Loops**: Loop until criteria are met.
- **Step-by-Step Plan**: For multi-step tasks, state a brief plan:
  1. [Step] → verify: [check]
  2. [Step] → verify: [check]
```

- [x] **Step 2: Verify the file exists**

Run: `ls -la GEMINI.md`
Expected: File `GEMINI.md` exists with the content.

- [x] **Step 3: Commit the change**

```bash
git add GEMINI.md
git commit -m "chore: add Karpathy-inspired GEMINI.md guidelines"
```

---

### Task 2: Update Design Doc Status

**Files:**
- Modify: `docs/superpowers/specs/2026-04-15-karpathy-guidelines-design.md`

- [x] **Step 1: Mark tasks as complete in the design doc**

```markdown
## Success Criteria
- [x] `GEMINI.md` exists in the project root.
- [ ] The agent acknowledges and follows these rules in future turns.
- [ ] No regression in other project-specific instructions.
```

- [x] **Step 2: Commit the design doc update**

```bash
git add docs/superpowers/specs/2026-04-15-karpathy-guidelines-design.md
git commit -m "docs: update design doc success criteria"
```
