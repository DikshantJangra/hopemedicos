# Design Spec: Sinuous Navigator (Snake Path)

Establish a high-fidelity visual connection between the "Hope Medicos" logo and the "Locate Us" button in the navigation bar to guide the user's eye through a sophisticated "Snake Path" animation.

## 1. Objective
Create a dynamic, responsive SVG dashed path that "crawls" toward the "Locate Us" button on hover. The feature aims to project professional authority and "clever" digital craftsmanship for the Hope Medicos brand.

## 2. Technical Architecture

### 2.1 Coordinate Tracking
- **Logo Anchor:** `useRef` attached to the "Hope Medicos" logo container.
- **Destination Anchor:** `useRef` attached to the "Locate Us" button.
- **Calculation:** A custom hook or effect will use `getBoundingClientRect()` relative to the main `nav` container to calculate the start (right edge of logo) and end (left edge of locate button) coordinates.
- **Responsiveness:** The coordinates must recalculate on window resize and when the `isScrolled` state changes (which shifts element positions).

### 2.2 SVG Path Generation
- **Path Type:** A Cubic Bezier curve (`C` or `S` path commands) providing a smooth, serpentine "S" shape.
- **Path Data:** Generated dynamically: `M {logoX} {logoY} C {cp1X} {cp1Y}, {cp2X} {cp2Y}, {destX} {destY}`.
- **Visual Style:**
  - `stroke`: Brand Orange (`#f58518`) at `0.3` opacity.
  - `stroke-width`: `1.5px`.
  - `stroke-dasharray`: `4 4` (dashed line).
  - `filter`: Subtle glow using a SVG Gaussian Blur.

### 2.3 Animations (Framer Motion)
- **Entrance/Exit:** The path will fade in/out (`opacity: 0` to `1`) based on the `isLocateHovered` state.
- **The "Crawling" Effect:** Animate `stroke-dashoffset` from `40` to `0` in an infinite loop while hovered, creating the illusion of a snake moving forward.
- **Focus Mode:** When `isLocateHovered` is true, all other navbar elements (Menu Links, Logo, etc.) will dim to `opacity: 0.3` to emphasize the navigation path.

## 3. Component Integration
- **Z-Index:** The SVG will be positioned absolutely with `pointer-events-none` so it overlays all links without blocking clicks.
- **Portal/Container:** Sits within the `motion.nav` container to ensure it respects the "Pill" or "Full" width constraints.

## 4. Success Criteria
- [ ] Path perfectly starts at the Logo and ends at the "Locate Us" button.
- [ ] Path recalculates instantly on scroll or resize (no visual "breaks").
- [ ] Dash animation is smooth and moves *toward* the destination.
- [ ] Menu items dim correctly on hover.
