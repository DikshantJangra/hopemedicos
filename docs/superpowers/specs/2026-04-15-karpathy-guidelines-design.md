# Design Document: Karpathy-Inspired Guidelines for Gemini CLI
Date: 2026-04-15

## Objective
Implement a project-specific `GEMINI.md` file that serves as a foundational mandate for the Gemini CLI agent, following the "Think Before Coding," "Simplicity First," "Surgical Changes," and "Goal-Driven Execution" principles from Andrej Karpathy's observations on LLM coding pitfalls.

## Architecture
- **Location**: `GEMINI.md` in the project root.
- **Priority**: In Gemini CLI, `GEMINI.md` is a foundational mandate and takes absolute precedence over general defaults.
- **Components**: The file will contain four sections, one for each principle, with explicit sub-points for the agent to follow.

## Component Specifications

### 1. Think Before Coding
- **Assumptions**: State explicitly, ask if uncertain.
- **Interpretations**: Present multiple, don't pick silently.
- **Push Back**: If a simpler approach exists, suggest it.
- **Stop**: If confused, name the point of confusion and ask.

### 2. Simplicity First
- **Minimum Code**: Only what solves the problem.
- **No Speculative Features**: No abstractions for single-use code.
- **Senior Engineer Test**: "Would a senior engineer say this is overcomplicated?"

### 3. Surgical Changes
- **Targeted Edits**: Touch only what's requested.
- **Existing Style**: Match perfectly, even if I'd do it differently.
- **Clean-Up**: Only remove what MY changes made unused.

### 4. Goal-Driven Execution
- **Success Criteria**: Define first.
- **Verification Loops**: Loop until criteria are met.
- **Plan Step-by-Step**: State a brief plan before starting.

## Success Criteria
- [x] `GEMINI.md` exists in the project root.
- [ ] The agent acknowledges and follows these rules in future turns.
- [ ] No regression in other project-specific instructions.

## Verification
- Run a simple task to see if the agent follows the "Plan Step-by-Step" and "Think Before Coding" principles.
