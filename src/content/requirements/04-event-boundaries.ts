import type { Section } from '../types'

export const eventBoundaries: Section = {
  id: 'event-boundaries',
  title: 'Business processes and event boundaries',
  scene: 'order-lifecycle',
  focus: 'shipped',
  slide: `## Business processes and event boundaries

A business process is a **chain of events**. Each event is a candidate for something to measure.

### Order 1041, as events
- **Placed** and **paid** happen once, for the whole order
- **Shipped** and **delivered** happen per line, per parcel
- **Returned** happens to one line, two weeks later
- Each comes from a **different system**: shop, payments, carrier

### Where the boundary sits matters
- A line-level event cannot be stored on the order header
- Each event has its **own date**, and so its own month
- "Shipped" may mean the first parcel, or the last
- Some events never happen: a cancelled order never ships
- Write down which event, at which level, closes each step`,
  narration:
    "Look at order ten forty one as its business process actually ran. It was placed, and it was paid. Those happened once, for the whole order. Then it was shipped, but not all at once: each line went out in its own parcel, on its own day, and was delivered separately. And two weeks later, one of those lines, the mugs, came back. So the process is a chain of events, and each event happens at a level, either the whole order or one line. That boundary matters. A line-level event cannot be stored on the order header without losing which line it belonged to. Each event also carries its own date, which can put it in a different month from the order. And a word like shipped hides a choice. Does an order count as shipped when its first parcel leaves, or only when its last one does? Write down which event closes each step, and at which level, before modelling anything from it.",
}
