import type { Section } from '../types'

export const declaringGrain: Section = {
  id: 'declaring-grain',
  title: 'Declaring grain',
  scene: 'sales-star',
  focus: 'grain',
  slide: `## Declaring grain

The **grain** says exactly what one fact row represents. Declare it before choosing a single column.

### One row per order line
- Each row is one product on one order, as sold
- It fixes which **dimensions** apply: date, customer, product
- It fixes which **measures** belong: quantity, net amount
- Order-level freight does not belong at this grain
- Two rows with the same order and line number are a defect

### Why grain comes first
- The finest grain the source supports answers the most questions
- Mixing grains in one table makes every sum suspect
- Write it in words: "one row per …", then test it with a unique key
- Every later design choice is checked against this sentence`,
  narration:
    "Every fact table answers one question about itself: what does a single row represent? That answer is the grain, and it is declared first, in plain words, before any column is chosen. Here the grain is one row per order line: one product, on one order, as it was sold. That sentence immediately decides a lot. It tells you which dimensions can describe a row: the order date, the ship date, the customer, the product. It tells you which measures belong: the quantity and the net amount of that line. And it tells you what does not belong. Freight is charged once per order, so it has no honest place on a line row without an allocation rule. Choose the finest grain the source can support, because detail can always be summed up later, but a summary can never be split back down. Never mix grains in one table. Write the grain as a sentence, back it with a key that should be unique, and test that key on every load.",
}
