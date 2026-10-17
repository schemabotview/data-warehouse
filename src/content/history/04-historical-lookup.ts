import type { Section } from '../types'

export const historicalLookup: Section = {
  id: 'historical-lookup',
  title: 'Historical fact-to-dimension lookup',
  scene: 'as-was-join',
  focus: 'boundary',
  slide: `## Historical fact-to-dimension lookup

When a fact is loaded, it is given the dimension key of the version **true at its business date**.

### The lookup
- Match the natural key, then the interval: \`from ≤ date < to\`
- 1041, ordered 3 September, gets key 201 — North
- 1044, ordered 30 September, gets key 208 — South
- A sale on 20 September gets 208 — the boundary works
- Resolved once, at load; the fact stores the key

### Two ways to get it wrong
- A **closed** interval matches 20 September twice: fan-out
- Using the **load date** gives late facts today's version
- Test that every fact matches **exactly one** version
- Zero matches is a missing member, not a silent drop
- Back-dated versions mean re-running the lookup`,
  narration:
    "Once the dimension keeps versions, each fact has to be given the right one. The lookup happens when the fact is loaded. It matches the customer's natural key, and then it picks the version whose interval contains the fact's business date. Order ten forty one was placed on the third of September, while the customer was still in the North, so it gets key two oh one. Order ten forty four was placed on the thirtieth, after the move, so it gets key two oh eight. And a sale placed exactly on the twentieth falls cleanly into the new version, because the interval is half-open. Here are the two classic mistakes. If the intervals are closed at both ends, a sale on the boundary date matches both versions, and the join quietly doubles it. And if the lookup uses the load date instead of the business date, any late-arriving fact gets whatever version is current today. So test the result. Every fact should match exactly one version. Zero matches means a missing member, and that should be handled, never silently dropped.",
}
