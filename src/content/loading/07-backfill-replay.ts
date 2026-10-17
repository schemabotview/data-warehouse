import type { Section } from '../types'

export const backfillReplay: Section = {
  id: 'backfill-replay',
  title: 'Backfills, replay and rebuilds',
  scene: 'backfill',
  focus: 'partition',
  slide: `## Backfills, replay and rebuilds

A late correction means rebuilding the past. Keep the rebuild **bounded, recorded and separate** from live work.

### Rebuilding September after the 1042 fix
- Bound it: one partition, \`2026-09-01 ≤ date < 2026-10-01\`
- Record the input batches and the code commit used
- Rebuild from staging, not from the old partition
- Reconcile the new partition before anyone sees it
- Publish it as **version 2**, beside the old one
- Diff old and new; explain every changed total
- Refresh downstream extracts and caches too

### Backfills and live loads
- October's live loads keep running meanwhile
- A partition lock means one writer at a time
- A backfill must never overwrite newer live results
- Each backfill has a named owner and an end
- Replays run the same code path as live loads`,
  narration:
    "When a correction arrives late, the past has to be rebuilt. The price fix for order ten forty two changes September, which was published days ago. The rebuild needs three disciplines. First, bound it. Rebuild exactly one partition, September, defined by the same half-open interval used everywhere else, and leave August and October alone. Second, record it. The run record states which staging batches were used as inputs, which commit of the model code ran, what the reconciliation showed, and when the result was published. With that record, anyone can reproduce the rebuild later, or explain why September's total changed. The new partition is reconciled and compared with the old one before anyone sees it, and then published as version two. Third, keep it separate from live work. October's normal loads carry on while the backfill runs. A lock on each partition ensures only one writer at a time, so a backfill can never overwrite newer results from the live pipeline. And every backfill has a named owner, and a defined end.",
}
