import type { Section } from '../types'

export const scdType1Type2: Section = {
  id: 'scd-type1-type2',
  title: 'Overwrite versus versioned dimensions',
  scene: 'scd-versions',
  focus: 'type2',
  slide: `## Overwrite versus versioned dimensions

When a description changes, the dimension either **overwrites** it or keeps a **new version**.

### Type 1 — overwrite
- The region is updated in place: C-201 is now South
- Every past sale now reports as South too
- Right for corrections: a misspelt name was never true

### Type 2 — new version
- The North row is **closed**; a South row is opened
- Each version gets its own surrogate key: 201, then 208
- Facts keep the key of the version true when they happened
- Sales before 20 September still report as North

### Choosing, attribute by attribute
- Track history only where someone needs the old answer
- Each versioned attribute adds rows and load work`,
  narration:
    "Descriptions change. Customer C two oh one moved from the North region to the South on the twentieth of September. The dimension has to do something with that, and there are two basic policies. Type one overwrites. The region column is updated in place, and the customer is now South. That is simple, but it rewrites the past: every sale that customer ever made now reports as South, including the ones made while they lived in the North. Type one is exactly right for corrections, like a misspelt name, because the old value was never true. Type two keeps history. The North row is closed, a new South row is opened, and each version gets its own surrogate key, two oh one and then two oh eight. Facts carry the key of the version that was true when they happened, so sales before the move still report as North. The choice is made attribute by attribute. Version only what someone genuinely needs to see as it was, because every versioned attribute adds rows and load complexity.",
}
