import type { Section } from '../types'

export const migrationParallelRun: Section = {
  id: 'migration-parallel-run',
  title: 'Migration and parallel-run reconciliation',
  scene: 'parallel-run',
  focus: 'diff',
  slide: `## Migration and parallel-run reconciliation

Moving to a new platform is safest as a **parallel run**: the same inputs, two outputs, compared.

### Running both
- Identical staged batches feed the old and new platforms
- The new platform runs in shadow; users stay on the old
- Diff each metric, for each period, at each grain

### The diff finds what tests missed
- Rows, revenue and Kitchen agree exactly
- Average refund: 9.00 against **4.50**
- The new platform averaged NULLs as zeros
- Fix it, then run clean month-ends before cutting over

### Cutover
- Agreed criteria, a date, and the old platform kept read-only`,
  narration:
    "Moving a warehouse to a new platform is one of the riskiest changes there is, and the safest way to do it is a parallel run. The same staged batches feed both the current platform and the new one. Users stay on the current platform, while the new one runs in shadow. Then the outputs are compared: each metric, for each period, at each grain. Most of the comparison here agrees exactly: the row counts, total revenue, revenue for Kitchen. But the average refund does not. The current platform says nine pounds, and the new one says four pounds fifty. That is the null handling from the semantics course. The new platform's model treated a missing refund as zero, and so averaged over every order instead of every return. No unit test caught it. The diff did. So fix it, and then run cleanly through agreed cycles, such as two month ends, before cutting over. The cutover itself has written criteria and a date. And the old platform is kept read-only for a while, so there is a way back.",
}
