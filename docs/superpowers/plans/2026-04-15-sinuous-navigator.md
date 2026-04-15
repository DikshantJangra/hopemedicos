# Sinuous Navigator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a dynamic, snake-like dashed SVG path that connects the Logo to the "Locate Us" button on hover, with a crawling animation and a "Focus Mode" that dims other elements.

**Architecture:** A custom hook will track the real-time coordinates of the Logo and the Locate button using `getBoundingClientRect()`. This data will feed into a dynamic SVG Bezier path with Framer Motion animating the `stroke-dashoffset` for the crawling effect.

**Tech Stack:** React (Next.js), Framer Motion, SVG, Tailwind CSS.

---

### Task 1: Setup Refs and Hover State

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Add required hooks and refs**

Add `useRef` for `logoRef` and `locateRef`. Add `isLocateHovered` state.

```tsx
// Inside Navbar component
const logoRef = useRef<HTMLDivElement>(null);
const locateRef = useRef<HTMLButtonElement | HTMLDivElement>(null);
const [isLocateHovered, setIsLocateHovered] = useState(false);
```

- [ ] **Step 2: Attach refs to elements**

Attach `logoRef` to the Logo container and `locateRef` to the `LocateUs` wrapper or button. Add hover listeners to the `LocateUs` button container.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(nav): add refs and hover state for navigator"
```

---

### Task 2: Create Dynamic Coordinate Hook

**Files:**
- Create: `src/hooks/usePathCoordinates.ts`

- [ ] **Step 1: Implement the coordinate calculation hook**

```typescript
import { useState, useEffect, RefObject } from 'react';

export function usePathCoordinates(
  containerRef: RefObject<HTMLElement>,
  startRef: RefObject<HTMLElement>,
  endRef: RefObject<HTMLElement>,
  isScrolled: boolean
) {
  const [path, setPath] = useState("");

  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current || !startRef.current || !endRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();

      // Start at right edge of logo, center Y
      const startX = startRect.right - containerRect.left;
      const startY = startRect.top + startRect.height / 2 - containerRect.top;

      // End at left edge of locate button, center Y
      const endX = endRect.left - containerRect.left;
      const endY = endRect.top + endRect.height / 2 - containerRect.top;

      // Create a sinuous S-curve (Bezier)
      const cp1X = startX + (endX - startX) * 0.3;
      const cp1Y = startY - 20; // Upward wave
      const cp2X = startX + (endX - startX) * 0.7;
      const cp2Y = startY + 20; // Downward wave

      setPath(`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`);
    };

    calculatePath();
    window.addEventListener('resize', calculatePath);
    return () => window.removeEventListener('resize', calculatePath);
  }, [isScrolled, startRef, endRef, containerRef]);

  return path;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/usePathCoordinates.ts
git commit -m "feat(hooks): add usePathCoordinates for dynamic SVG paths"
```

---

### Task 3: Implement SVG Snake Component

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Integrate the SVG layer**

Add the SVG element inside the `motion.div` of the navbar. Use the `path` from `usePathCoordinates`.

```tsx
// Inside Navbar return
const containerRef = useRef<HTMLDivElement>(null);
const snakePath = usePathCoordinates(containerRef, logoRef, locateRef, isScrolled);

// ... inside motion.div
<svg className="absolute inset-0 pointer-events-none z-0 overflow-visible">
  <motion.path
    d={snakePath}
    stroke="#f58518"
    strokeWidth="1.5"
    strokeDasharray="4 4"
    fill="none"
    initial={{ opacity: 0, strokeDashoffset: 40 }}
    animate={{ 
      opacity: isLocateHovered ? 0.4 : 0,
      strokeDashoffset: isLocateHovered ? 0 : 40 
    }}
    transition={{ 
      strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" },
      opacity: { duration: 0.3 }
    }}
  />
</svg>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(nav): implement animated snake path SVG"
```

---

### Task 4: Implement Focus Mode (Dimming)

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Apply conditional opacity to navbar elements**

Wrap the Logo section and the Menu items in `motion.div` (if not already) and bind their `opacity` to `isLocateHovered`.

```tsx
// Example for Menu Items
<motion.div 
  animate={{ opacity: isLocateHovered ? 0.2 : 1 }}
  className="hidden lg:flex items-center gap-10"
>
  {/* sections.map ... */}
</motion.div>
```

- [ ] **Step 2: Final Verification**

Test on both mobile (pill mode) and desktop (full mode). Ensure the path updates correctly on scroll.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(nav): add focus mode dimming on locate hover"
```
