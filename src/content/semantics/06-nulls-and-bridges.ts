import type { Section } from '../types'

export const nullsAndBridges: Section = {
  id: 'nulls-and-bridges',
  title: 'Missing values and relationship ambiguity',
  scene: 'null-zero',
  focus: 'null',
  slide: `## Missing values and relationship ambiguity

**NULL**, **zero** and **no related row** are three different facts. Aggregates treat them differently.

### Refunds in September
- 18.00: a refund was paid; 0.00: a return was refused
- NULL: there was no return at all
- \`COUNT(*)\` is 4; \`COUNT(refund_gbp)\` is 2
- \`AVG\` skips NULLs: **9.00** per return, **4.50** per order
- Both are valid; the metric must say which
- \`SUM\` over only NULLs is NULL, not 0

### Missing relationships
- Order 1043 has no customer: key -1
- An inner join without an Unknown row drops it silently
- Show Unknown as its own group, with its count
- Bridge rows with no match need the same care
- Decide all of this in the contract, not per query`,
  narration:
    "Three things can look alike in a result and mean very different things: a null, a zero, and the absence of a related row. Here are four September orders and their refunds. Order ten forty one had eighteen pounds refunded. Order ten forty two had a return that was refused, so the refund is a real zero. Orders ten forty three and ten forty four had no return at all, so their refund is null: there is nothing to measure. The aggregates treat these differently. Count star counts four orders, but counting the refund column counts only two values, because nulls are skipped. The average refund skips nulls too, and gives nine pounds, which is the average per return. Replace the nulls with zero first, and the average becomes four pounds fifty, which is the average per order. Both are reasonable answers to different questions, so the metric contract has to say which one it means. Missing relationships behave the same way. Order ten forty three has no customer. An inner join without an Unknown member drops it silently, so show Unknown as a group of its own.",
}
