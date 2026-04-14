# 📋 AGENTS.md — Hope Medicos
> **The Definitive Guide for AI Agents and Developers**  
> *Hope Medicos: Pharmacy Shop (This project is about Retail website and advertising the pharmacy digitally) for quality Pharmaceutical Care & Community Wellness*

---

## 🏗️ Project Vision
Hope Medicos is a high-end, editorial-style medical e-commerce and community platform. It blends professional healthcare services with a minimalist, "premium-clean" aesthetic. Every interaction must feel reliable, frictionless, and sophisticated.

---

## 🛠️ Technology Stack

### Core Frameworks
- **Next.js 15 (App Router)**: Utilizing React 19 features and Turbopack for lightning-fast development.
- **Backend**: Firebase 11 (Firestore for real-time data, Auth for secure access).
- **Styling**: Tailwind CSS 4 (Custom configuration focusing on typography and spacing).
- **Animation**: Framer Motion & Locomotive Scroll (For "living" UI feel).

### AI Ecosystem
- **Provider Chain**: A custom failover system: `Gemini 1.5 Flash` (Primary) $\to$ `Groq (Llama 3)` $\to$ `OpenRouter` $\to$ `Hugging Face (Mixtral)`.
- **Runtime**: Edge Runtime enabled for AI routes to minimize latency.
- **Context**: Specialized system prompt strictly scoped to Healthcare/Pharmacy.

---

## 🎨 The Editorial Code (Design System)
*Failure to adhere to these rules is a build-breaking bug.*

### Color Palette
- **Primary Background**: White (`#ffffff`) or Off-white (`#faf9f7`).
- **Surface**: Subtle gray (`#f2f2f2`) for card borders or section dividers.
- **Text**: Deep Black (`#000000`) for headers, Neutral Black (`rgba(0,0,0,0.8)`) for body.
- **Accent**: No orange/gradients (except for specific sale badges or legacy branding if explicitly stated). Use high-contrast typography instead of color for emphasis.

### Typography
- **Primary**: `Inter` (Sans-serif) for functional UI and body.
- **Accents**: `Instrument Serif` (Italic) for editorial flair, pull quotes, or highlighting medical terms.
- **Eyebrow Text**: `10px` uppercase, `tracking-0.15em`.
- **Headings**: Large, bold, and high-tracking for a "magazine" feel.

### Constraints
- **Shadows**: Forbidden. Use `1px` borders (`#eeeeee`) for depth.
- **Gradients**: Forbidden. Use solid block colors.
- **Radius**: Minimal (2px) or sharp corners for an architectural feel.

---

## 🚀 Architecture & Data Flow

### 1. AI Chat System (`Hope AI`)
- **Location**: `src/components/chat/ChatWidget.tsx`
- **Logic**: Client $\to$ `/api/chat` (Serverless) $\to$ `aiService.ts` (Provider Failover) $\to$ LLM.
- **Strict Scope**: Healthcare/Pharmacy ONLY. If a user asks about code, politely refuse.

### 2. Content Management
- **Community Updates**: Managed in `src/data/updates.ts`.
- **Format**: `content` field accepts HTML. Use semantic tags (`<h3>`, `<p>`, `<ul>`).
- **Admin Flow**: Dashboard $\to$ Update Firestore $\to$ Static Site Generation (revalidation).

### 3. Firebase Architecture
- **Collections**: `offers`, `updates`, `blogs`, `products`, `websiteConfig`.
- **Rules**: Public READ access for general info; Admin-only WRITE access via Admin SDK.

---

## ⚙️ Developer Protocols

### Commands
| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start development with Turbopack |
| `npm run build` | Triple-check for Type errors and Linting |
| `npm run lint` | Enforce code quality standards |
| `firebase deploy` | Update security rules and indexes |

### Environment Setup
- Ensure `.env.local` contains valid keys for `GEMINI_API_KEY`, `GROQ_API_KEY`, and `FIREBASE_CONFIG`.
- Primary branch: `main`. All features should be developed in feature branches.

---

## ⚠️ Common Gotchas & Constraints
- **Hydration Errors**: Ensure consistent rendering between Server and Client for Framer Motion components.
- **Edge Runtime**: AI API routes MUST remain compatible with Edge Runtime (no Node.js-only modules).
- **Icons**: Always use `react-icons` for consistency.
- **Mobile First**: All sections must be fully responsive with fluid typography.

---

> [!IMPORTANT]
> When adding new features, ask yourself: "Does this look like it belongs in a premium medical journal?" If it feels like a generic web app, rethink the layout.
