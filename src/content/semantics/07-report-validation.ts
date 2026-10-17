import type { Section } from '../types'

export const reportValidation: Section = {
  id: 'report-validation',
  title: 'Validating reports against source evidence',
  scene: 'cell-to-source',
  focus: 'source-rows',
  slide: `## Validating reports against source evidence

Trust in a report comes from being able to trace **any one cell** back to the records behind it.

### Kitchen, September: 117.00
- The cell names its metric: net merchandise revenue, v2
- The metric's filters select three fact rows
- Those rows sum to 117.00, and name their load batches
- The batches name positions in the web orders source
- Trace one cell per release, as a standing test

### What tracing finds — and does not fix
- A wrong filter, a stale batch, or a missing source row
- A semantic layer cannot repair a wrong **grain** underneath
- Record each trace, so the next one is quicker
- **Outcome:** explain queries and locate discrepancies
- **Next:** physical design, guided by execution evidence`,
  narration:
    "The final test of everything in this course is simple to state. Pick any one cell in a report, and trace it back to the records behind it. Take Kitchen in September, one hundred and seventeen pounds. The cell names its metric, net merchandise revenue, version two. The metric's definition says which population, which date basis and which filters apply. Those filters select exactly three fact rows: a kettle from ten forty one, the toaster from ten forty two, and another kettle from ten forty four. They add up to one hundred and seventeen. Each row records the load batch that delivered it, and each batch records the positions it read in the web orders source. If a number is wrong, this trace is where you find out why: a wrong filter, a stale batch, a source row that never arrived. One limit is worth repeating. A semantic layer cannot repair a wrong grain underneath it. You can now explain analytical queries and locate discrepancies in grain, relationships or meaning. Next, execution evidence guides physical design.",
}
