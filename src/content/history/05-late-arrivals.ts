import type { Section } from '../types'

export const lateArrivals: Section = {
  id: 'late-arrivals',
  title: 'Late-arriving facts and dimensions',
  scene: 'inferred-member',
  focus: 'inferred',
  slide: `## Late-arriving facts and dimensions

Facts and dimension records rarely arrive in the order they happened. Plan for both directions.

### The fact arrives first
- A marketplace order for M-95 lands before M-95 does
- **Unknown (-1)** keeps the row, but loses the link
- An **inferred member** issues key 230 now, with placeholders
- When M-95 arrives, the inferred row is **completed in place**
- No fact has to be re-pointed
- Flag inferred rows so reports can show them

### The fact arrives late
- A September sale loaded in October still uses its own date
- It may land in a period that was already reported
- Decide whether that period is restated, or adjusted later`,
  narration:
    "In a perfect world, a customer record would always arrive before that customer's first order. In practice the order of arrival is messy, and the load has to cope in both directions. First, the fact can arrive before its dimension member. This marketplace order for customer M ninety five landed on the third of October, but the marketplace customer feed would not deliver M ninety five until the fifth. One option is to point the fact at the Unknown member. The row is kept, but the link to M ninety five is lost, and every such fact must be found and re-pointed later. The better option is an inferred member: issue a real surrogate key now, two thirty, with placeholder attributes and a flag saying it was inferred. When the real record arrives, that row is completed in place, and the fact never needs to change. Second, a fact can arrive late. A September sale loaded in October still looks up its version by its own business date. But it may land in a month that was already reported, which raises the next question: restate, or adjust?",
}
