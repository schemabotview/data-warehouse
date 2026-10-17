import type { Section } from '../types'

export const junkAndUnknown: Section = {
  id: 'junk-and-unknown',
  title: 'Degenerate, junk and unknown members',
  scene: 'special-members',
  focus: 'unknown',
  slide: `## Degenerate, junk and unknown members

Not every dimension key points at an ordinary entity. Three patterns cover most of the exceptions.

### Degenerate and junk
- **Degenerate:** \`order_id\` stays on the fact, with no table of its own
- **Junk:** small flags — gift wrap, promo, channel — share one table
- One junk key replaces several low-value foreign keys

### Unknown is not "not applicable"
- **Unknown (-1):** a customer should exist but is missing — order 1043
- **Not applicable (-2):** no customer can exist — a stock adjustment
- Two reserved rows keep both joins inner and both meanings separate
- Never leave the key null: it drops rows from inner joins`,
  narration:
    "Most dimension keys point at a real thing, a customer or a product. A few patterns handle the rest. The order number is useful for drilling back to a source order, but it has no attributes worth a table of its own. So it stays on the fact row as a degenerate dimension. Then there are small flags: was it gift wrapped, was a promotion used, which channel did it come through. Giving each its own dimension clutters the star. A junk dimension holds every combination of those flags in one small table, and the fact carries a single key. Finally, the missing cases. Order ten forty three should have a customer, but the source lost it. That is unknown, and it points at a reserved member with key minus one. A stock adjustment has no customer at all, and never could. That is not applicable, key minus two. Keeping these as two separate members keeps their meanings apart. And never leave the key empty, because a null key drops the row from every inner join.",
}
