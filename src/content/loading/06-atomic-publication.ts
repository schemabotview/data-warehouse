import type { Section } from '../types'

export const atomicPublication: Section = {
  id: 'atomic-publication',
  title: 'Transactions and atomic publication',
  scene: 'publish',
  focus: 'pointer',
  slide: `## Transactions and atomic publication

Readers should see **all** of a load, or none of it — never the half that has committed so far.

### Two ways to publish atomically
- **One transaction**, where the engine supports multi-table commits
- **Versioned output**: build \`sales_v42\` beside \`sales_v41\`
- Check v42 fully, then switch the view in one step
- The old version stays for comparison and rollback
- Readers query the view, never a versioned table
- Switch only after reconciliation passes

### What is not a snapshot
- Dimensions commit at 02:10; facts at 02:14
- A report at 02:11 joins new dims to old facts
- Separate commits are not one consistent state
- Transaction semantics differ by engine: verify, do not assume`,
  narration:
    "A load is only finished when readers can see it, and they should see all of it or none of it, never the half that has committed so far. There are two common ways to get that. Where the engine supports transactions across several tables, the whole publication can be one transaction: replace the batch, update the checkpoint, and commit once. The other way works almost everywhere. Build the new version of the output beside the current one, sales version forty two next to version forty one. Check the new version completely. Then switch the view that readers query from forty one to forty two, in a single step. The old version stays for comparison, and for rollback if something turns out to be wrong. Here is what does not count. The dimensions commit at ten past two, and the facts at fourteen minutes past. A report that runs at eleven minutes past joins brand new dimensions to old facts, a state that never existed. Separate commits are not one consistent snapshot. And transaction behaviour differs between engines, so verify it rather than assume it.",
}
