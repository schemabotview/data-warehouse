import type { Section } from '../types'

export const correctionsRestatement: Section = {
  id: 'corrections-restatement',
  title: 'Corrections, deletions and restatement',
  scene: 'restate',
  focus: 'restated',
  slide: `## Corrections, deletions and restatement

Sources correct the past. The warehouse needs a stated policy for how corrections reach reports.

### 1042 was priced wrong: 49.00 → 45.00
- **Restate:** September becomes 140.00, as version 2
- **Adjust:** September stays 144.00; October gets −4.00
- Restating is truer; adjusting keeps reports stable
- Either way, record **who changed what, and when**
- Choose per metric, before the first correction arrives
- Tell report users what changed, and why

### Reclassify and delete
- **Reclassify** at query time when only a grouping changed
- A source **deletion** is a policy: remove, flag, or retain
- Retention and deletion apply to **every derived copy**
- Marts, extracts and caches must follow the same rule
- Test that a deleted key is gone from every layer`,
  narration:
    "Sources do not just add new data. They correct old data. Order ten forty two turns out to have been priced wrong: it should have been forty five pounds, not forty nine, and the correction arrives on the sixth of October, after September was already reported. There are two policies. Restating changes September itself. It becomes one hundred and forty pounds, published as a new version with a note saying what changed. Adjusting leaves September exactly as it was reported, and records a minus four pound adjustment in October instead. Restating gives the truer picture of September. Adjusting keeps previously published numbers stable, which matters when they were already used for decisions. Either way, keep a record of who changed what, and when. Some changes need no rewrite at all. If only a grouping changed, like a product moving category, it can often be reclassified at query time. Deletions are a policy decision too: remove the row, flag it, or retain it. And whatever is decided must reach every derived copy: marts, extracts and caches included.",
}
