import type { Section } from '../types'

export const periodicSnapshots: Section = {
  id: 'periodic-snapshots',
  title: 'Periodic snapshots',
  scene: 'three-facts',
  focus: 'snapshot',
  slide: `## Periodic snapshots

A **periodic snapshot** measures a state at regular intervals: one row per product, per location, per day.

### Daily inventory
- Each row is a count taken at the end of a day
- A row exists even when **nothing moved** that day
- Rows arrive on a schedule; volume is predictable
- The row says what was true then, not what happened
- Volume is products × locations × days

### Why not derive it from transactions?
- Summing every movement since the beginning is slow
- One missed movement corrupts every balance after it
- A counted balance is evidence in its own right
- Pick the interval the business reviews: day, week, month
- Balances are semi-additive — the next sections show why
- Keep both: movements explain the change, snapshots fix the level`,
  narration:
    "The second shape is the periodic snapshot. Instead of recording events, it measures a state at regular intervals. Here it is daily inventory: for every product, at every location, at the end of every day, how many units were on hand. Notice how different that is from the sales table. A snapshot row exists even when nothing moved that day, because the point is to record the level, and the level still had a value. Rows arrive on a schedule, so the size of the table is predictable: products times locations times days. Each row says what was true at that moment, not what happened. You might ask why we do not just add up every stock movement since the beginning of time. That is slow, and it is fragile, because a single missed movement makes every later balance wrong, with nothing to catch it. A counted balance is evidence on its own. So the strong design keeps both. Movements explain how the level changed. Snapshots pin down what the level actually was.",
}
