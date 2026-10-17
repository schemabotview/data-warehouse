import type { Section } from '../types'

export const loadEvidence: Section = {
  id: 'load-evidence',
  title: 'Reconciliation and load evidence',
  scene: 'load-dag',
  focus: 'evidence',
  slide: `## Reconciliation and load evidence

Every run should leave enough evidence to **reproduce** its result and **explain** any number it produced.

### What each run records
- **Inputs:** which staged batches, at which positions
- **Code:** which version of the models ran
- **Checks:** row counts, unresolved keys, totals against staging
- **Outcome:** published, held, or failed — and why

### Using the evidence
- A changed total is traced to the run that changed it
- A failed check holds publication instead of shipping it
- **Outcome:** construct and reason about load, retry and publish

### Next
- Published, reconciled models are ready for analytical queries`,
  narration:
    "The last piece of a load is the evidence it leaves behind. Back on the dependency graph, the final layer is not a table people query. It is the record of the run. Which staged batches were used as inputs, and at which log positions. Which version of the model code ran. What the checks found: row counts in and out, how many keys fell to Unknown, and whether the loaded totals matched staging. And how the run ended: published, held back, or failed, and why. This record is what turns a surprising number into an answerable question. When a total changes, the evidence shows which run changed it, with which inputs and which code. When a check fails, publication is held, and the reason is already written down. You can now construct an incremental load, reason about retries and backfills, and explain the boundary at which results are published, under the guarantees your engine actually gives. Next, those published, reconciled models are ready for analytical queries that keep their meaning.",
}
