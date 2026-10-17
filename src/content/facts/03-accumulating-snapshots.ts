import type { Section } from '../types'

export const accumulatingSnapshots: Section = {
  id: 'accumulating-snapshots',
  title: 'Accumulating snapshots',
  scene: 'three-facts',
  focus: 'accum',
  slide: `## Accumulating snapshots

An **accumulating snapshot** follows one thing through a known pipeline, with one row per order.

### One row, updated at each milestone
- Placed, shipped, delivered: one date column per milestone
- The row is **updated** as each milestone is reached
- Lags are measures: \`days_to_ship\` for 1043 is 12
- Empty dates mean "not yet", not "never"
- Rows stay open until the last milestone, or a cut-off

### Defining it honestly
- "Shipped" here is the **last** parcel; say so on the table
- The only pattern whose rows change, so keep an audit trail
- Best when the steps are fixed and well understood
- Report open and completed orders separately
- Answers "where is everything right now, and how long did it take?"`,
  narration:
    "The third shape is the accumulating snapshot. It follows one thing through a pipeline with known steps, and it gives that thing one row. Here the thing is an order, and the steps are placed, shipped and delivered, each with its own date column. When an order is placed, its row is created with only the first date filled in. As each milestone is reached, the same row is updated. The gaps between dates become measures in their own right. Order ten forty three was placed on the twenty first of September and did not ship until the third of October, so its days to ship is twelve. Empty dates mean not yet, which is different from never. This pattern needs careful definitions. An order with two parcels shipped twice, so the table must say that shipped means the last parcel. And because these rows change, unlike the other two patterns, keep an audit trail of their updates. Use it when the steps are fixed and well understood. It answers where everything is right now, and how long each stage took.",
}
