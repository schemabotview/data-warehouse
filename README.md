# data-warehouse

**Data Warehouse — From Business Questions to Trusted Analytical Data.** A GraphL concept app:
12 courses, 82 sections, each section a `(scene, slide, narration)` segment of the course video.
Served at `graphl.in/data-warehouse/`.

- `DATA-WAREHOUSE-COURSE-PLAN.md` — the syllabus: scope, learning spine, chapters, sources.
- `AUTHORING-PLAN.md` — how the syllabus becomes sections: course ids, scene per section, the
  shared retailer dataset, the density loop, and the phases.
- `CLAUDE.md` — the invariants and layout rules every frame is held to.

## Running it

```sh
npm install
npm run dev          # http://localhost:5173 — routes are #/<course>-<section>
```

## Verifying a change

```sh
npm run build && npx tsc --noEmit && npm run check
npm run density <course>     # with the dev server running
```

…and the section looked at in the browser. `check` guards overflow (cards, slide clipping, dead
focus, missing wavs); `density` flags frames that leave their pane under-used. Neither sees an edge
label landing on a card — the rendered route is the real bar.

## What is in here

```
src/content/<course>/   one file per section + the course registry
src/scenes/<course>/    hand-authored scenes; src/scenes/shared/ holds the retailer dataset
src/main.tsx            mounts <ConceptApp> from @graphlearning/shell
src/theme.css           --brand #0d9488 / --brand-hover / --accent-2 — the repo's design surface
scripts/                check-content · density · init-template · colab notebook · concept.json · titles.json
public/audio/<course>/  narration wavs (Colab + Chatterbox, never by hand)
```

The engine (`@graphlearning/flow`) and shell (`@graphlearning/shell`) are published packages pinned
by version. `file:../ui-flow` must never be committed.
