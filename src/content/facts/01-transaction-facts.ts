import type { Section } from '../types'

export const transactionFacts: Section = {
  id: 'transaction-facts',
  title: 'Transaction fact tables',
  scene: 'three-facts',
  focus: 'txn',
  slide: `## Transaction fact tables

The simplest fact table records **one row per event**, at the moment it happened.

### One row per order line, as sold
- Every row is an event that really occurred: a line was sold
- Rows are **inserted once** and never updated in place
- A correction arrives as a new row, not an edit of the old one
- No sale, no row — the table is sparse by nature
- Grain: one product on one order, when sold
- Its measures are additive: quantity, net amount

### What it is good for
- Any total, by any dimension: day, product, region
- The finest detail, so other patterns can be built from it
- Appended fixes keep old reports **reproducible**
- **State** — stock levels, order progress — needs more`,
  narration:
    "There are three basic shapes of fact table, and this course looks at all three on one board. The first is the transaction fact. It records one row per event, at the moment the event happened. Here, each row is one order line as it was sold: a kettle, two packs of mugs, a toaster. The rules are simple. A row is inserted once and is not updated afterwards. If something about a sale turns out to be wrong, the correction arrives as a new row, so the history of what was recorded stays intact. And if nothing happens, nothing is written: the table is sparse, with no row for a day when a product did not sell. Transaction facts are the workhorse. Their measures can be summed by any dimension, and they hold the finest detail available, which means the other patterns can often be derived from them. What they answer poorly is a question about state: how much stock is on the shelf, or how far an order has progressed. For those, we need the other two shapes.",
}
