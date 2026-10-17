import type { Section } from '../types'

export const sourceIdentity: Section = {
  id: 'source-identity',
  title: 'Keys, entities and source identity',
  scene: 'header-vs-line',
  focus: 'reused-id',
  slide: `## Keys, entities and source identity

Before counting anything, decide **which thing** each row describes, and what makes it unique.

### Header or line?
- An order **header** has one row per order: customer, freight
- An order **line** has one row per product: quantity, price
- Summing freight per line repeats it
- Name each table's **one row per …** before joining

### An id is unique only where it was issued
- The marketplace also has an order 1042 — a different order
- Joining on \`order_id\` alone merges two orders
- **Qualify** the key with its source: web 1042, mkt 1042
- Carry the source column all the way into the warehouse
- Global uniqueness is a claim to **check**
- Matching across systems is a separate, explicit step`,
  narration:
    "Every row describes some thing, and the first job is to say which. The order header has one row per order. It holds the customer and the freight charge. The order lines have one row per product, with the quantity and the price. They are related, one header to many lines, but they are different entities. Treat them as one, and freight gets repeated on every line and counted several times over. The second trap is identity. An order number is only unique inside the system that issued it. The marketplace runs its own numbering, and it also has an order ten forty two, for a completely different customer. Join the two sources on order id alone and those two orders silently merge into one. The fix is to qualify the key with its source, so web ten forty two and marketplace ten forty two stay distinct. And whenever someone says an identifier is globally unique, treat that as a claim to check against the data, not a fact to build on.",
}
