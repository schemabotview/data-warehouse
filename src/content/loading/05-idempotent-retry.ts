import type { Section } from '../types'

export const idempotentRetry: Section = {
  id: 'idempotent-retry',
  title: 'Idempotency and retry boundaries',
  scene: 'crash-rerun',
  focus: 'crash',
  slide: `## Idempotency and retry boundaries

Retries will happen. A load is **idempotent** when running it twice leaves the same result as once.

### The crash
- Batch 78's rows are written
- The job dies **before** the checkpoint moves
- The checkpoint still says 77, so 78 runs again
- The checkpoint moves only **after** the rows commit

### Two outcomes
- A plain \`INSERT\` appends 78 a second time: doubled sales
- Replacing batch 78 **by key** gives the same rows as before
- Delete-then-insert, or a merge on the natural key
- A unique constraint on order + line catches what slips through
- Define the retry unit: one batch, one partition, one run`,
  narration:
    "Every pipeline eventually crashes in the worst possible place. Here, batch seventy eight's fact rows have been written, and then the job dies before it can move the checkpoint forward. When it restarts, the checkpoint still says seventy seven, so batch seventy eight runs again. That is correct behaviour. The question is whether the second run is harmless. If the load is a plain insert, it appends batch seventy eight a second time, and every sale in that batch is now counted twice. If instead the load replaces batch seventy eight by key, either by deleting that batch's rows and reinserting them in one transaction, or by merging on the natural key, then the retry leaves exactly the same rows as before. That property is idempotency: running it twice has the same effect as running it once. Back it up with a unique constraint on order and line, where the engine enforces one, so a mistake fails loudly instead of doubling quietly. And define the retry unit explicitly: one batch, one partition, or one whole run.",
}
