import type { Section } from '../types'

export const logicalLayers: Section = {
  id: 'logical-layers',
  title: 'Logical layers and data movement',
  scene: 'layers',
  focus: 'serve',
  slide: `## Logical layers and data movement

Layers name **responsibilities**. Each boundary between them is a place where a check can run.

### A typical path
- **Sources:** operational systems, read but never changed
- **Landing:** raw copies, exactly as the source sent them
- **Staging:** typed and deduplicated, with load metadata attached
- **Integration:** conformed keys, rules and history
- **Serving:** star schemas and marts, shaped for questions

### What a layer does not do
- A layer called "gold" is **not evidence** of quality
- Trust comes from the checks that ran
- A failed check at a boundary **stops** the load there
- A skipped layer's job **moves**; it never vanishes
- Names vary between teams; the **jobs** stay the same`,
  narration:
    "Most warehouses move data through a few logical layers, and the names change from team to team: raw, stage and mart, or bronze, silver and gold. What matters is the job each layer does. Landing keeps a raw copy, exactly as the source sent it, so you can always go back. Staging types the columns, removes duplicates and records which load each row came from. Integration conforms keys across sources, applies business rules and keeps history. Serving publishes stars and marts in the shape people ask questions in. The sources themselves are only ever read. Now the part that is easy to forget. A layer's name tells you what it is supposed to hold, not whether it holds it correctly. Calling a schema gold proves nothing. The evidence is the checks that ran at each boundary: did the row counts land, are the keys unique at the declared grain, do the served totals agree with the source? Those checks, and the people who answer for them, are what earn trust.",
}
