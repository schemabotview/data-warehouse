import type { Section } from '../types'

export const factKeyResolution: Section = {
  id: 'fact-key-resolution',
  title: 'Fact loading and key resolution',
  scene: 'key-resolution',
  focus: 'no-drop',
  slide: `## Fact loading and key resolution

Loading a fact means replacing every natural key with the right **surrogate key**, without losing a row.

### Resolving each key
- Date: from the calendar, which is built years ahead
- Customer: the version valid **on the order date**
- Product: qualified by source and product id
- A key that is not found becomes **-1**, never a dropped row
- Dropped rows lower totals silently; -1 rows are visible

### Checks on every fact load
- Rows in equals rows out, per batch
- Count rows that resolved to Unknown, and alert above a threshold
- An inferred member is better than Unknown when the id is known
- Late dimension rows then complete the inferred member
- Order 1043 has no customer: -1, counted, visible`,
  narration:
    "Loading a fact table is mostly an exercise in key resolution. Every natural key that arrived from the source has to be replaced with the warehouse's surrogate key, and not a single row may be lost along the way. The date key comes from the calendar dimension, which is built years ahead, so every date finds its day. The customer key comes from the version of the customer that was valid on the order date, using the half-open interval from the history course. The product key is matched on the source and the product id together. Now look at the joins. The customer and product joins are left joins. If a key is not found, the row is kept, and it points at minus one, the Unknown member, instead of disappearing. An inner join would drop it silently, and totals would simply be lower. So every fact load checks that rows in equal rows out, and counts how many rows fell to Unknown. Order ten forty three has no customer. It loads, it points at minus one, and it is counted where people can see it.",
}
