import type { Section } from '../types'

export const aggregatesMaterialisation: Section = {
  id: 'aggregates-materialisation',
  title: 'Aggregates and materialisation',
  scene: 'mat-agg',
  focus: 'stale',
  slide: `## Aggregates and materialisation

A **materialised aggregate** stores a summary in advance, so dashboards read a little instead of a lot.

### The trade
- Reads get cheaper: daily totals instead of every line
- The summary is only as fresh as its **last refresh**
- At 11:00, the fact says Kitchen 113.00; the aggregate says 117.00
- The 1042 correction landed at 10:00; the refresh runs at 02:00

### Managing it
- Choose full or incremental refresh, by cost and correctness
- Refresh after corrections, not only on a timer
- Show **"as of"** on anything that reads the aggregate
- Build it from the same metric definition as the base
- Reconcile the aggregate against its base after each refresh`,
  narration:
    "A materialised aggregate stores the answer to a common question in advance. Instead of scanning every sales line each time the dashboard opens, the dashboard reads a small table of daily totals by category. Reads become much cheaper. The price is freshness. The summary is only as current as its last refresh. Here the correction to order ten forty two landed in the fact table at ten in the morning, but the aggregate was refreshed at two in the morning. At eleven o'clock, the fact table says Kitchen sold one hundred and thirteen pounds in September, and the aggregate still says one hundred and seventeen. Both are correct as of their own time, and the dashboard shows the older one. Managing that is a design decision. Choose a full or incremental refresh based on its cost and on whether it handles corrections correctly. Trigger a refresh after corrections, not only on a schedule. Show an as of time on anything that reads the aggregate. And after each refresh, reconcile the aggregate against its base table.",
}
