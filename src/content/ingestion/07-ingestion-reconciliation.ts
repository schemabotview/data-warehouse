import type { Section } from '../types'

export const ingestionReconciliation: Section = {
  id: 'ingestion-reconciliation',
  title: 'Ingestion metadata and reconciliation',
  scene: 'control-totals',
  focus: 'totals',
  slide: `## Ingestion metadata and reconciliation

Every load leaves **evidence**: what it read, from where, to which position, and how it ended.

### Batch metadata
- One row per batch: source, position range, row count, status
- Kept as long as the data it describes
- It is how a number is traced back to a load

### Control totals
- Compare source and staging: rows, distinct keys, sums, max position
- Agreement shows nothing was lost or doubled **in transit**
- It does not prove each row correct — errors can cancel
- It cannot check the source, or the extract's scope

### Outcome
- Explain extract boundaries, ordering, replay and completeness
- **Next:** stable inputs for repeatable transformation`,
  narration:
    "The last part of ingestion is evidence. Every load should leave a record of what it did. The batch table keeps one row per load: which source, which range of log positions, how many rows, and how it ended, whether committed, replayed, or partial with rows held back. Keep it as long as the data it describes, because it is how a number in a report is traced back to the load that delivered it. Then reconcile. Control totals are computed on both sides, in the source and in staging: the row count, the number of distinct keys, the sum of an amount, the highest position. When they agree, you have good evidence that nothing was lost or doubled in transit. Be precise about what that does not prove. Two wrong values can cancel out in a sum. The source itself might be wrong. And if the extract's scope was wrong, both sides will agree on the wrong rows. You can now explain extract boundaries, ordering and replay, and the evidence for completeness. Next, those stable inputs feed repeatable transformation.",
}
