import type { Section } from '../types'

export const drillAcross: Section = {
  id: 'drill-across',
  title: 'Drill-across and shared definitions',
  scene: 'drill-across',
  focus: 'combine',
  slide: `## Drill-across and shared definitions

To compare two processes, **summarise each one first**, then join the summaries on conformed attributes.

### Sales and returns by product
- Sum sales by product; separately, sum returns by product
- Join the two summaries on the conformed product
- Mug ×4: 27.00 sold, 18.00 returned — a 66.7% rate
- Each fact keeps its own grain and its own filters
- A full outer join keeps products found in only one side

### Joining the detail instead
- Two mug sale lines meet one mug return line
- The return is repeated per sale: 18.00 becomes **36.00**
- Facts at different grains have no row-to-row relationship
- Only attributes that are truly conformed can be drilled across`,
  narration:
    "Drilling across means answering one question from two processes, such as the return rate by product, which needs sales and returns together. The safe method has two steps. First, summarise each fact on its own: total sales by product, and separately, total returns by product. Then join the two small summaries on the conformed product. Mugs sold twenty seven pounds and had eighteen pounds returned, a return rate of sixty six point seven percent. Each fact keeps its own grain and its own filters, and nothing is counted twice. The tempting shortcut is to join the detailed tables directly on product. There were two mug sale lines and one mug return line. The join pairs that one return with both sales, so eighteen pounds of returns is reported as thirty six. Detailed facts from different processes have no row-to-row relationship, so there is nothing correct to join them on. And this only works on attributes that are genuinely conformed. If the two products were defined differently, the summaries would not line up at all.",
}
