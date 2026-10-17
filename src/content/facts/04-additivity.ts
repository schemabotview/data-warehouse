import type { Section } from '../types'

export const additivity: Section = {
  id: 'additivity',
  title: 'Additive and semi-additive measures',
  scene: 'stock-sums',
  focus: 'through-time',
  slide: `## Additive and semi-additive measures

Whether a measure can be summed depends on the measure **and** the dimension you sum it over.

### Stock on hand, two ways
- Across locations on 30 Sept: 11 + 5 = **16 kettles** — true
- Across two days: 12 + 5 + 11 + 5 = **33** — counts nothing real
- Over time, use the period-end value or the average: 16 or 16.5
- Each day repeats the level; no new stock appeared

### Three kinds of measure
- **Additive:** quantity, net amount — sum over anything
- **Semi-additive:** balances — sum across space, not time
- **Non-additive:** prices, ratios — never sum; recompute
- Sum only compatible **units and currencies**
- Declare additivity in the model, so tools can enforce it`,
  narration:
    "Some numbers can be added up freely. Others only make sense when added in certain directions. Take stock on hand for kettles. On the thirtieth of September there were eleven in London and five in Manchester. Add them, and you get sixteen kettles in the business, which is a true statement. Now add the same measure across two days: twelve and five, then eleven and five. The result is thirty three, and it counts nothing real. The same kettles were simply counted twice. A balance is a level, not a flow. To summarise it over time, take the value at the end of the period, or the average over the period, and say which. So every measure declares its additivity. Additive measures, like quantity and net amount, can be summed over any dimension. Semi-additive measures, like balances, sum across locations or products but not across time. Non-additive measures, like unit prices and ratios, are never summed at all. They are recomputed from their parts. And no sum is valid across mixed units or currencies.",
}
