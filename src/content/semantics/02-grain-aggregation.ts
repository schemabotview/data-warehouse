import type { Section } from '../types'

export const grainAggregation: Section = {
  id: 'grain-aggregation',
  title: 'Aggregation at the intended grain',
  scene: 'bridge',
  focus: 'weight',
  slide: `## Aggregation at the intended grain

When one fact row relates to **many** members of a dimension, the relationship needs a bridge and a rule.

### Order 1041 used two promotion codes
- A **bridge** table links the order to both promotions
- The fact's grain stays one row per order
- Unweighted, each promo gets the full 52.00
- Summed, the promotions claim **104.00** of a 52.00 order
- That view answers "orders involving", and must not be totalled

### A weighted bridge
- Each link has a weight; they sum to 1 per order
- 26.00 each: the totals add back to the order
- The weighting rule is policy: say which one
- Joint accounts, tags and diagnoses need bridges too
- Test the weights every load, and label which reading a report uses`,
  narration:
    "Some relationships are not many to one. Order ten forty one used two promotion codes, AUTUMN and WELCOME. The order cannot point at a single promotion, so a bridge table links it to both. Now ask for sales by promotion. If the bridge is used without weights, each promotion is credited with the whole fifty two pound order. That is a legitimate answer to a specific question: what value of orders involved each promotion? But add those rows up and the promotions claim one hundred and four pounds of a fifty two pound order. So that reading must never be totalled, and the report should say so. The alternative is a weighted bridge. Each link carries a weight, and the weights for one order add up to exactly one. Here the split is equal, so each promotion is credited twenty six pounds, and the totals add back to the order. The weighting rule is a business policy, not a technical detail, so state which one is used. Test that the weights sum to one on every load, and label which reading each report shows.",
}
