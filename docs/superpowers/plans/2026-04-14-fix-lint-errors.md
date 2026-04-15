# Fix Linting and Project Errors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix linting errors and technical debt in the Hope Medicos project to ensure build stability and code quality.

**Architecture:** Systematic resolution of ESLint and TypeScript errors including unescaped entities, explicit 'any' types, and Next.js specific rules.

**Tech Stack:** Next.js, React, TypeScript, ESLint.

---

### Task 1: Fix Unescaped Entities in About and Policy Pages

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/privacy-policy/page.tsx`
- Modify: `app/terms-and-conditions/page.tsx`

- [ ] **Step 1: Replace unescaped characters in `app/about/page.tsx`**
  - Replace `'` with `&apos;` and `"` with `&quot;`.

- [ ] **Step 2: Replace unescaped characters in `app/privacy-policy/page.tsx`**
  - Replace `"` with `&quot;`.

- [ ] **Step 3: Replace unescaped characters in `app/terms-and-conditions/page.tsx`**
  - Replace `"` with `&quot;`.

- [ ] **Step 4: Verify changes with lint**
  Run: `npx eslint app/about/page.tsx app/privacy-policy/page.tsx app/terms-and-conditions/page.tsx`

- [ ] **Step 5: Commit**
  ```bash
  git add app/about/page.tsx app/privacy-policy/page.tsx app/terms-and-conditions/page.tsx
  git commit -m "fix: resolve unescaped entities in about and policy pages"
  ```

### Task 2: Fix Unescaped Entities in Components

**Files:**
- Modify: `src/components/sections/Hope.tsx`
- Modify: `src/components/sections/ShopNow.tsx`

- [ ] **Step 1: Replace unescaped characters in `src/components/sections/Hope.tsx`**
  - Replace `'` with `&apos;`.

- [ ] **Step 2: Replace unescaped characters in `src/components/sections/ShopNow.tsx`**
  - Replace `'` with `&apos;`.

- [ ] **Step 3: Verify changes with lint**
  Run: `npx eslint src/components/sections/Hope.tsx src/components/sections/ShopNow.tsx`

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/sections/Hope.tsx src/components/sections/ShopNow.tsx
  git commit -m "fix: resolve unescaped entities in sections"
  ```

### Task 3: Fix Next.js Link Usage and Unused Variables

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/chat/ChatWidget.tsx`

- [ ] **Step 1: Replace `<a>` with `<Link>` in `src/components/layout/Footer.tsx`**
  - Use `next/link`.

- [ ] **Step 2: Remove unused variables in `src/components/layout/Footer.tsx`, `Navbar.tsx`, and `ChatWidget.tsx`**
  - Clean up imports and local variables.

- [ ] **Step 3: Verify changes with lint**
  Run: `npx eslint src/components/layout/Footer.tsx src/components/layout/Navbar.tsx src/components/chat/ChatWidget.tsx`

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/layout/Footer.tsx src/components/layout/Navbar.tsx src/components/chat/ChatWidget.tsx
  git commit -m "fix: resolve link usage and unused variables"
  ```

### Task 4: Fix Explicit 'any' Types in Utils and Context

**Files:**
- Modify: `src/utils/aiService.ts`
- Modify: `src/utils/websiteData.ts`
- Modify: `src/context/WebsiteDataContext.tsx`
- Modify: `src/utils/firebaseHelpers.ts`

- [ ] **Step 1: Define proper types for AI config in `src/utils/aiService.ts`**
- [ ] **Step 2: Define proper types for site data in `src/utils/websiteData.ts`**
- [ ] **Step 3: Update `src/context/WebsiteDataContext.tsx` with proper types**
- [ ] **Step 4: Verify changes with lint**
  Run: `npm run lint`

- [ ] **Step 5: Commit**
  ```bash
  git add src/utils/aiService.ts src/utils/websiteData.ts src/context/WebsiteDataContext.tsx src/utils/firebaseHelpers.ts
  git commit -m "fix: resolve explicit any types and unused variables in utils"
  ```
