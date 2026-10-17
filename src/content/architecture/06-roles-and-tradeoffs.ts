import type { Section } from '../types'

export const rolesAndTradeoffs: Section = {
  id: 'roles-and-tradeoffs',
  title: 'Lifecycle roles and architectural trade-offs',
  scene: 'layers',
  focus: 'roles',
  slide: `## Lifecycle roles and architectural trade-offs

Every architecture is a set of trade-offs, and every trade-off has an owner. Name both.

### Who owns what
- **Business owner:** the metric's definition and its acceptance
- **Data engineer:** ingestion, loads and recovery
- **Analytics engineer:** models, tests and semantic definitions
- **Platform owner:** compute, access and cost

### Judging an architecture claim
- A benchmark is evidence about **one workload**, not every workload
- Ask what a design costs in freshness, ownership and operations
- **Outcome:** explain an architecture by its decisions, workloads, data movement and trade-offs`,
  narration:
    "Here is the same layered path, now with the people attached. A business owner decides what a metric means and accepts the number. A data engineer owns getting data in, loading it, and recovering when that fails. An analytics engineer owns the models, the tests and the shared definitions. A platform owner owns compute, access and what it all costs. Some teams merge these roles, but none of the responsibilities disappears. That matters when you meet an architecture claim, such as one design being faster or cheaper. A benchmark is evidence about the workload it measured, not about yours. So ask what the design costs you in freshness, in ownership, and in day-to-day operation. That is the outcome of this course: being able to explain a warehouse in terms of the decisions it serves, the workloads it carries, how data moves through it, and the trade-offs someone chose. Next, the architecture gets concrete, by making the question and its sources precise.",
}
