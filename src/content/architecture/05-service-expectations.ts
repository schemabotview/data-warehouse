import type { Section } from '../types'

export const serviceExpectations: Section = {
  id: 'service-expectations',
  title: 'Freshness, correctness and service expectations',
  scene: 'expectations',
  focus: 'replica',
  slide: `## Freshness, correctness and service expectations

A report is only useful when its users know **how current, how complete and how correct** it is.

### Two reports from the same orders
- **Daily report:** loaded nightly, history kept, totals reconciled
- **Live replica:** always current, but each update **overwrites** the past
- The replica cannot say which region a customer was in last March

### State these expectations together
- **Freshness:** complete up to when, and ready by when
- **Completeness:** which sources and periods are included
- **Correctness:** which checks ran, and what they prove
- **Access:** who may see which rows and columns
- **Cost:** what keeping it this fresh actually spends
- Tightening one usually **loosens** another`,
  narration:
    "Here are two reports built from the same orders. The daily report is loaded overnight. It is a day behind, but it says so, it keeps every past month, and its totals are reconciled back to the source. The live replica looks better at first: it is only seconds behind the shop. But it copies the current state, so every update overwrites what was there before. Ask it which region a customer lived in last March, and the answer is simply gone. Fresher is not the same as more useful. What users actually need is a stated service. How fresh: complete up to when, and ready by what time. How complete: which sources and which periods are in. Who may see which rows and columns. And what that level of freshness costs to run. These belong together, because tightening one usually loosens another. And each needs two named owners: someone in the business who agrees the target, and someone technical who keeps it.",
}
