# Evolution Preview — Interactive Character Selection Screen

A visually immersive, single-page character evolution preview system built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

**Live Site:** https://chanhwi-keyoh.github.io/AAAgame-AI201/

In a post-apocalyptic world where a zombie outbreak has triggered hidden DNA evolution in humans, the player previews possible evolutionary futures. Hovering or clicking a path transforms the character, stats, sounds, and atmosphere in real time.

---

## My Responsibilities

This project was built by combining AI-assisted implementation with my own design direction and decision-making.

### 1. Concept & System Design
- Defined the core idea: an **interactive evolution preview system**, not a traditional character selection screen
- Designed the world setting: post-apocalyptic environment with hidden human evolution
- Established the 4 evolution paths: Zombie, Tech, Beast, Evolution
- Decided that all transitions originate from **Human as the base state**

### 2. UX & Interaction Design
- Designed the full interaction logic:
  - **Hover** = preview future state
  - **Click** = lock selection
- Introduced the `lockedPath` system to allow commitment
- Defined that switching between paths must go through Human first
- Designed the **Evolve system**: stage-based progression (Stage 1 → Stage 2) where the user actively advances evolution

### 3. Visual Direction & Art Direction
- Defined the visual style: **gothic clay / stylized 3D** look
- Decided to separate character assets and background assets
- Designed each path's identity:
  - Zombie → infection / organic
  - Tech → precision / mechanical
  - Beast → primal / animal
  - Evolution → energy awakening (effect-based, not full character change)
- Directed AI image generation using prompts

### 4. System Structure & UI Layout
- Defined the main layout:
  - **Center:** Character
  - **Left:** Status panel
  - **Right:** Evolution tree
  - **Bottom:** Path selection
- Determined what changes during interaction: background, character, stats, tree, sound

### 5. Asset Creation (AI-directed)
- Generated character images (Human + 4 paths + stages) and background images for each path
- Created evolution energy effect (instead of separate character for Evolution path)
- Refined outputs by adjusting prompts, rejecting mismatched styles, and maintaining visual consistency

### 6. Sound Design Direction
- Designed the sound system behavior:
  - Sound plays on hover and evolve
  - No overlapping sounds
- Defined transformation rules: non-human → non-human transitions must go through Human with sequential audio
- Wrote prompts for AI-generated sound effects

### 7. Implementation Direction (AI-assisted)
- Used AI to build React component structure, implement state management (`useEvolutionState`), and add animations/transitions
- I directed what logic should exist, how interactions should behave, and what should be kept or rejected

### 8. Evaluation & Decision Making
- Reviewed all AI outputs
- Rejected incorrect implementations:
  - Separate Tech buttons instead of evolution stages
  - Hover-only interaction
  - Missing sound transitions
- Iteratively refined the system to match design intent

### Still To Complete
- Finalize all background assets
- Ensure visual consistency across all characters
- Fine-tune animation timing (hover transitions)
- Integrate final sound effects
- Polish UI details (spacing, typography, contrast)
- Complete reflection section

---

## Design Intent

**Mood & Atmosphere:**
The experience is designed to feel cinematic, immersive, and slightly unsettling. The player is not simply selecting a character, but previewing possible futures of human evolution in a post-apocalyptic world. Each path creates a distinct emotional tone: Zombie feels unstable and corrupted, Tech feels controlled and precise, Beast feels raw and primal, and Evolution feels calm but mysterious. The goal is to make each hover interaction feel like entering a different version of reality.

**Color Palette:**
Each path is defined by a strong, singular color identity to reinforce its meaning:
- Human: Neutral gray (#888888) — represents potential and an unchosen state
- Zombie: Red/pink (#ff2d6a) — infection, danger, loss of control
- Tech: Cyan/blue (#00d4ff) — digital precision, cold logic
- Beast: Yellow (#ffcc00) — instinct, aggression, raw energy
- Evolution: Purple (#b088ff) — transcendence, unknown potential

These colors are used consistently across background, glow, UI accents, and feedback states.

**Typographic Hierarchy:**
Typography is kept minimal and readable to support the visual experience rather than dominate it. Primary labels (path names) are bold and slightly spaced to feel intentional and controlled. Secondary text (taglines) is lighter and used for mood reinforcement. The system avoids excessive text and relies more on visual communication.

**Hover-State Rules:**
Hover is the core interaction. It is not just a UI highlight but a full state transformation. When a user hovers over a path:
- The background shifts to that path's environment
- The character transforms (or gains an effect in the case of Evolution)
- Status bars animate to reflect new attributes
- The evolution tree highlights the selected path
- Sound is triggered to reinforce the transition

Hover acts as a "preview of the future," while click locks the decision.

**Layout Concept:**
The layout is structured to guide focus and reinforce clarity:
- **Center:** Character (primary focus)
- **Left:** Status panel (quantitative understanding)
- **Right:** Evolution tree (progression and context)
- **Bottom:** Path selection (input control)

This creates a balanced system where emotion (center), data (left), and structure (right) work together.

---

## Mermaid Diagram

The full system flow diagram is in [`docs/system-flow.md`](docs/system-flow.md) and rendered as [`png/mermaid-diagram.png`](png/mermaid-diagram.png).

It shows:
- **Input:** User actions (hover, click, mouse leave, evolve)
- **Processing:** State management via `useEvolutionState` hook — path selection, transition-via-human logic, sound engine, evolve stage system
- **Output:** Visual updates (background, character image, stat bars, evolution tree, tagline) and sound playback

---

## AI Direction Log

### Entry 1 — Initial Setup & Image Connection (2026-04-05)
**What I asked:** "I added characters png in png folder. Do you know the concept of this program?"
**What AI produced:** Explored the full codebase, understood the concept, identified that PNG filenames didn't match the code references. Copied and renamed PNGs to `public/images/` with correct lowercase names.
**What I kept:** All of it — this was straightforward file mapping.

### Entry 2 — Fixing the Blank Page (2026-04-05)
**What I asked:** Shared a screenshot of the blank white page.
**What AI produced:** Diagnosed the issue as Vite 8's Rolldown bundler requiring `import type` for type-only imports. Fixed all 6 files.
**What I kept:** The fix was correct and necessary. I would not have known this was a Vite 8-specific issue.

### Entry 3 — Adding Sound System (2026-04-06)
**What I asked:** "I want to add sound when evolving where can I make sound?" Then: "let's also do it when hover, but make sure that sounds does not overlap"
**What AI produced:** Suggested placing sound logic in the `useEvolutionState` hook. Implemented sound on click first, then added hover sound with a single `currentAudio` ref to prevent overlaps.
**What I decided:** I chose to have sounds on both hover and click, and specified that transitions between non-human forms must go through Human first with sequential sounds — this was my design decision, not AI's suggestion.

### Entry 4 — Tech Evolution Stages (2026-04-06)
**What I asked:** "I added tec 1 and tec 2 png, can you replace current tec to tec 1 and add 2nd form (tec 2)?"
**What AI produced:** Initially created two separate selectable path buttons (Tech 1, Tech 2).
**What I rejected and redirected:** I rejected the two-button approach. I wanted a single Tech path with an evolution tree: Human → Tech 1 → Tech 2, with an Evolve button to advance stages. AI rebuilt the system with a `stages` array in the data model. (See Records of Resistance #1)

### Entry 5 — All Paths Get 2nd Evolution (2026-04-06)
**What I asked:** "I also added 2nd of each other path can you do it?"
**What AI produced:** Applied the same stage system to Zombie, Beast, and Evolution paths — each with 4 tree nodes, 2 stages, and an Evolve button.
**What I kept:** The pattern was established from the Tech fix, so AI applied it consistently. I provided all the character artwork.

---

## Records of Resistance

### 1. Rejected: Two Separate Tech Buttons
**What AI gave me:** When I said I had Tec 1 and Tec 2 images, AI created two separate selectable path buttons in the bottom bar — "Tech 1" and "Tech 2" as independent paths.
**Why I rejected it:** This broke the concept. Tech is one evolutionary path, not two separate characters. The design intent is that you start as Tech 1 and *evolve* into Tech 2 — a progression within a single path.
**What I did instead:** I directed AI to use a single Tech button with an Evolve button in the evolution tree. This led to the creation of the entire `stages` system — a much richer interaction model where the tree highlights progress and the player actively chooses to evolve further.

### 2. Rejected: Hover-Only Interaction
**What AI gave me:** The initial codebase only supported hover-based previewing — hovering a path showed the transformation, but moving the mouse away always reset to Human. There was no way to "select" a path.
**Why I rejected it:** A hover-only system is a passive preview, not a selection screen. The player needs to feel they are *choosing* their path — committing to it with a click. This is a game character selection screen, not a tooltip.
**What I did instead:** I requested click-to-lock functionality. AI added a `lockedPath` state so clicking locks the selection, hovering still previews, and mouse leave returns to the locked path instead of Human. This gave the screen both preview (hover) and commitment (click) — matching the design intent.

### 3. Rejected: Silent Transitions Between Non-Human Forms
**What AI gave me:** When switching between two non-human paths (e.g., Zombie to Tech), there was no sound — the system only had sounds for human↔path transitions, so it played nothing for path↔path.
**Why I rejected it:** The sound design is core to the immersion. Every transformation should feel weighty. Silently jumping from Zombie to Tech breaks the narrative — you can't just teleport between evolution paths.
**What I did instead:** I specified that the system must always transition through Human first: Zombie → Human (with reverse sound + visual) → wait → Human → Tech (with forward sound + visual). This enforces the lore (all paths originate from Human) and creates a more cinematic, sequential transformation feeling.

---

## Five Questions Reflection

**1. What surprised you about working with AI as a creative tool?**
What surprised me most was how fast AI could generate technically correct solutions, but how often those solutions did not match the intended design experience. AI was very good at executing tasks, but it did not understand nuance, mood, or interaction intent unless I explicitly defined them. This made me realize that creativity still depends heavily on human direction, especially in experience design.

**2. When did you feel most in control of the project? When did you feel least in control?**
I felt most in control when I clearly defined rules, such as how hover and click interactions should behave or how evolution stages should work. In those moments, AI became a very effective tool. I felt least in control when I gave vague instructions, especially during early image generation or system design, where the results were technically correct but conceptually off. Control came directly from how clearly I communicated intent.

**3. How did your Design Intent document help (or fail to help) you evaluate AI output?**
The Design Intent helped me filter AI outputs more confidently. Instead of accepting results just because they worked, I could evaluate whether they matched the intended mood, interaction, and system logic. It prevented me from drifting away from the core concept. However, early on, before the intent was clearly defined, I accepted some outputs too quickly, which led to rework later.

**4. What would you do differently if you started this project over?**
If I started over, I would define the Design Intent much earlier and more strictly before using AI. I would also structure the system (states, transitions, and rules) first, before generating assets. This would reduce iteration time and make AI outputs more aligned from the beginning instead of refining them afterward.

**5. What is the most important thing you learned about directing AI?**
The most important thing I learned is that AI needs direction, not just prompts. Good results come from defining systems, constraints, and decisions clearly. AI is not a replacement for design thinking — it amplifies it. The quality of the output depends directly on how well I can articulate what I want and what I reject.

---

## Tech Stack

- **React 19** — UI framework
- **TypeScript 5.9** — Type safety
- **Vite 8** — Build tool (with Rolldown bundler)
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion 12** — Animations and transitions

## Project Structure

```
src/
├── App.tsx                     # Root component
├── main.tsx                    # Entry point
├── types.ts                    # TypeScript interfaces
├── index.css                   # Global styles + Tailwind
├── data/
│   └── paths.ts                # Evolution paths data + stages
├── hooks/
│   └── useEvolutionState.ts    # State management + sound + transitions
└── components/
    ├── EvolutionPreview.tsx     # Main layout container
    ├── CharacterDisplay.tsx     # Center character + glow + tagline
    ├── StatusPanel.tsx          # Left stat bars
    ├── StatBar.tsx              # Individual animated stat bar
    ├── EvolutionTree.tsx        # Right tree + Evolve button
    └── PathSelector.tsx         # Bottom path buttons
```

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`
