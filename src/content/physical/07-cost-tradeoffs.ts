import type { Section } from '../types'

export const costTradeoffs: Section = {
  id: 'cost-tradeoffs',
  title: 'Concurrency, freshness and cost trade-offs',
  scene: 'cost-freshness',
  focus: 'target',
  slide: `## Concurrency, freshness and cost trade-offs

Every physical choice spends something: compute, storage, freshness or someone's time.

### Freshness against runs
- Refreshes per day = 1,440 ÷ minutes between refreshes
- Hourly is 24 runs; every 15 minutes is **96**, four times as many
- The stated need is data within 2 hours: hourly fits it
- Nightly is cheapest, and does not meet the need
- Concurrency costs too: many readers at 09:00 compete

### Judging an optimisation
- Start from the workload, the freshness target and the billing model
- Measure before and after, under the same conditions
- No speed-up is universal; no rule fits every engine
- **Outcome:** justify a physical change with evidence`,
  narration:
    "Every physical design choice spends something: compute, storage, freshness, or the time of the people running it. This last example makes one of those trade-offs concrete with simple arithmetic rather than a benchmark. The number of refreshes per day is fourteen hundred and forty minutes divided by the minutes between refreshes. Refreshing hourly means twenty four runs a day. Refreshing every fifteen minutes means ninety six, four times as many. Whatever each run costs under your platform's billing model, the second option costs roughly four times as much in refresh work. So start from the need. The sales dashboard's owners said the data must be no more than two hours old. Hourly meets that. Every fifteen minutes meets it too, but spends four times the runs for freshness nobody asked for. Nightly is cheapest and does not meet it. Judge any optimisation the same way: against a real workload, a stated target and a known billing model, measured before and after under the same conditions. You can now justify a physical change with evidence, rather than a universal rule.",
}
