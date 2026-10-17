import type { Section } from '../types'

export const multipleGrains: Section = {
  id: 'multiple-grains',
  title: 'Multiple grains and allocation',
  scene: 'freight-allocation',
  focus: 'allocated',
  slide: `## Multiple grains and allocation

Freight is charged **per order**; sales are recorded **per line**. They live at different grains.

### Two honest options
- Keep a separate **order-grain** fact for freight
- Or **allocate** it to lines under a documented rule
- Never copy the header value onto every line: 4.95 becomes 9.90
- Separate facts combine safely only **after** each is summed

### Allocating by net value
- Line share = line net ÷ order net: 65.4% and 34.6%
- Freight per line: 3.24 and 1.71
- **Reconcile:** allocated lines must sum to the header's 4.95
- Put any rounding remainder on one line, by rule
- The rule is a business choice; record it with the data
- Re-allocate when an order's lines change`,
  narration:
    "Freight is charged once per order, but sales are recorded per line. Those are two grains, and freight has to be handled without breaking either one. There are two honest options. You can keep freight in its own fact table at the order grain, and combine it with line facts only after both have been aggregated. Or you can allocate it down to the lines using a documented rule. What you must never do is copy the header's freight onto every line. Order ten forty one had two lines, so four pounds ninety five quietly becomes nine pounds ninety. Here is an allocation by net value. The kettle line was thirty four of the fifty two pounds, so it takes sixty five point four percent of the freight, three pounds twenty four. The mugs take the rest, one pound seventy one. Then reconcile: the allocated amounts must add back to exactly what the header charged. Rounding can leave a penny over, so a rule decides which line absorbs it. And the allocation rule is a business choice, so record it alongside the data.",
}
