---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use when building web components, pages, artifacts, or applications to create polished UI that avoids generic AI aesthetics.
---

# Frontend Design (Pro Max Edition)

Create distinctive, production-grade frontend interfaces using the **UI/UX Pro Max** reasoning engine. Avoid generic "AI slop".

## Reasoning Workflow (Research-Reasoning-Output)
1. **Research**: Analyze industry context, user intent, and brand voice.
2. **Reasoning**: Match requirements against curated patterns and rules (e.g., isolation effect, choice paralysis).
3. **Output**: Generate a custom design system and functional code.

## Core Philosophy: Design for Intent
Prioritize clarity and functional beauty. The design must match the specific context (e.g., healthcare needs trust, minimalism, and accessibility).

## Design Psychology & CTR
- **Isolation Effect**: High contrast for primary CTAs.
- **Choice Paralysis**: Limit high-intensity choices. One primary action per section.
- **Directional Cues**: Use icons to signal movement.

## Design Ethics & Constraints
- **Anti-Patterns**: Never use heavy black buttons with colored shadows or "neon-glow" effects. Strictly forbid "color dropdown" hover effects (where a background color slides or fills from one side). Avoid any hover animations that involve layered background divs, shine effects, or complex transitions.
- **Interaction**: Keep button interactions flat and simple. Use a basic solid color change (e.g., `hover:bg-shade`) or a subtle opacity shift. No `active:scale` or `translate` transforms on buttons unless specifically requested.
- **Cohesion**: Design must feel like a natural extension of the current UI.

## Architecture
- Use a **Design System** approach. For large projects, establish a `design-system/MASTER.md` for persistent tokens and patterns.

## Guidelines
- **Typography**: Personality-driven, expressive display type, refined body text.
- **Color**: Contextual palettes. Lead with dominant color, punctuate with sharp accents.
- **Spatial Composition**: Balanced layouts with generous negative space.

## Implementation
- **Frameworks**: React (TypeScript), Angular, or Vanilla.
- **Styling**: Prefer Vanilla CSS or specialized libraries. Avoid Tailwind unless requested.
- **Quality**: Production-grade, functional, responsive, accessible.

Build creatively. Make unexpected choices. Every design must feel distinct.
