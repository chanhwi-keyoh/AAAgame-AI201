## Work Log — 2026-04-05

### 1. Connected Character PNGs
> **User:** "I added characters png in png folder"

- Code expected images at `public/images/` with lowercase names
- Copied and renamed:
  - `Human.png` → `public/images/human.png`
  - `zombi.png` → `public/images/zombie.png`
  - `Tec.png` → `public/images/tech.png`
  - `Beast.png` → `public/images/beast.png`

### 2. Fixed Blank Page Bug
> **User:** (shared screenshot of blank white page) "This is what I see"

- Root cause: Vite 8 (Rolldown bundler) requires `import type` for type-only imports
- Changed `import { PathId }` → `import type { PathId }` across 6 files

### 3. Made Path Selection Clickable
> **User:** "This only works while hovering, can you make it clickable?"

- Added a "locked" selection state:
  - Click locks a path (persists after mouse leave)
  - Hover still previews other paths temporarily
  - Mouse leave returns to the locked path instead of Human
  - Locked path shows an accent-colored border

### 4. Added Evolution Character Image
> **User:** "Can you update Evolution path? I just added Evo Human.png in png folder"

- Copied `Evo Human.png` → `public/images/evolution.png`
- Updated `paths.ts` to use the new image (was using human.png as placeholder)

### 5. Deselect Fix
> **User:** "I can't go back to human once I click"

- Clicking the same path again now deselects it and returns to Human

---

## Work Log — 2026-04-06

### 1. Sound System
> **User:** "I want to add sound when evolving where can I make sound?"

- Recommended playing sounds in `useEvolutionState.ts` on click
- User added 8 sound files (human↔zombie, human↔tech, human↔beast, human↔evolution)
- Copied sounds to `public/sounds/` and wired them to `lockPath`

### 2. Sound on Hover (no overlap)
> **User:** "let's also do it when hover, but make sure that sounds does not overlap"

- Added sound playback on hover too
- Used a single `currentAudio` reference — each new sound stops the previous one

### 3. Transition via Human
> **User:** "there is no sound when selected one form ex: zombi(selected) and change to other form. steps should go back to human and then select other path"

- Switching between non-human forms now always goes through Human first
- Zombie → Human (plays return sound, waits for it to end) → Human → Tech (plays forward sound)
- Uses `audio.onended` event with a 2.5s fallback timeout

### 4. Click Selection Fix
> **User:** "click selecting is not working now"

- Hover was setting `activeRef` so `lockPath` didn't recognize the click
- Fixed: `lockPath` now simply locks whatever you're hovering on

### 5. Tech Path: Tec 1 / Tec 2
> **User:** "I added tec 1 and tec 2 png, can you replace current tec to tec 1 and add 2nd form(tec 2)?"

- First misunderstood as two separate selectable paths
> **User:** "I see two tech selection. what I asking is: 1. replace Tec to Tec 1, 2. 2nd evolution of Tech tree, Human -> Tec 1 -> Tec 2"

- Reverted to single Tech button
- Tech tree now shows: Human → Enhanced → Augmented → Cybernetic → Singularity
- Stage 1 = Tech 1 image (tree up to Augmented), Stage 2 = Tech 2 image (full tree)

### 6. Evolve Button & Tree Details
> **User:** "1. I like the previews tree so add some details between these path. 2. also now I can only see tec 1 image so first only show tec 1, and add evolution button below the tree, when clicked, transform to 2nd evolution"

- Added `stages` system to `EvolutionPath` type
- Evolve button appears below tree when there's a next stage
- Unreached nodes are dimmed, current stage node glows

### 7. Evolve Effects
> **User:** "it also should have effects like others when changing between 1st to 2nd evolution (use same sound as turning human to tec 1) and visuals too"

- Evolve now plays transformation sound + triggers character swap animation via `displayKey`

### 8. All Paths Got 2nd Evolution
> **User:** "I also added 2nd of each other path can you do it?"

- Copied `zombi 2.png`, `Beast 2.png`, `Evo 2.png` → `public/images/`
- Added `stages` to all 4 paths:
  - **Zombie**: Infected → Turned → *Evolve* → Undying → Apex Revenant
  - **Tech**: Enhanced → Augmented → *Evolve* → Cybernetic → Singularity
  - **Beast**: Feral → Mutant → *Evolve* → Apex → Alpha Predator
  - **Evolution**: Aware → Ascended → *Evolve* → Enlightened → Transcendent

### Files Modified
- `src/types.ts` — added `stages` optional field to `EvolutionPath`
- `src/data/paths.ts` — all paths updated with 4 tree nodes + stages array
- `src/hooks/useEvolutionState.ts` — added `evolveStage`, `canEvolve`, `evolve`, `displayKey`, transition-via-human logic
- `src/components/EvolutionTree.tsx` — rewritten with stage-aware highlighting, dimmed unreached nodes, Evolve button
- `src/components/CharacterDisplay.tsx` — accepts `displayKey` for stage-aware animation
- `src/components/EvolutionPreview.tsx` — wired new props through
