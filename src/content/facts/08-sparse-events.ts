import type { Section } from '../types'

export const sparseEvents: Section = {
  id: 'sparse-events',
  title: 'Sparse events and missing observations',
  scene: 'absent-vs-zero',
  focus: 'zero',
  slide: `## Sparse events and missing observations

An absent row and a zero say different things. Do not let a query treat them as the same.

### Three statements
- **No row:** nothing was recorded — sold nothing, or not captured
- **Filled zero:** a date join turns "no sale" into 0, by assumption
- **Measured zero:** Manchester counted its toasters and found none

### Averages need a stated denominator
- Over rows present: 49.00 GBP per day — wrong
- Over days in the month: 1.63 GBP per day
- **Outcome:** choose a fact pattern, then justify every sum

### Next
- Measurement at one moment raises a question: what about change?`,
  narration:
    "The last point in this course is about absence. A missing row and a zero look alike in a report, but they say very different things. In the sales table, toasters have one row in this window, on the fourteenth. On the thirteenth and the fifteenth there is simply no row. That might mean nothing sold, or it might mean the sale was never captured. Joining to the date dimension turns those gaps into explicit zeros, which is useful, but it is an assumption that no row means no sale. Compare the inventory snapshot. Manchester counted its toasters on the fifteenth and found none. That zero was measured. The difference shows up in averages. Divide September's toaster sales by the rows present and you get forty nine pounds a day. Divide by the days in the month and you get one pound sixty three. Only the second answers the question. You can now choose a fact pattern and justify every aggregation, denominator and allocation. Next: what happens when the things we describe change over time.",
}
