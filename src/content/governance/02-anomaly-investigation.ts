import type { Section } from '../types'

export const anomalyInvestigation: Section = {
  id: 'anomaly-investigation',
  title: 'Reconciliation and anomaly investigation',
  scene: 'revenue-drop',
  focus: 'metric-version',
  slide: `## Reconciliation and anomaly investigation

When a number moves unexpectedly, **investigate before blaming the data**. Most anomalies have a cause.

### September moved from 144.00 to 140.00
- **Lineage:** which inputs and models feed the tile
- **Load evidence:** did a run fail, or rows go missing?
- **Metric version:** did the definition change?
- **Source versions:** was anything corrected upstream?
- Write each hypothesis down before testing it

### What the evidence showed
- Runs green, counts agreed, metric still version 2
- The source corrected 1042 from 49.00 to 45.00
- A real restatement, not "bad data"
- Record the finding where the next person will look
- Tell the consumers who saw 144.00
- Add a check that would explain it faster next time`,
  narration:
    "One morning the finance dashboard shows September revenue at one hundred and forty pounds. Yesterday it said one hundred and forty four. The tempting reaction is to call it bad data and start patching. Investigate first. Most anomalies have a cause, and the evidence built up in earlier courses is how you find it. Lineage shows which inputs and models feed that tile. The load evidence shows whether any run failed, or any rows went missing: here the runs were green, and the control counts agreed. The metric version shows whether the definition itself moved: it is still version two. And the source versions show whether anything was corrected upstream. That is where the answer is. The web shop corrected the price of order ten forty two from forty nine pounds to forty five, and September was restated as version two. The data was not bad. It was more accurate than before. Record the finding where the next person will look for it, and tell the people who had already seen, and perhaps used, the old number.",
}
