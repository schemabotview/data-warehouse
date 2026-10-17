import type { Section } from '../types'

export const businessVsProcessingTime: Section = {
  id: 'business-vs-processing-time',
  title: 'Business time and processing time',
  scene: 'two-clocks',
  focus: 'late-processing',
  slide: `## Business time and processing time

Every row carries two kinds of time. Mixing them up moves facts into the wrong period.

### Two clocks
- **Business time:** when it happened — the parcel left
- **Processing time:** when the warehouse learned or loaded it
- Normally minutes apart; sometimes days or weeks
- Keep both on the row: \`happened_at\`, \`loaded_at\`
- Each time is stored with its zone, or in UTC

### The late return
- The mugs from 1041 came back on 19 September
- The warehouse heard about it on 2 October
- By business time it is a September return
- By load time it lands in October — and September looks better
- The metric states which clock decides the period`,
  narration:
    "History starts with a distinction that sounds pedantic and is not. Every row carries two kinds of time. Business time is when something happened in the world: the parcel left, the customer moved, the goods came back. Processing time is when the warehouse found out: when the event was captured, and when it was loaded. Usually they are minutes apart, and nobody notices. Sometimes they are days or weeks apart, and then the difference decides which period a fact belongs to. Look at the return of the mugs from order ten forty one. The customer sent them back on the nineteenth of September, but the return was only captured on the second of October. Count by business time, and it is a September return. Count by load time, and it lands in October, which makes September look better than it really was. Neither clock is wrong, but they answer different questions. So keep both timestamps on the row, each with its time zone, and let the metric's definition state which clock places a fact in a period.",
}
