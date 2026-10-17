import type { Section } from '../types'

export const metricDefinitions: Section = {
  id: 'metric-definitions',
  title: 'Stakeholder questions and metric definitions',
  scene: 'metric-contract',
  focus: 'answers',
  slide: `## Stakeholder questions and metric definitions

"Sales last month" is not yet a question. It becomes one when the definition is **written down** and agreed.

### Three honest answers for September
- **Booked:** counted when the order is placed — 144.00 GBP
- **Shipped:** counted when goods leave — 101.00 GBP
- **Recognised:** delivered, less returns — 34.00 GBP
- All three are correct; they answer **different questions**
- A report must say **which one** it shows

### What the definition must state
- Which **event** is counted, and which date places it in a month
- How **returns** are dated: on the original sale, or on receipt
- **Tax** and **currency** treatment, in one stated unit
- An analytical definition — not accounting advice`,
  narration:
    "Ask three people for last month's sales and you may get three numbers, all of them correct. Here are the same September order lines counted three ways. Booked sales count an order the moment it is placed, which gives one hundred and forty four pounds. Shipped sales wait until goods leave the warehouse, so the two orders that left in early October drop out, leaving one hundred and one. Recognised sales, under a finance policy, wait for delivery and subtract returns, and that leaves just thirty four pounds. Nobody made a mistake. They answered different questions. So before any table is designed, the metric needs a written definition. Which event is counted, and which date puts it in a month? Are returns dated back to the original sale, or on the day the goods come back? Is the amount before or after tax, and in which currency? This is an analytical definition, agreed with the people who use the number. It is not accounting advice, and where finance has a policy, the definition should point to it.",
}
